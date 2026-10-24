// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Michael Pace",
  title: "Senior iOS Engineer",
  location: "Denver, CO",
  email: "terinopace@gmail.com",
  linkedin: "https://www.linkedin.com/in/americopace/",
  github: "https://github.com/piofusco",
  resume: "/michael-pace-resume.pdf",
  summary:
    "Senior iOS engineer with over a decade of experience building and scaling mobile apps across greenfield, legacy, and high-traffic environments. I care about clean architecture, automated testing, and tooling that makes teams faster.",
};

export type App = {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  screenshots: string[];
  appStore?: string;
  repo?: string;
  tags: string[];
};

export const apps: App[] = [
  {
    name: "Secnds",
    tagline: "Interval timer built for people who actually work out",
    description:
      "HIIT, circuit, and round timers plus gym workouts with sets, reps, and supersets. Spoken interval coaching, Apple Health logging, and your music keeps playing.",
    icon: "/apps/secnds/icon.png",
    screenshots: ["/apps/secnds/shot1.png", "/apps/secnds/shot2.png", "/apps/secnds/shot3.png"],
    appStore: "https://apps.apple.com/us/app/secnds/id6758421780",
    tags: ["SwiftUI", "SwiftData", "Swift 6", "HealthKit", "StoreKit"],
  },
  {
    name: "Lanesnap",
    tagline: "Track every frame. Elevate your game.",
    description:
      "A simple, private bowling scorekeeper. Enter throws frame by frame and full ten-pin scoring is handled for you, with history and iCloud sync across iPhone and iPad.",
    icon: "/apps/lanesnap/icon.png",
    screenshots: ["/apps/lanesnap/shot1.png", "/apps/lanesnap/shot2.png", "/apps/lanesnap/shot3.png"],
    appStore: "https://apps.apple.com/us/app/lanesnap/id6785145368",
    tags: ["SwiftUI", "SwiftData", "CloudKit"],
  },
];

export type Repo = {
  name: string;
  description: string;
  language: string;
  // Set when the repo is public. Repos without a URL render without a link.
  url?: string;
};

export const repos: Repo[] = [
  {
    name: "harnesses",
    description:
      "Agentic-coding conventions plus iOS dev tools for Claude Code: LSP Bridge, Test Bridge, Xcode Bridge, and Crash Report Bridge.",
    language: "Python",
  },
  {
    name: "IOSBuddy",
    description: "macOS menu bar companion for iOS development. SwiftUI MenuBarExtra, MVVM, Swift Testing.",
    language: "Swift",
  },
  {
    name: "NostalgiaUI",
    description: "Windows 95 styled UI components for iOS.",
    language: "Swift",
  },
  {
    name: "Scaffold-SwiftUI",
    description: "Scaffold iOS project using SwiftUI and async/await.",
    language: "Swift",
    url: "https://github.com/piofusco/Scaffold-SwiftUI",
  },
  {
    name: "RPN-Calculator",
    description: "Reverse Polish Notation calculator for iOS with stack display as postfix and infix.",
    language: "Objective-C",
    url: "https://github.com/piofusco/RPN-Calculator",
  },
  {
    name: "COMP-4300-VHDL",
    description: "MIPS processor written in VHDL.",
    language: "VHDL",
    url: "https://github.com/piofusco/COMP-4300-VHDL",
  },
];

export type Job = {
  role: string;
  company: string;
  dates: string;
  summary: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    role: "Staff iOS Engineer",
    company: "Fanatics",
    dates: "Oct 2022 – Aug 2025",
    summary:
      "Led greenfield development and release of two iOS apps (FanApp and Sportsbook) while modernizing mobile architecture and platform reliability.",
    highlights: [
      "Delivered a full greenfield rebuild of a decade-old iOS app, growing monthly revenue to $1M with a 4.8+ App Store rating.",
      "Built a high-frequency WebSocket consumer processing hundreds of market updates per second at 60fps.",
      "Established MVVM+R coding standards enabling parallel development for 10+ engineers.",
      "Designed a schema-governed API contract for page feeds, saving thousands of engineering hours.",
    ],
  },
  {
    role: "Senior iOS Engineer",
    company: "Angi",
    dates: "Jan 2022 – Sep 2022",
    summary: "Modernized legacy iOS apps and introduced testing and automation that stabilized the platform.",
    highlights: [
      "Reduced regressions by 40% by requiring tests on all new and modified code.",
      "Refactored Ads & Leads apps, cutting crash rates by 25%.",
      "Automated regression tests with Sinatra and UI testing, saving ~30 QA hours/month.",
    ],
  },
  {
    role: "Senior iOS Engineer",
    company: "Flowhub",
    dates: "Dec 2020 – Oct 2021",
    summary: "Tech lead for a greenfield cross-platform payments app in React Native and TypeScript.",
    highlights: [
      "Modernized a legacy Swift codebase for modularity and testability.",
      "Built CI/CD pipelines and established TDD and agile workflows.",
    ],
  },
  {
    role: "Staff iOS Engineer",
    company: "Ibotta",
    dates: "Jan 2020 – Mar 2020",
    summary: "Redemption UX squad, improving cash back redemption reliability during a legacy system transition.",
    highlights: [],
  },
  {
    role: "Senior Software Engineer",
    company: "Pivotal Labs",
    dates: "May 2015 – Nov 2019",
    summary:
      "Drove agile and XP transformations for enterprise, government (including the F-35 program), and startup clients.",
    highlights: [
      "Led teams adopting TDD, CI/CD, and pair programming.",
      "Streamlined iOS release workflows with Fastlane.",
    ],
  },
];

export const skills = [
  "Swift",
  "SwiftUI",
  "UIKit",
  "Swift Concurrency",
  "SwiftData",
  "Core Data",
  "Combine",
  "Objective-C",
  "Kotlin",
  "XCTest",
  "Swift Testing",
  "TDD",
  "XcodeGen",
  "Fastlane",
  "CI/CD",
  "Instruments",
  "GraphQL",
  "TypeScript",
];

export const education = "B.S. Software Engineering, Magna Cum Laude — Auburn University";
