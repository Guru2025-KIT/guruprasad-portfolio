import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Fraunces — self-hosted variable font (OFL licensed, see fonts/OFL-Fraunces.txt)
const fraunces = localFont({
  src: [
    {
      path: "./fonts/Fraunces-Roman.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "./fonts/Fraunces-Italic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

// JetBrains Mono — self-hosted variable font (OFL licensed, see fonts/OFL-JetBrainsMono.txt)
const jbMono = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  variable: "--font-jbmono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guruprasad Shinde — AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Guruprasad Shinde — AI & ML Engineer, Full-Stack Developer, and Problem Solver. B.Tech CSE (AI & ML) student building intelligent digital experiences.",
  keywords: [
    "Guruprasad Shinde",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Guruprasad Shinde — AI Engineer & Full-Stack Developer",
    description:
      "Building intelligent digital experiences. AI & ML Engineer, Full-Stack Developer, Problem Solver.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${jbMono.variable} bg-ink-950 text-paper font-body antialiased selection:bg-signal-blue/30 selection:text-paper`}
      >
        <NoiseOverlay />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
