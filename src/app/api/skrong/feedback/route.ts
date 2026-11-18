import { put } from "@vercel/blob";

// Receives Skrong feedback from /skrong/feedback. Every submission is saved to the
// private `skrong-feedback` Blob store first, so nothing is lost if email fails, and
// is then emailed through Resend when RESEND_API_KEY, FEEDBACK_TO_EMAIL and
// FEEDBACK_FROM_EMAIL are set.

const categories = ["bug", "idea", "question", "other"] as const;
const maxMessageLength = 5000;
const maxScreenshots = 3;
const maxScreenshotBytes = 1.5 * 1024 * 1024;
const minFillMilliseconds = 3000;

type Category = (typeof categories)[number];

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Could not read the form." }, { status: 400 });
  }

  const text = (key: string, max = 200) => String(form.get(key) ?? "").trim().slice(0, max);

  // Bots fill the hidden field or submit instantly. Pretend it worked so they move on.
  const startedAt = Number(form.get("startedAt"));
  if (text("website") || !startedAt || Date.now() - startedAt < minFillMilliseconds) {
    return Response.json({ ok: true });
  }

  const category = text("category") as Category;
  const message = String(form.get("message") ?? "").trim();
  const email = text("email");
  if (!categories.includes(category)) {
    return Response.json({ error: "Pick a category." }, { status: 400 });
  }
  if (!message || message.length > maxMessageLength) {
    return Response.json({ error: `Write a message up to ${maxMessageLength} characters.` }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  const screenshots = form.getAll("screenshots").filter((value): value is File => value instanceof File && value.size > 0);
  if (screenshots.length > maxScreenshots) {
    return Response.json({ error: `Attach up to ${maxScreenshots} screenshots.` }, { status: 400 });
  }
  if (screenshots.some((file) => !file.type.startsWith("image/") || file.size > maxScreenshotBytes)) {
    return Response.json({ error: "Screenshots must be images under 1.5 MB." }, { status: 400 });
  }

  const submittedAt = new Date();
  const id = `${submittedAt.toISOString().replace(/[:.]/g, "-")}-${crypto.randomUUID().slice(0, 8)}`;
  const feedback = {
    id,
    submittedAt: submittedAt.toISOString(),
    category,
    message,
    email: email || null,
    appVersion: text("appVersion", 40) || null,
    osVersion: text("osVersion", 40) || null,
    device: text("device", 60) || null,
    screenshots: [] as string[],
  };

  try {
    for (const [index, file] of screenshots.entries()) {
      const extension = file.type === "image/png" ? "png" : "jpg";
      const blob = await put(`feedback/${id}/screenshot-${index + 1}.${extension}`, file, {
        access: "private",
        contentType: file.type,
      });
      feedback.screenshots.push(blob.pathname);
    }
    await put(`feedback/${id}/feedback.json`, JSON.stringify(feedback, null, 2), {
      access: "private",
      contentType: "application/json",
    });
  } catch (error) {
    console.error("Saving feedback to Blob failed", error);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  try {
    await sendEmail(feedback, screenshots);
  } catch (error) {
    // The submission is already saved in Blob, so the user still sees success.
    console.error(`Emailing feedback ${id} failed`, error);
  }

  return Response.json({ ok: true });
}

async function sendEmail(
  feedback: { id: string; category: Category; message: string; email: string | null; appVersion: string | null; osVersion: string | null; device: string | null },
  screenshots: File[],
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_TO_EMAIL;
  const from = process.env.FEEDBACK_FROM_EMAIL;
  if (!apiKey || !to || !from) return;

  const details = [
    `Category: ${feedback.category}`,
    `Reply to: ${feedback.email ?? "not given"}`,
    `App version: ${feedback.appVersion ?? "unknown"}`,
    `iOS: ${feedback.osVersion ?? "unknown"}`,
    `Device: ${feedback.device ?? "unknown"}`,
    `ID: ${feedback.id}`,
  ];
  const firstLine = feedback.message.split("\n")[0].slice(0, 60);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: feedback.email ?? undefined,
      subject: `[Skrong ${feedback.category}] ${firstLine}`,
      text: `${feedback.message}\n\n---\n${details.join("\n")}`,
      attachments: await Promise.all(
        screenshots.map(async (file, index) => ({
          filename: `screenshot-${index + 1}.${file.type === "image/png" ? "png" : "jpg"}`,
          content: Buffer.from(await file.arrayBuffer()).toString("base64"),
        })),
      ),
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}
