import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Skrong on iPhone and iPad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function publicImage(path: string) {
  const data = await readFile(join(process.cwd(), "public", path));
  return `data:image/png;base64,${data.toString("base64")}`;
}

// Link preview for iMessage, Slack, and social sites: the app icon and name on
// the left, the app running on iPad and iPhone on the right.
export default async function Image() {
  const [icon, ipad, iphone] = await Promise.all([
    publicImage("apps/skrong/icon.png"),
    publicImage("skrong/ipad/programs.png"),
    publicImage("skrong/iphone/hiit.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0c0a09",
          backgroundImage: "radial-gradient(circle at 75% 0%, rgba(249,115,22,0.45), transparent 60%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", width: 560 }}>
          <img src={icon} width={120} height={120} style={{ borderRadius: 28 }} alt="" />
          <div style={{ marginTop: 32, fontSize: 104, letterSpacing: -4, lineHeight: 1 }}>Skrong</div>
          <div style={{ marginTop: 20, fontSize: 34, lineHeight: 1.3, color: "#d6d3d1" }}>
            The workout tracker and interval timer for people who actually work out.
          </div>
          <div style={{ marginTop: 28, fontSize: 24, color: "#fb923c" }}>
            Workouts · Programs · Interval timers
          </div>
        </div>

        <Frame src={ipad} left={700} top={60} width={400} height={534} padding={12} radius={28} />
        <Frame src={iphone} left={590} top={210} width={180} height={391} padding={8} radius={36} />
      </div>
    ),
    size,
  );
}

function Frame({
  src,
  left,
  top,
  width,
  height,
  padding,
  radius,
}: {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  padding: number;
  radius: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        display: "flex",
        padding,
        borderRadius: radius + padding,
        backgroundColor: "#1c1917",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
      }}
    >
      <img src={src} width={width} height={height} style={{ borderRadius: radius }} alt="" />
    </div>
  );
}
