import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Copilot Cafe",
  description: "A pair programming finder platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
        </Providers>
      </body>
    </html>
  );
}
