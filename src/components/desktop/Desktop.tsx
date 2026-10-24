"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { apps, profile } from "@/data";
import { ComputerIcon, DocumentIcon, FolderIcon, GlobeIcon, MailIcon, StartLogo } from "./icons";
import { IconButton, ProgramContent, describe, openExternal, type Program } from "./programs";
import { Window, type WindowFrame } from "./Window";
import "./win95.css";

// `seq` records opening order so taskbar buttons stay put as windows are focused.
type OpenWindow = WindowFrame & { program: Program; seq: number };

type Shortcut = {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: boolean;
  action: { program: Program } | { href: string };
};

const shortcuts: Shortcut[] = [
  { id: "about", label: "About Me", icon: <ComputerIcon />, action: { program: { type: "about" } } },
  { id: "resume", label: "Resume.pdf", icon: <DocumentIcon />, action: { program: { type: "resume" } } },
  { id: "apps", label: "My Apps", icon: <FolderIcon />, action: { program: { type: "apps" } } },
  ...apps.map((app) => ({
    id: `app-${app.name}`,
    label: app.name,
    icon: <Image src={app.icon} alt="" width={32} height={32} className="rounded-md" />,
    shortcut: true,
    action: { program: { type: "app", name: app.name } as Program },
  })),
  { id: "work", label: "Work Apps", icon: <FolderIcon />, action: { program: { type: "work" } } },
  { id: "repos", label: "My Repos", icon: <FolderIcon />, action: { program: { type: "repos" } } },
  { id: "github", label: "GitHub", icon: <GlobeIcon />, shortcut: true, action: { href: profile.github } },
  { id: "linkedin", label: "LinkedIn", icon: <GlobeIcon />, shortcut: true, action: { href: profile.linkedin } },
  { id: "email", label: "Email Me", icon: <MailIcon />, action: { href: `mailto:${profile.email}` } },
];

function frameFor(program: Program, index: number, seq: number): OpenWindow {
  const info = describe(program);
  const narrow = typeof window !== "undefined" && window.innerWidth < 640;
  return {
    ...info,
    program,
    seq,
    x: 110 + index * 26,
    y: 24 + index * 26,
    minimized: false,
    maximized: narrow && !info.dialog,
  };
}

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>(() => [{ ...frameFor({ type: "welcome" }, 0, 0), x: 160, y: 70 }]);
  const [selected, setSelected] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);

  // Windows are kept in stacking order: the last one is on top.
  const top = windows.findLast((w) => !w.minimized);

  const update = (id: string, change: Partial<OpenWindow>) =>
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...change } : w)));

  const focus = (id: string) =>
    setWindows((ws) => {
      const target = ws.find((w) => w.id === id);
      if (!target) return ws;
      return [...ws.filter((w) => w.id !== id), { ...target, minimized: false }];
    });

  const open = (program: Program) => {
    setStartOpen(false);
    const id = describe(program).id;
    setWindows((ws) => {
      const existing = ws.find((w) => w.id === id);
      if (existing) return [...ws.filter((w) => w.id !== id), { ...existing, minimized: false }];
      return [...ws, frameFor(program, ws.length, Math.max(0, ...ws.map((w) => w.seq)) + 1)];
    });
  };

  const close = (id: string) => setWindows((ws) => ws.filter((w) => w.id !== id));

  const run = (action: Shortcut["action"]) => {
    setStartOpen(false);
    if ("href" in action) openExternal(action.href);
    else open(action.program);
  };

  return (
    <div className="w95 w95-desktop fixed inset-0 overflow-hidden select-none">
      <h1 className="sr-only">
        {profile.name} — {profile.title}
      </h1>
      <div
        role="listbox"
        aria-label="Desktop"
        className="flex h-[calc(100dvh-28px)] flex-col flex-wrap content-start gap-1 p-2"
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
      >
        {shortcuts.map((s) => (
          <IconButton
            key={s.id}
            label={s.label}
            icon={s.icon}
            shortcut={s.shortcut}
            selected={selected === s.id}
            onSelect={() => setSelected(s.id)}
            onOpen={() => run(s.action)}
          />
        ))}
      </div>

      {windows.map((w, i) => (
        <Window
          key={w.id}
          frame={w}
          active={w.id === top?.id}
          zIndex={10 + i}
          onFocus={() => w.id !== top?.id && focus(w.id)}
          onClose={() => close(w.id)}
          onMinimize={() => update(w.id, { minimized: true })}
          onToggleMaximize={() => update(w.id, { maximized: !w.maximized })}
          onMove={(x, y) => update(w.id, { x, y })}
        >
          <ProgramContent program={w.program} open={open} close={() => close(w.id)} />
        </Window>
      ))}

      {startOpen && (
        <>
          <div className="fixed inset-0 z-[90]" onPointerDown={() => setStartOpen(false)} />
          <StartMenu run={run} onClose={() => setStartOpen(false)} />
        </>
      )}

      <Taskbar
        windows={windows}
        activeId={top?.id}
        startOpen={startOpen}
        onStart={() => setStartOpen((o) => !o)}
        onTask={(w) => (w.id === top?.id ? update(w.id, { minimized: true }) : focus(w.id))}
      />
    </div>
  );
}

