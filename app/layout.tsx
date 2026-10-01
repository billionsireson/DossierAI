import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import MobileNav from "@/components/navigation/MobileNav";

export const metadata: Metadata = {
  title: "GREGREY — Furniture Discovery & Connection Platform",
  description:
    "Find it. Match with the right business. Get it. Make finding the right furniture and the right furniture business simple, relevant and trustworthy. Lagos, Nigeria.",
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/app-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pb-20 md:pb-0">{children}</div>
        <MobileNav />
        <footer className="hidden md:block border-t border-border bg-surface mt-16">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-4 gap-8 text-sm">
            <div>
              <div className="font-extrabold text-lg tracking-tight">
                GREGREY<span className="text-burgundy">™</span>
              </div>
              <p className="text-muted mt-2 leading-relaxed">
                Connecting spaces. Creating possibilities.
                <br />
                Furniture Discovery &amp; Connection Platform.
              </p>
            </div>
            <div>
              <p className="font-bold mb-3">Discover</p>
              <ul className="space-y-2 text-ink-soft">
                <li>Text search</li>
                <li>Image search</li>
                <li>Request custom</li>
                <li>Businesses</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-3">Business</p>
              <ul className="space-y-2 text-ink-soft">
                <li>Join as business</li>
                <li>Verification</li>
                <li>Catalogue</li>
                <li>Lagos pilot</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-3">Trust</p>
              <ul className="space-y-2 text-ink-soft">
                <li>AI-detected vs Verified</li>
                <li>DISCOVER → MATCH → CONNECT</li>
                <li>Find it. Match with the right business. Get it.</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border py-4 text-center text-xs text-muted">
            © 2026 GREGREY — Lagos, Nigeria. MVP UI/UX v0.1
          </div>
        </footer>
      </body>
    </html>
  );
}
