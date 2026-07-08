import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { CustomCursor } from "@/components/interactive/custom-cursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanika Gaikwad — Interactive Developer Portfolio",
  description: "A premium digital experience and portfolio showcasing product thinking, UI/UX engineering, and creative frontend development.",
  metadataBase: new URL("https://sanikagaikwad.dev"),
  openGraph: {
    title: "Sanika Gaikwad — Interactive Developer Portfolio",
    description: "Crafting interfaces that bridge technology and human expression.",
    url: "/",
    siteName: "Sanika Gaikwad Portfolio",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sanika Gaikwad Portfolio Social Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanika Gaikwad — Interactive Developer Portfolio",
    description: "Crafting interfaces that bridge technology and human expression.",
    images: ["/assets/og-image.png"],
    creator: "@sanikagaikwad",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/apple-touch-icon.png",
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
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative">
        {/* Custom cursor overlay (hidden on mobile, animated on desktop) */}
        <CustomCursor />
        
        {/* Navigation Shell */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow w-full relative">
          {children}
        </main>
        
        {/* Footer Shell */}
        <Footer />
      </body>
    </html>
  );
}
