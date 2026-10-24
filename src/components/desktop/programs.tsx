"use client";

import Image from "next/image";
import { useState } from "react";
import { apps, education, experience, profile, repos, skills, type App, type Repo } from "@/data";
import { ComputerIcon, DocumentIcon, ErrorIcon, FolderIcon, ShortcutBadge } from "./icons";

export type Program =
  | { type: "welcome" }
  | { type: "about" }
  | { type: "resume" }
  | { type: "apps" }
  | { type: "app"; name: string }
  | { type: "repos" }
  | { type: "denied"; repo: string };

export type ProgramInfo = {
  id: string;
  title: string;
  icon: React.ReactNode;
  width: number;
  height: number;
  dialog: boolean;
};

export function describe(program: Program): ProgramInfo {
  switch (program.type) {
    case "welcome":
      return { id: "welcome", title: "Welcome", icon: null, width: 500, height: 290, dialog: true };
    case "about":
      return { id: "about", title: "About Me", icon: <ComputerIcon size={16} />, width: 540, height: 470, dialog: false };
    case "resume":
      return {
        id: "resume",
        title: "Resume.doc - WordPad",
        icon: <DocumentIcon size={16} />,
        width: 700,
        height: 580,
        dialog: false,
      };
    case "apps":
      return { id: "apps", title: "My Apps", icon: <FolderIcon size={16} />, width: 440, height: 300, dialog: false };
    case "app": {
      const app = findApp(program.name);
      return {
        id: `app-${program.name}`,
        title: app.name,
        icon: <Image src={app.icon} alt="" width={16} height={16} />,
        width: 720,
        height: 580,
        dialog: false,
      };
    }
    case "repos":
      return { id: "repos", title: "My Repos", icon: <FolderIcon size={16} />, width: 660, height: 380, dialog: false };
    case "denied":
      return { id: `denied-${program.repo}`, title: "Error", icon: null, width: 380, height: 150, dialog: true };
  }
}

function findApp(name: string): App {
  return apps.find((app) => app.name === name) ?? apps[0];
}

type ProgramProps = {
  program: Program;
  open: (program: Program) => void;
  close: () => void;
};

export function ProgramContent({ program, open, close }: ProgramProps) {
  switch (program.type) {
    case "welcome":
      return <Welcome open={open} close={close} />;
    case "about":
      return <About />;
    case "resume":
      return <Resume />;
    case "apps":
      return <AppsFolder open={open} />;
    case "app":
      return <AppDetail app={findApp(program.name)} close={close} />;
    case "repos":
      return <Repos open={open} />;
    case "denied":
      return <Denied repo={program.repo} close={close} />;
  }
}

export function openExternal(href: string) {
  if (href.startsWith("mailto:")) {
    window.location.href = href;
  } else {
    window.open(href, "_blank", "noopener,noreferrer");
  }
}

function Welcome({ open, close }: Pick<ProgramProps, "open" | "close">) {
  return (
    <div className="flex flex-1 gap-4 overflow-auto p-4">
      <div className="flex-1">
        <p className="text-2xl">
          Welcome to <b>Pace</b>
          <span className="font-bold text-white [text-shadow:1px_1px_#000]">95</span>
        </p>
        <div className="w95-sunken mt-4 bg-[#ffffe1] p-3">
          <p className="font-bold">Did you know...</p>
          <p className="mt-2 leading-relaxed">
            I&apos;m {profile.name}, {profile.title} in {profile.location}. Open the icons on the desktop to see my
            resume, the apps I&apos;ve shipped, and my code.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <button type="button" className="w95-btn" onClick={() => open({ type: "about" })}>
          <span>About Me</span>
        </button>
        <button type="button" className="w95-btn" onClick={() => open({ type: "resume" })}>
          <span>Resume</span>
        </button>
        <button type="button" className="w95-btn" onClick={() => open({ type: "apps" })}>
          <span>My Apps</span>
        </button>
        <button type="button" className="w95-btn mt-auto" onClick={close}>
          <span>Close</span>
        </button>
      </div>
    </div>
  );
}

