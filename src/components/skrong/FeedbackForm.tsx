"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const categories = [
  { value: "bug", label: "Bug" },
  { value: "idea", label: "Idea" },
  { value: "question", label: "Question" },
  { value: "other", label: "Other" },
];
const maxScreenshots = 3;
const maxSide = 1600;
const maxScreenshotBytes = 1.5 * 1024 * 1024;

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };
type Screenshot = { file: File; preview: string };

export function FeedbackForm() {
  const [category, setCategory] = useState("bug");
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAt = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);

  // The app opens this page with ?appVersion=…&osVersion=…&device=… so reports
  // arrive with the details needed to reproduce them. The page is static, so the
  // query is read in the browser.
  const search = useSyncExternalStore(
    () => () => {},
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const param = (key: string) => params.get(key)?.slice(0, 60) ?? "";
  const appVersion = param("appVersion");
  const osVersion = param("osVersion");
  const device = param("device");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function addScreenshots(files: FileList | null) {
    if (!files) return;
    const room = maxScreenshots - screenshots.length;
    const added: Screenshot[] = [];
    for (const original of Array.from(files).slice(0, room)) {
      const file = await shrink(original);
      if (file.size > maxScreenshotBytes) {
        setStatus({ state: "error", message: `${original.name} is too large. Try a smaller image.` });
        continue;
      }
      added.push({ file, preview: URL.createObjectURL(file) });
    }
    setScreenshots((current) => [...current, ...added]);
    if (fileInput.current) fileInput.current.value = "";
  }

  function removeScreenshot(index: number) {
    URL.revokeObjectURL(screenshots[index].preview);
    setScreenshots((current) => current.filter((_, i) => i !== index));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    form.set("category", category);
    form.set("startedAt", String(startedAt.current));
    form.delete("screenshots");
    screenshots.forEach((s) => form.append("screenshots", s.file));

    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/skrong/feedback", { method: "POST", body: form });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? "Something went wrong. Please try again.");
      setStatus({ state: "sent" });
    } catch (error) {
      setStatus({ state: "error", message: error instanceof Error ? error.message : "Something went wrong." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="!pt-0">Thanks for the feedback!</h2>
        <p className="mt-2 text-muted">It&rsquo;s on its way. If you left an email address, I&rsquo;ll reply there.</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-accent";

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset>
        <legend className="mb-2 font-semibold">What kind of feedback?</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              aria-pressed={category === c.value}
              onClick={() => setCategory(c.value)}
              className={`rounded-xl border px-4 py-3 font-medium transition ${
                category === c.value ? "border-accent bg-accent text-background" : "border-border bg-card"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block font-semibold">Message</span>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={6}
          placeholder="What happened, or what would you like to see?"
          className={inputClass}
        />
      </label>

      <div>
        <span className="mb-2 block font-semibold">Screenshots (optional)</span>
        <div className="flex flex-wrap gap-3">
          {screenshots.map((s, index) => (
            <div key={s.preview} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
              <img src={s.preview} alt={`Screenshot ${index + 1}`} className="h-28 w-auto rounded-lg border border-border" />
              <button
                type="button"
                onClick={() => removeScreenshot(index)}
                aria-label={`Remove screenshot ${index + 1}`}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background"
              >
                ×
              </button>
            </div>
          ))}
          {screenshots.length < maxScreenshots && (
            <label className="flex h-28 w-20 cursor-pointer items-center justify-center rounded-lg border border-dashed border-border bg-card text-3xl text-muted">
              +
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => addScreenshots(e.target.files)}
              />
            </label>
          )}
        </div>
        <p className="mt-2 text-sm text-muted">Up to {maxScreenshots} images.</p>
      </div>

      <label className="block">
        <span className="mb-2 block font-semibold">Email (optional)</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="So I can reply"
          className={inputClass}
        />
      </label>

      {/* Hidden from people; bots that fill it in are ignored. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <input type="hidden" name="appVersion" value={appVersion} />
      <input type="hidden" name="osVersion" value={osVersion} />
      <input type="hidden" name="device" value={device} />

      {status.state === "error" && <p className="text-red-600 dark:text-red-400">{status.message}</p>}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="w-full rounded-full bg-foreground px-6 py-3.5 font-semibold text-background transition hover:opacity-80 disabled:opacity-50"
      >
        {status.state === "sending" ? "Sending…" : "Send Feedback"}
      </button>

      {(appVersion || osVersion || device) && (
        <p className="text-center text-sm text-muted">
          Includes {[appVersion && `Skrong ${appVersion}`, osVersion && `iOS ${osVersion}`, device].filter(Boolean).join(" · ")}
        </p>
      )}
    </form>
  );
}

// Scales an image down to fit in maxSide × maxSide and re-encodes it as JPEG, so
// full-resolution screenshots stay well under the upload limit.
async function shrink(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}
