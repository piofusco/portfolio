import Image from "next/image";
import { apps, education, experience, profile, repos, skills, type App, type Repo } from "@/data";

const navLinks = [
  { href: "#apps", label: "Apps" },
  { href: "#code", label: "Code" },
  { href: "#experience", label: "Experience" },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#" className="font-semibold tracking-tight">
            {profile.name}
          </a>
          <div className="flex items-center gap-5 text-sm text-muted">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hidden hover:text-foreground sm:inline">
                {link.label}
              </a>
            ))}
            <a
              href={profile.resume}
              className="rounded-full bg-foreground px-4 py-1.5 font-medium text-background hover:opacity-80"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6">
        <Hero />
        <Section id="apps" title="Apps" subtitle="Shipped on the App Store">
          <div className="grid gap-8">
            {apps.map((app) => (
              <AppCard key={app.name} app={app} />
            ))}
          </div>
        </Section>
        <Section id="code" title="Code" subtitle="Libraries, tools, and experiments">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </Section>
        <Section id="experience" title="Experience" subtitle={`${education}`}>
          <ol className="space-y-10">
            {experience.map((job) => (
              <li key={`${job.company}-${job.dates}`} className="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-8">
                <p className="text-sm text-muted sm:pt-0.5">{job.dates}</p>
                <div>
                  <h3 className="font-semibold">
                    {job.role} · <span className="text-accent">{job.company}</span>
                  </h3>
                  <p className="mt-1 text-muted">{job.summary}</p>
                  {job.highlights.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
                      {job.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <a
            href={profile.resume}
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent"
          >
            Download full resume (PDF)
          </a>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted">
          <p>
            {profile.name} · {profile.location}
          </p>
          <ContactLinks />
        </div>
      </footer>
    </>
  );
}

function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">{profile.title}</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.summary}</p>
      <ul className="mt-8 flex max-w-2xl flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className="rounded-full border border-border bg-card px-3 py-1 text-xs">
            {skill}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ContactLinks />
      </div>
    </section>
  );
}

function ContactLinks() {
  const links = [
    { href: `mailto:${profile.email}`, label: "Email" },
    { href: profile.github, label: "GitHub" },
    { href: profile.linkedin, label: "LinkedIn" },
  ];
  return (
    <div className="flex gap-5 text-sm font-medium">
      {links.map((link) => (
        <a key={link.label} href={link.href} className="underline-offset-4 hover:text-accent hover:underline">
          {link.label}
        </a>
      ))}
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-20">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 mb-10 text-muted">{subtitle}</p>
      {children}
    </section>
  );
}

function AppCard({ app }: { app: App }) {
  return (
    <article className="grid gap-8 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <Image src={app.icon} alt="" width={72} height={72} className="rounded-2xl shadow-sm" />
          <div>
            <h3 className="text-2xl font-bold">{app.name}</h3>
            <p className="text-muted">{app.tagline}</p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed">{app.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-background px-2 py-1 font-mono text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-3 pt-8">
          {app.appStore && (
            <a
              href={app.appStore}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 dark:text-black"
            >
              View on the App Store
            </a>
          )}
          {app.repo && (
            <a href={app.repo} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-accent">
              Source
            </a>
          )}
        </div>
      </div>
      <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2">
        {app.screenshots.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${app.name} screenshot ${i + 1}`}
            width={554}
            height={1200}
            className="h-80 w-auto shrink-0 rounded-xl border border-border"
          />
        ))}
      </div>
    </article>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono font-semibold">{repo.name}</h3>
        {!repo.url && <span className="text-xs text-muted">private</span>}
      </div>
      <p className="mt-2 flex-1 text-sm text-muted">{repo.description}</p>
      <p className="mt-4 text-xs font-medium text-accent">{repo.language}</p>
    </>
  );
  const className = "flex h-full flex-col rounded-2xl border border-border bg-card p-5";
  return repo.url ? (
    <a href={repo.url} className={`${className} transition hover:-translate-y-0.5 hover:border-accent`}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}