function About() {
  const contacts = [
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ];
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-auto p-3">
      <div className="flex gap-4">
        <div className="shrink-0">
          <ComputerIcon size={64} />
        </div>
        <div>
          <p className="text-base font-bold">{profile.name}</p>
          <p>{profile.title}</p>
          <p>{profile.location}</p>
          <p className="mt-3 leading-relaxed">{profile.summary}</p>
        </div>
      </div>
      <fieldset className="w95-group">
        <legend>Skills</legend>
        <p className="leading-relaxed">{skills.join(" · ")}</p>
      </fieldset>
      <fieldset className="w95-group">
        <legend>Education</legend>
        <p>{education}</p>
      </fieldset>
      <div className="mt-auto flex flex-wrap justify-end gap-2 pt-1">
        {contacts.map((c) => (
          <button key={c.label} type="button" className="w95-btn" onClick={() => openExternal(c.href)}>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Resume() {
  return (
    <>
      <div className="flex shrink-0 gap-1 border-b border-[#808080] p-1">
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="w95-btn grid place-items-center">
          <span>Open PDF</span>
        </a>
        <a href={profile.resume} download className="w95-btn grid place-items-center">
          <span>Download</span>
        </a>
      </div>
      <div className="w95-sunken m-1 min-h-0 flex-1 overflow-auto bg-[#808080] p-2">
        <article className="w95-doc mx-auto max-w-[640px] bg-white px-4 py-6 text-black sm:px-8 shadow-[2px_2px_#000]">
          <h1 className="text-2xl font-bold italic">{profile.name}</h1>
          <p className="border-b border-black pb-1">
            {profile.title} · {profile.location} · {profile.email}
          </p>
          <p className="mt-3 italic">{profile.summary}</p>
          <h2 className="mt-5 border-b border-black text-center font-bold tracking-[0.3em] uppercase">Experience</h2>
          {experience.map((job) => (
            <section key={`${job.company}-${job.dates}`} className="mt-4">
              <p>
                <b className="underline">{job.role}</b> — <b>{job.company}</b> | <i>{job.dates}</i>
              </p>
              <p className="mt-1 pl-4 italic">{job.summary}</p>
              {job.highlights.length > 0 && (
                <ul className="mt-1 list-disc pl-10">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <h2 className="mt-5 border-b border-black text-center font-bold tracking-[0.3em] uppercase">Skills</h2>
          <p className="mt-2">{skills.join(", ")}</p>
          <h2 className="mt-5 border-b border-black text-center font-bold tracking-[0.3em] uppercase">Education</h2>
          <p className="mt-2 text-center font-bold italic">{education}</p>
        </article>
      </div>
    </>
  );
}

function AddressBar({ path }: { path: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 p-1">
      <span>Address</span>
      <span className="w95-sunken flex-1 bg-white px-2 py-1">{path}</span>
    </div>
  );
}

function StatusBar({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 gap-[2px] pt-[2px]">
      <span className="w95-status flex-1 truncate px-1 py-0.5">{text}</span>
    </div>
  );
}

function AppsFolder({ open }: Pick<ProgramProps, "open">) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <AddressBar path="C:\My Apps" />
      <div
        role="listbox"
        aria-label="Apps"
        className="w95-folder w95-sunken mx-1 flex min-h-0 flex-1 flex-wrap content-start gap-2 overflow-auto bg-white p-3"
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
      >
        {apps.map((app) => (
          <IconButton
            key={app.name}
            label={app.name}
            selected={selected === app.name}
            onSelect={() => setSelected(app.name)}
            onOpen={() => open({ type: "app", name: app.name })}
            icon={<Image src={app.icon} alt="" width={32} height={32} className="rounded-md" />}
          />
        ))}
      </div>
      <StatusBar text={`${apps.length} object(s)`} />
    </>
  );
}

function AppDetail({ app, close }: { app: App; close: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-auto p-3">
      <div className="flex items-center gap-3">
        <Image src={app.icon} alt="" width={56} height={56} className="rounded-xl" />
        <div>
          <p className="text-base font-bold">{app.name}</p>
          <p>{app.tagline}</p>
        </div>
      </div>
      <p className="leading-relaxed">{app.description}</p>
      <fieldset className="w95-group">
        <legend>Built with</legend>
        <p>{app.tags.join(" · ")}</p>
      </fieldset>
      <div className="w95-sunken flex shrink-0 gap-3 overflow-x-auto bg-[#008080] p-3">
        {app.screenshots.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${app.name} screenshot ${i + 1}`}
            width={554}
            height={1200}
            className="h-72 w-auto shrink-0"
          />
        ))}
      </div>
      <div className="mt-auto flex justify-end gap-2">
        {app.appStore && (
          <button type="button" className="w95-btn" onClick={() => openExternal(app.appStore!)}>
            <span>View on the App Store</span>
          </button>
        )}
        {app.repo && (
          <button type="button" className="w95-btn" onClick={() => openExternal(app.repo!)}>
            <span>Source</span>
          </button>
        )}
        <button type="button" className="w95-btn" onClick={close}>
          <span>Close</span>
        </button>
      </div>
    </div>
  );
}

function Repos({ open }: Pick<ProgramProps, "open">) {
  const [selected, setSelected] = useState<string | null>(null);
  const openRepo = (repo: Repo) => (repo.url ? openExternal(repo.url) : open({ type: "denied", repo: repo.name }));
  const current = repos.find((r) => r.name === selected);
  return (
    <>
      <AddressBar path="C:\My Repos" />
      <div className="w95-sunken mx-1 min-h-0 flex-1 overflow-auto bg-white p-[2px]">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0">
            <tr>
              {["Name", "Language", "Description"].map((h) => (
                <th key={h} className="w95-raised px-2 py-0.5 font-normal whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr
                key={repo.name}
                tabIndex={0}
                aria-selected={selected === repo.name}
                className="w95-row w95-focus cursor-default align-top"
                onClick={() => setSelected(repo.name)}
                onDoubleClick={() => openRepo(repo)}
                onPointerUp={(e) => e.pointerType === "touch" && openRepo(repo)}
                onKeyDown={(e) => e.key === "Enter" && openRepo(repo)}
              >
                <td className="px-2 py-0.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <FolderIcon size={16} />
                    {repo.name}
                  </span>
                </td>
                <td className="px-2 py-0.5 whitespace-nowrap">{repo.language}</td>
                <td className="px-2 py-0.5">{repo.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StatusBar
        text={
          current
            ? current.url
              ? `Double-click to open ${current.name} on GitHub`
              : `${current.name} is private`
            : `${repos.length} object(s) · Double-click a repo to open it on GitHub`
        }
      />
    </>
  );
}

function Denied({ repo, close }: { repo: string; close: () => void }) {
  return (
    <div className="flex flex-1 flex-col p-3">
      <div className="flex items-start gap-3">
        <ErrorIcon />
        <p className="pt-1 leading-relaxed">
          Access is denied.
          <br />
          {repo} is a private repository.
        </p>
      </div>
      <div className="mt-auto flex justify-center">
        <button type="button" className="w95-btn" onClick={close} autoFocus>
          <span>OK</span>
        </button>
      </div>
    </div>
  );
}

// Desktop-style icon: click selects, double-click (or tap, or Enter) opens.
export function IconButton({
  label,
  icon,
  selected,
  shortcut = false,
  onSelect,
  onOpen,
}: {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  shortcut?: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className="w95-icon w95-focus flex w-[76px] flex-col items-center gap-1 p-1"
      onClick={(e) => (e.detail === 0 ? onOpen() : onSelect())}
      onDoubleClick={onOpen}
      onPointerUp={(e) => e.pointerType === "touch" && onOpen()}
    >
      <span className="w95-icon-art relative">
        {icon}
        {shortcut && <ShortcutBadge />}
      </span>
      <span className="w95-icon-label">{label}</span>
    </button>
  );
}
