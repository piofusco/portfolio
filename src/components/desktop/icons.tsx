// Pixel-art icons drawn on a 32×32 grid.

type IconProps = { size?: number };

function Pixel({ size = 32, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">
      {children}
    </svg>
  );
}

export function ComputerIcon(props: IconProps) {
  return (
    <Pixel {...props}>
      <rect x="4" y="3" width="24" height="18" fill="#c0c0c0" />
      <rect x="4" y="3" width="24" height="1" fill="#fff" />
      <rect x="4" y="3" width="1" height="18" fill="#fff" />
      <rect x="27" y="3" width="1" height="18" fill="#000" />
      <rect x="4" y="20" width="24" height="1" fill="#000" />
      <rect x="7" y="6" width="18" height="12" fill="#008080" />
      <rect x="7" y="6" width="18" height="1" fill="#404040" />
      <rect x="7" y="6" width="1" height="12" fill="#404040" />
      <rect x="9" y="8" width="5" height="1" fill="#fff" />
      <rect x="9" y="10" width="8" height="1" fill="#fff" />
      <rect x="12" y="21" width="8" height="3" fill="#808080" />
      <rect x="5" y="24" width="22" height="5" fill="#c0c0c0" />
      <rect x="5" y="24" width="22" height="1" fill="#fff" />
      <rect x="5" y="28" width="22" height="1" fill="#000" />
      <rect x="26" y="24" width="1" height="5" fill="#000" />
      <rect x="20" y="26" width="4" height="1" fill="#00a000" />
    </Pixel>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <Pixel {...props}>
      <path d="M6 2h14l6 6v22H6z" fill="#fff" />
      <path d="M6 2h14v1H7v26h18V8h1v22H6z" fill="#000" />
      <path d="M20 2h1v6h5v1h-6z" fill="#000" />
      <path d="M21 3l4 4h-4z" fill="#c0c0c0" />
      <rect x="9" y="11" width="13" height="1" fill="#000080" />
      <rect x="9" y="14" width="13" height="1" fill="#000080" />
      <rect x="9" y="17" width="10" height="1" fill="#000080" />
      <rect x="9" y="20" width="13" height="1" fill="#000080" />
      <rect x="9" y="23" width="8" height="1" fill="#000080" />
    </Pixel>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <Pixel {...props}>
      <path d="M2 7h10l2 2h15v19H2z" fill="#c0a000" />
      <path d="M2 7h10l2 2h15v1H14l-2-2H3v20H2z" fill="#000" />
      <path d="M3 12h27l-2 16H3z" fill="#ffff80" />
      <path d="M3 12h27v1H3z" fill="#fff" />
      <path d="M2 28h27v1H2zM29 12h1v16h-1z" fill="#000" />
    </Pixel>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Pixel {...props}>
      <circle cx="16" cy="16" r="13" fill="#0000c0" />
      <path d="M9 8h6v3h3v4h-4v5h-3v-4H8v-4h1zM19 18h5v3h-2v4h-4v-3h1z" fill="#00a000" />
      <path d="M20 6h4v3h-4z" fill="#00a000" />
      <circle cx="16" cy="16" r="13" fill="none" stroke="#000" strokeWidth="1" />
    </Pixel>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Pixel {...props}>
      <rect x="3" y="8" width="26" height="17" fill="#fff" />
      <path d="M3 8h26v17H3z" fill="none" stroke="#000" />
      <path d="M3 8l13 10 13-10" fill="none" stroke="#000" />
      <path d="M3 25l10-8M29 25l-10-8" fill="none" stroke="#808080" />
    </Pixel>
  );
}

export function ErrorIcon(props: IconProps) {
  return (
    <Pixel {...props}>
      <circle cx="16" cy="16" r="13" fill="#ff0000" stroke="#800000" />
      <path d="M11 9l5 5 5-5 2 2-5 5 5 5-2 2-5-5-5 5-2-2 5-5-5-5z" fill="#fff" />
    </Pixel>
  );
}

export function StartLogo(props: IconProps) {
  return (
    <Pixel {...props}>
      <rect x="3" y="3" width="26" height="26" fill="#000080" />
      <rect x="6" y="6" width="9" height="9" fill="#ff8000" />
      <rect x="17" y="6" width="9" height="9" fill="#ffff00" />
      <rect x="6" y="17" width="9" height="9" fill="#00c0c0" />
      <rect x="17" y="17" width="9" height="9" fill="#fff" />
    </Pixel>
  );
}

// Small curved arrow drawn over shortcut icons.
export function ShortcutBadge() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="absolute bottom-0 left-0"
    >
      <rect width="12" height="12" fill="#fff" stroke="#000" />
      <path d="M3 9V6h3V4l3 3-3 3V8H4v1z" fill="#000" />
    </svg>
  );
}
