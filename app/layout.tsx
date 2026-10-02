import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DossierAI — Your CV. Your Story. A Global Portfolio.",
    template: "%s | DossierAI",
  },
  description:
    "Upload your professional material and let DossierAI transform it into a polished, responsive portfolio website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7FAFC] text-[#0F172A] antialiased">
        {children}
      </body>
    </html>
  );
}
