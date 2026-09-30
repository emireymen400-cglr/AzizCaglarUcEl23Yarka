import type { Metadata, Viewport } from "next";
import { CerezOnayi } from "@/components/CerezOnayi";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import { fontDegiskenleri } from "@/lib/fonts";
import { tamBaslik } from "@/lib/metadata";
import { isletmeSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: tamBaslik("Yumurtacı Yarka Satışı, Türkiye Geneli"),
    template: tamBaslik("%s"),
  },
  description: site.aciklama,
  applicationName: site.ad,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.ad,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // Preview/yerel ortamlar indekslenmesin (CLAUDE.md §5)
  ...(process.env.VERCEL_ENV === "production" ? {} : { robots: { index: false, follow: false } }),
};

// GA ölçüm kimliği yalnızca beklenen biçimdeyse kullanılır (satır içi script'e girdiği için)
const gaId = site.gaId && /^G-[A-Z0-9]+$/.test(site.gaId) ? site.gaId : undefined;

export const viewport: Viewport = {
  themeColor: "#234386",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${fontDegiskenleri} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main id="icerik" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <Footer />
        <CerezOnayi gaId={gaId} />
        <JsonLd veri={isletmeSchema()} />
      </body>
    </html>
  );
}
