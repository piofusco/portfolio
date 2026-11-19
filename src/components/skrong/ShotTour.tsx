"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DeviceFrame, devices, shotSrc, type Device } from "./DeviceFrame";

const shots = [
  {
    id: "active-workout",
    eyebrow: "Gym workouts",
    title: "Log every set as you lift",
    body: "Check off sets as you go, with last session’s weight right beside each one. Rate how hard each set felt, and a rest timer counts down before the next.",
    points: ["Previous weights and reps for every set", "Effort rating per set", "Skip a rest or repeat a set in one tap"],
  },
  {
    id: "hiit",
    eyebrow: "Interval timers",
    title: "A timer you can read from across the room",
    body: "HIIT, Tabata, circuit, and round timers with a huge countdown and color-coded intervals. Skrong speaks each interval’s name, so you never have to look.",
    points: ["Elapsed, interval, and remaining at a glance", "Spoken cues, beeps, or vibration", "Your music keeps playing"],
  },
  {
    id: "programs",
    eyebrow: "Programs",
    title: "Programs that progress for you",
    body: "Run a plan like StrongLifts 5×5 or build your own. Set how long it runs, which workouts it repeats, and how much weight to add each session.",
    points: ["Weekly schedule of workouts", "Progression rules per exercise", "Repeats until the program ends"],
  },
  {
    id: "exercises",
    eyebrow: "Exercise library",
    title: "Find the right exercise fast",
    body: "Search the library or filter by muscle group and equipment, with an illustration for each exercise. Can’t find yours? Create it.",
    points: ["Filter by muscle and equipment", "Illustrated exercises", "Add your own custom exercises"],
  },
  {
    id: "supersets",
    eyebrow: "Supersets",
    title: "Mix lifting and intervals in one superset",
    body: "Pair weighted sets with timed holds and intervals, then set the rounds and rests between them. Skrong walks you through every round.",
    points: ["Reps, weights, and timed intervals together", "Rounds with rest between exercises", "Reorder anything mid-workout"],
  },
  {
    id: "export",
    eyebrow: "Export",
    title: "Take your workouts anywhere",
    body: "Export any workout as plain text and copy or share it with a coach, a friend, or your notes. Paste text back in and Skrong turns it into a template on device.",
    points: ["Readable plain-text export", "Copy or share in one tap", "Import from text on supported devices"],
  },
];

const deviceOrder: Device[] = ["iphone", "ipad", "duo"];

// Desktop frame widths, capped so the whole device fits in the viewport.
const stickyWidth: Record<Device, string> = {
  iphone: "w-[min(100%,34vh,320px)]",
  ipad: "w-[min(100%,58vh)]",
  duo: "w-[min(100%,52vh)]",
};
const inlineWidth: Record<Device, string> = {
  iphone: "w-60",
  ipad: "w-full max-w-sm",
  duo: "w-72",
};

export function ShotTour() {
  const [device, setDevice] = useState<Device>("iphone");
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  // The step crossing the middle of the viewport drives the sticky device.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const step of steps.current) if (step) observer.observe(step);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tour" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A closer look</h2>
        <p className="mt-3 text-lg text-muted">
          One app for the weight room and the interval timer, on iPhone, iPad, and Duo.
        </p>
      </div>

      <div className="sticky top-4 z-20 mt-8 flex justify-center lg:hidden">
        <DevicePicker device={device} onChange={setDevice} />
      </div>

      <div className="mt-8 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8 py-10">
            <DevicePicker device={device} onChange={setDevice} />
            <DeviceFrame device={device} className={`transition-[width] duration-500 ${stickyWidth[device]}`}>
              {shots.map((shot, i) => (
                <Image
                  key={`${device}-${shot.id}`}
                  src={shotSrc(device, shot.id)}
                  alt={i === active ? `${shot.title} on ${devices[device].label}` : ""}
                  fill
                  sizes="(min-width: 1024px) 40vw, 1px"
                  className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </DeviceFrame>
          </div>
        </div>

        <ol className="space-y-20 lg:space-y-0">
          {shots.map((shot, i) => (
            <li
              key={shot.id}
              ref={(el) => {
                steps.current[i] = el;
              }}
              data-index={i}
              className="flex flex-col items-center gap-8 lg:min-h-screen lg:flex-row lg:items-center"
            >
              <DeviceFrame device={device} className={`lg:hidden ${inlineWidth[device]}`}>
                <Image
                  src={shotSrc(device, shot.id)}
                  alt={`${shot.title} on ${devices[device].label}`}
                  fill
                  sizes="(min-width: 1024px) 1px, 90vw"
                  className="object-cover"
                />
              </DeviceFrame>
              <div
                className={`max-w-md transition-opacity duration-500 ${i === active ? "lg:opacity-100" : "lg:opacity-40"}`}
              >
                <p className="text-sm font-semibold tracking-wide text-accent uppercase">
                  {String(i + 1).padStart(2, "0")} · {shot.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{shot.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{shot.body}</p>
                <ul className="mt-5 space-y-2">
                  {shot.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DevicePicker({ device, onChange }: { device: Device; onChange: (device: Device) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="Device"
      className="inline-flex rounded-full border border-border bg-card/90 p-1 shadow-sm backdrop-blur"
    >
      {deviceOrder.map((d) => (
        <button
          key={d}
          type="button"
          role="radio"
          aria-checked={device === d}
          onClick={() => onChange(d)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            device === d ? "bg-accent text-white" : "text-muted hover:text-foreground"
          }`}
        >
          {devices[d].label}
        </button>
      ))}
    </div>
  );
}
