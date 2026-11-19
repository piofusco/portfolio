import type { Metadata } from "next";
import Link from "next/link";

// Legal and support pages linked from inside the Skrong app and from the Skrong
// home page. They are kept out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SkrongLegalLayout({ children }: LayoutProps<"/skrong">) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/skrong" className="mb-8 inline-block text-sm text-muted hover:text-foreground">
        ← Skrong
      </Link>
      <article className="space-y-4 leading-relaxed [&_h2]:pt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:pt-2 [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:text-accent [&_a]:underline">
        {children}
      </article>
    </main>
  );
}
