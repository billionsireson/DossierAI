import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DossierAI — Your CV. Your Story. A Global Portfolio.",
    template: "%s | DossierAI",
  },
  description:
    "Upload your professional material and let DossierAI transform it into a polished, responsive portfolio website.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "DossierAI", statusBarStyle: "black-translucent" },
  icons: {
    icon: "/icon.png",
    apple: "/icons/icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#180F6E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-[#F7FAFC] text-[#0F172A] antialiased ${jakarta.className}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#07142F] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
