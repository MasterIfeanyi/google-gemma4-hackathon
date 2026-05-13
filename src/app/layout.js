import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


export const metadata = {
  title: "Buddy — Talk to anyone, powered by Gemma 4",
  description:
    "Have real conversations with the world's most iconic figures — leaders, legends, and visionaries — powered by Google's Gemma 4 AI model.",
  metadataBase: new URL("https://ifeanyi-buddy.netlify.app"), // ← replace with your real URL

  // Open Graph — controls how it looks on LinkedIn, WhatsApp, Facebook
  openGraph: {
    title: "Buddy — Talk to anyone, powered by Gemma 4",
    description:
      "Have real conversations with the world's most iconic figures — leaders, legends, and visionaries — powered by Google's Gemma 4 AI model.",
    url: "https://ifeanyi-buddy.netlify.app",
    siteName: "Buddy",
    images: [
      {
        url: "/cache.png", // ← create this file in your /public folder
        width: 1200,
        height: 630,
        alt: "Buddy — Talk to anyone",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter card — also used by LinkedIn sometimes
  twitter: {
    card: "summary_large_image",
    title: "Buddy — Talk to anyone, powered by Gemma 4",
    description:
      "Have real conversations with the world's most iconic figures — leaders, legends, and visionaries — powered by Google's Gemma 4 AI model.",
    images: ["/cache.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${nunito.className} antialiased h-full min-h-full flex flex-col`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div id="modal-root"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
