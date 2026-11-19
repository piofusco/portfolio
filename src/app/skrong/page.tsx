import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeviceFrame, shotSrc } from "@/components/skrong/DeviceFrame";
import { ShotTour } from "@/components/skrong/ShotTour";

const appStoreUrl = "https://apps.apple.com/us/app/id6758421780";
const supportEmail = "support@michaelpace.dev";

const description =
  "Log sets, reps, and supersets, run programs that progress for you, and time HIIT, Tabata, circuit, and round workouts. Your data stays on your device.";

export const metadata: Metadata = {
  title: "Skrong — Workout Tracker & Interval Timer",
  description,
  openGraph: {
    title: "Skrong — Workout Tracker & Interval Timer",
    description,
    url: "/skrong",
    siteName: "Skrong",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const extras = [
  {
    title: "Your music keeps playing",
    body: "Listen to your playlist without interruption while Skrong calls out intervals.",
  },
  {
    title: "Apple Health",
    body: "Workouts, heart rate, and calories sync to Health. Track weight, body fat, and measurements over time.",
  },
  {
    title: "History and analytics",
    body: "See your week at a glance, keep your streak going, and earn rewards for showing up.",
  },
  {
    title: "On-device insights",
    body: "On supported devices, Apple Intelligence turns your history into insights without leaving your iPhone.",
  },
  {
    title: "iCloud backups",
    body: "Back up to your own iCloud Drive and restore on a new device whenever you need.",
  },
  {
    title: "Alerts your way",
    body: "Spoken interval names, beeps, or vibration only. Pick what works in your gym.",
  },
];

export default function SkrongHome() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.45),transparent_65%)]"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 text-center sm:px-6 sm:pt-24">
          <Image
            src="/apps/skrong/icon.png"
            alt=""
            width={96}
            height={96}
            preload
            className="rounded-[1.4rem] shadow-xl shadow-orange-500/30"
          />
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">Skrong</h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300 sm:text-xl">
            The workout tracker and interval timer built for people who actually work out.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={appStoreUrl}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-stone-950 transition hover:bg-stone-200"
            >
              <AppleLogo />
              Download on the App Store
            </a>
            <a href="#tour" className="px-4 py-3 font-medium text-stone-300 transition hover:text-white">
              Take the tour ↓
            </a>
          </div>
          <p className="mt-3 text-sm text-stone-400">Pay once - use forever. No account. Completely private.</p>

          <div className="relative mt-14 aspect-[10/7] w-full max-w-5xl sm:mt-20">
            <DeviceFrame device="ipad" className="absolute top-0 left-1/2 w-[52%] -translate-x-1/2">
              <Image src={shotSrc("ipad", "programs")} alt="Skrong on iPad" fill preload sizes="52vw" className="object-cover" />
            </DeviceFrame>
            <DeviceFrame device="iphone" className="absolute bottom-0 left-[8%] z-10 w-[20%]">
              <Image src={shotSrc("iphone", "hiit")} alt="Skrong on iPhone" fill preload sizes="20vw" className="object-cover" />
            </DeviceFrame>
            <DeviceFrame device="duo" className="absolute right-[3%] bottom-0 z-10 w-[30%]">
              <Image src={shotSrc("duo", "active-workout")} alt="Skrong on Duo" fill preload sizes="30vw" className="object-cover" />
            </DeviceFrame>
          </div>
        </div>
        <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </section>

      <ShotTour />

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight">And everything else you’d expect</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((extra) => (
              <div key={extra.title}>
                <h3 className="font-semibold">{extra.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{extra.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Private by design</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Your workouts, history, and measurements stay on your device. Back them up to your own iCloud Drive if you
            like. No accounts, no ads, no analytics, no tracking.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Pay once, if you want</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Skrong is free to download. A one-time Skrong Unlimited purchase unlocks unlimited workouts and timers and
            lets you organize them in folders. No subscription.
          </p>
        </div>
      </section>

      <section id="support" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Support</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            Found a bug, have a question, or have an idea for Skrong? Get in touch.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <SupportLink href="/skrong/feedback" title="Send feedback" body="Report a bug or request a feature, with screenshots." />
            <SupportLink href={`mailto:${supportEmail}`} title="Email support" body={supportEmail} />
            <SupportLink href="/skrong/privacy" title="Privacy Policy" body="What Skrong stores and where." />
            <SupportLink href="/skrong/terms" title="Terms and Conditions" body="The rules for using Skrong." />
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>© Americo LLC</p>
          <p>
            Made in Denver by <Link href="/" className="hover:text-foreground">Michael Pace</Link>
          </p>
        </div>
      </footer>
    </main>
  );
}

function SupportLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-border bg-card p-6 transition hover:border-accent"
    >
      <h3 className="font-semibold group-hover:text-accent">{title} →</h3>
      <p className="mt-1 text-muted">{body}</p>
    </a>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden className="h-5 w-5 fill-current">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
