import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || "https://securitytools.utilix.site"),
  title: "SecurityTools — Free Client-Side Cybersecurity Utilities",
  description:
    "Free, 100% client-side cybersecurity utilities: Password Strength Checker with real-world crack-time analysis, Random Password Generator, and Diceware Passphrase Generator. We never store or log passwords.",
  keywords: [
    "password strength checker",
    "password generator",
    "passphrase generator",
    "diceware",
    "cybersecurity tools",
    "entropy calculator",
    "brute force crack time"
  ],
  authors: [{ name: "SecurityTools Research Team" }],
  openGraph: {
    title: "SecurityTools — Zero-Knowledge Cybersecurity Utilities",
    description:
      "Free, 100% client-side cybersecurity utilities: Password Strength Checker with crack-time analysis, Random Password Generator, and Passphrase Generator.",
    type: "website",
    locale: "en_US",
    url: "https://securitytools.utilix.site",
    siteName: "SecurityTools",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SecurityTools — Zero-Knowledge Cybersecurity Utilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SecurityTools — Zero-Knowledge Cybersecurity Utilities",
    description:
      "Evaluate password entropy, crack times, and generate cryptographically secure passwords locally in your browser.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "I_SaNu0LrbiQSkKmCb7bm8LRBISuViD4KTJh0FHRo2s"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        suppressHydrationWarning
        className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-300 font-sans"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* <!-- CHATBOT_SCRIPT_START --> */}
        {/* <!-- Paste client's chatbot <script> embed code here --> */}
        {/* <!-- CHATBOT_SCRIPT_END --> */}
      </body>
    </html>
  );
}
