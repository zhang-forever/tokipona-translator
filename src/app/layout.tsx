import type { Metadata } from "next";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Toki Pona Translator",
  description: "Translate text to and from Toki Pona — a language with only ~120 words.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#fff", color: "#1e293b" }}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
