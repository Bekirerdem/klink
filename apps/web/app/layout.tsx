import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klink — Türk F&B'nin yeni POS'u",
  description:
    "Cüzdansız QR ödeme, on-chain bahşiş ve sadakat NFT'si. Monad üzerinde komisyonsuz, anlık settle.",
  applicationName: "Klink",
  authors: [{ name: "Bekir Erdem" }],
  keywords: [
    "Klink",
    "Monad",
    "F&B",
    "bahşiş",
    "sadakat",
    "stablecoin ödeme",
    "Türkiye",
    "Web3 POS",
  ],
  openGraph: {
    title: "Klink — Türk F&B'nin yeni POS'u",
    description:
      "Cüzdansız QR ödeme, on-chain bahşiş ve sadakat NFT'si. Monad üzerinde komisyonsuz.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klink",
    description: "Türk F&B'nin Web3 POS'u. Komisyonsuz. Anlık. Adil.",
  },
};

export const viewport: Viewport = {
  themeColor: "#6e54ff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${robotoMono.variable}`}
    >
      <body className="bg-bg-base text-ink font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
