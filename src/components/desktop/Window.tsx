"use client";

import { useRef } from "react";

export type WindowFrame = {
  id: string;
  title: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  dialog: boolean;
};

const TASKBAR_HEIGHT = 28;

type Props = {
  frame: WindowFrame;
  active: boolean;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  children: React.ReactNode;
};

export function Window({
  frame,
  active,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  children,
}: Props) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const titleId = `${frame.id}-title`;

  // Positions are clamped in CSS so windows stay on screen at any viewport size.
  const style: React.CSSProperties = frame.maximized
    ? { left: 0, top: 0, width: "100vw", height: `calc(100dvh - ${TASKBAR_HEIGHT}px)`, zIndex }
    : {
        left: `clamp(0px, ${frame.x}px, calc(100vw - min(${frame.width}px, 100vw)))`,
        top: `clamp(0px, ${frame.y}px, calc(100dvh - ${TASKBAR_HEIGHT + 40}px))`,
        width: `min(${frame.width}px, 100vw)`,
        height: `min(${frame.height}px, calc(100dvh - ${TASKBAR_HEIGHT}px))`,
        zIndex,
      };

  return (
    <section
      role={frame.dialog ? "dialog" : "region"}
      aria-labelledby={titleId}
      className="w95-raised absolute flex flex-col p-[3px]"
      style={{ ...style, display: frame.minimized ? "none" : undefined }}
      onPointerDown={onFocus}
    >
      <div
        className="w95-titlebar flex h-[18px] shrink-0 select-none items-center gap-1 px-[2px]"
        data-active={active}
        onDoubleClick={frame.dialog ? undefined : onToggleMaximize}
        onPointerDown={(e) => {
          if (frame.maximized || (e.target as HTMLElement).closest("button")) return;
          const rect = e.currentTarget.parentElement!.getBoundingClientRect();
          drag.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const maxY = window.innerHeight - TASKBAR_HEIGHT - 40;
          onMove(Math.max(0, e.clientX - drag.current.dx), Math.min(maxY, Math.max(0, e.clientY - drag.current.dy)));
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
      >
        <span className="shrink-0">{frame.icon}</span>
        <h2 id={titleId} className="flex-1 truncate">
          {frame.title}
        </h2>
        {!frame.dialog && (
          <>
            <button type="button" className="w95-titlebtn" aria-label="Minimize" onClick={onMinimize}>
              <svg width="8" height="7" aria-hidden="true">
                <rect x="1" y="5" width="6" height="2" fill="#000" />
              </svg>
            </button>
            <button
              type="button"
              className="w95-titlebtn"
              aria-label={frame.maximized ? "Restore" : "Maximize"}
              onClick={onToggleMaximize}
            >
              <svg width="9" height="9" aria-hidden="true">
                <rect x="0.5" y="0.5" width="8" height="8" fill="none" stroke="#000" />
                <rect x="0" y="0" width="9" height="2" fill="#000" />
              </svg>
            </button>
          </>
        )}
        <button type="button" className="w95-titlebtn ml-0.5" aria-label="Close" onClick={onClose}>
          <svg width="8" height="7" aria-hidden="true">
            <path d="M0 0h2l2 2 2-2h2v1L5 3.5 8 6v1H6L4 5 2 7H0V6l3-2.5L0 1z" fill="#000" />
          </svg>
        </button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </section>
  );
}
