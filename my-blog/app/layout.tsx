import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SessionProvider from "@/app/components/SessionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "My Dev Blog",
    template: "%s | My Dev Blog",
  },
  description: "A developer blog about AI, Next.js, and building things.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-neutral-950 text-neutral-200 font-sans antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}