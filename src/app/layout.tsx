import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { fontDegiskenleri } from "@/lib/fonts";
import { isletmeSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Yumurtacı Yarka Satışı, Türkiye Geneli | Üçel 23 Yarka",
    template: "%s | Üçel 23 Yarka",
  },
  description: site.aciklama,
  applicationName: site.ad,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.ad,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#234386",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${fontDegiskenleri} antialiased`}>
      <body className="min-h-dvh">
        {children}
        <JsonLd veri={isletmeSchema()} />
      </body>
    </html>
  );
}
