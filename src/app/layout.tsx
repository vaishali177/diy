import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loom & Craft | Digital Pattern Dashboard",
  description: "A premium tactile editorial experience and pattern calculator designed for modern craft spaces.",
  verification: {
    google: "86Eup1Ha0_JepC2WsyN-OJ3YIcpnR4vm3T9cD6PkPeY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full flex flex-col md:flex-row overflow-hidden font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
