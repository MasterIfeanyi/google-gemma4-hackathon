import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "StoryMind",
  description: "Stories & Summaries, powered by AI",
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
