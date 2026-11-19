import type { Metadata } from "next";
import { FeedbackForm } from "@/components/skrong/FeedbackForm";

export const metadata: Metadata = {
  title: "Skrong — Send Feedback",
};

export default function SkrongFeedback() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Send Feedback</h1>
        <p className="mt-1 text-muted">Found a bug or have an idea for Skrong? Tell me about it.</p>
      </header>
      <FeedbackForm />
    </>
  );
}
