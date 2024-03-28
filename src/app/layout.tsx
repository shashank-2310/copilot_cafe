import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: "Copilot Cafe",
  description: "A pair programming platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <Providers>
          <NextTopLoader crawlSpeed={100} />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
