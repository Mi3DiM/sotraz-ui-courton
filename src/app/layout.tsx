import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOTRAZ — Le mouvement, maîtrisé.",
  description: "SOTRAZ organise vos déplacements de personnel, vos flux routiers et la mise à disposition de moyens en Algérie.",
  metadataBase: new URL("https://sotraz.example"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