const startItems: { label: string; icon: React.ReactNode; action: Shortcut["action"] }[] = [
  { label: "About Me", icon: <ComputerIcon size={24} />, action: { program: { type: "about" } } },
  { label: "Resume", icon: <DocumentIcon size={24} />, action: { program: { type: "resume" } } },
  { label: "My Apps", icon: <FolderIcon size={24} />, action: { program: { type: "apps" } } },
  { label: "Apps I've Worked On", icon: <FolderIcon size={24} />, action: { program: { type: "work" } } },
  { label: "My Repos", icon: <FolderIcon size={24} />, action: { program: { type: "repos" } } },
  { label: "GitHub", icon: <GlobeIcon size={24} />, action: { href: profile.github } },
  { label: "LinkedIn", icon: <GlobeIcon size={24} />, action: { href: profile.linkedin } },
  { label: "Email Me", icon: <MailIcon size={24} />, action: { href: `mailto:${profile.email}` } },
];

function StartMenu({ run, onClose }: { run: (action: Shortcut["action"]) => void; onClose: () => void }) {
  return (
    <nav
      aria-label="Start menu"
      className="w95-raised fixed bottom-[26px] left-[2px] z-[100] flex p-[3px]"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="flex w-[24px] items-end bg-gradient-to-t from-[#000080] to-[#1084d0] pb-2">
        <span className="-rotate-90 origin-bottom-left translate-x-[20px] text-lg whitespace-nowrap text-[#c0c0c0]">
          <b className="text-white">Pace</b>95
        </span>
      </div>
      <ul className="flex min-w-[180px] flex-col">
        {startItems.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              className="w95-menuitem flex w-full items-center gap-3 px-2 py-1.5 text-left"
              onClick={() => run(item.action)}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
        <li className="mx-1 my-1 border-t border-b border-t-[#808080] border-b-white" role="separator" />
        <li>
          <Link href="/classic" className="w95-menuitem flex w-full items-center gap-3 px-2 py-1.5">
            <DocumentIcon size={24} />
            Classic Website
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function subscribeToClock(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

function Taskbar({
  windows,
  activeId,
  startOpen,
  onStart,
  onTask,
}: {
  windows: OpenWindow[];
  activeId: string | undefined;
  startOpen: boolean;
  onStart: () => void;
  onTask: (w: OpenWindow) => void;
}) {
  const time = useSyncExternalStore(
    subscribeToClock,
    () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    () => "",
  );
  const tasks = [...windows].sort((a, b) => a.seq - b.seq);

  return (
    <footer className="w95-raised fixed inset-x-0 bottom-0 z-[95] flex h-[28px] items-center gap-1 px-[2px] pt-[2px]">
      <button
        type="button"
        aria-pressed={startOpen}
        aria-expanded={startOpen}
        className="w95-btn flex h-[22px] min-w-0 items-center gap-1 px-1 font-bold"
        onClick={onStart}
      >
        <span className="flex items-center gap-1">
          <StartLogo size={16} />
          Start
        </span>
      </button>
      <div className="flex min-w-0 flex-1 gap-1 overflow-hidden">
        {tasks.map((w) => (
          <button
            key={w.id}
            type="button"
            aria-pressed={w.id === activeId}
            className="w95-btn flex h-[22px] w-[150px] min-w-0 shrink items-center px-1 text-left"
            onClick={() => onTask(w)}
          >
            <span className="flex min-w-0 items-center gap-1">
              {w.icon && <span className="shrink-0">{w.icon}</span>}
              <span className="truncate">{w.title}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="w95-status flex h-[22px] shrink-0 items-center px-3">{time}</div>
    </footer>
  );
}
