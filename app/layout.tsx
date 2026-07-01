import type { Metadata, Viewport } from "next";
import { Spectral, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import { ENV, PREVIEW_MODE } from "@/lib/env";

const spectral = Spectral({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-spectral", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jbm = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbm", display: "swap" });

export const metadata: Metadata = {
  title: "Evidence Loom - claims woven to their sources, assessed by consensus",
  description: "A woven evidence system on GenLayer. Weave a claim to a source; a validator set reads it and upholds or frays the thread.",
};
export const viewport: Viewport = { themeColor: "#F2EDE1", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${inter.variable} ${jbm.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Providers>
          <header className="border-b border-ink/15 bg-linen/90 sticky top-0 z-40" style={{ paddingTop: "env(safe-area-inset-top)" }}>
            <div className="mx-auto flex max-w-wide items-center gap-4 px-4 py-3 sm:px-5 md:px-8">
              <Link href="/" className="font-head text-lg font-bold">Evidence Loom</Link>
              <nav className="ml-auto flex items-center gap-4 text-sm" aria-label="Primary">
                <Link href="/" className="hover:text-indigo">Weave</Link><Link href="/method" className="hover:text-indigo">Method</Link>
              </nav>
            </div>
          </header>
          <main id="main">{children}</main>
          <footer className="mx-auto max-w-wide px-4 py-8 sm:px-5 md:px-8">
            <div className="border-t border-ink/15 flex flex-col gap-1 pt-5 text-sm text-slate md:flex-row md:justify-between">
              <span className="font-head font-bold text-ink">Evidence Loom <span className="label ml-1">GL-008</span></span>
              <span className="mono flex flex-wrap gap-x-4">{ENV.network} · {PREVIEW_MODE ? "no contract" : ENV.contractAddress} · <a href="https://docs.genlayer.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo">Built on GenLayer</a></span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
