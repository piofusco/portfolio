import type { ReactNode } from "react";

export type Device = "iphone" | "ipad" | "duo";

// Screenshot sizes from the simulator exports in public/skrong/<device>/. The
// bezel and corner radii use container query units so a frame looks the same
// at any width.
export const devices: Record<
  Device,
  { label: string; width: number; height: number; bezel: string; screen: string }
> = {
  iphone: {
    label: "iPhone",
    width: 1206,
    height: 2622,
    bezel: "rounded-[16cqw] p-[3.5cqw]",
    screen: "rounded-[12.5cqw]",
  },
  ipad: {
    label: "iPad",
    width: 2048,
    height: 2732,
    bezel: "rounded-[5cqw] p-[2.6cqw]",
    screen: "rounded-[2.6cqw]",
  },
  duo: {
    label: "Duo",
    width: 1398,
    height: 2034,
    bezel: "rounded-[7cqw] p-[3cqw]",
    screen: "rounded-[4.5cqw]",
  },
};

export function shotSrc(device: Device, shot: string) {
  return `/skrong/${device}/${shot}.png`;
}

export function DeviceFrame({
  device,
  className = "",
  children,
}: {
  device: Device;
  className?: string;
  children: ReactNode;
}) {
  const { width, height, bezel, screen } = devices[device];
  return (
    <div className={`@container ${className}`}>
      <div
        className={`bg-stone-900 shadow-2xl shadow-black/40 ring-1 ring-white/15 ring-inset ${bezel}`}
      >
        <div
          className={`relative overflow-hidden bg-black ${screen}`}
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
