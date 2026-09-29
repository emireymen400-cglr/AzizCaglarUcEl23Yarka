import localFont from "next/font/local";

// Fontlar Latin + Türkçe karakterlere kırpılmış yerel dosyalardır (scripts/fontlari-hazirla.ts).
// Google'ın latin-ext alt kümesiyle sayfa başına ~230 KB font iniyordu; şimdi ~112 KB, önceden yüklenen Bebas + Inter ~54 KB.
// Türkçe karakterler (ĞÜŞİÖÇ ğüşıöç İ ı) her fontta var (CLAUDE.md §2, DESIGN.md §2).

export const bebas = localFont({
  src: "../fonts/bebas-neue-400.woff2",
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
  fallback: ["Oswald", "Arial Narrow", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const inter = localFont({
  src: "../fonts/inter-400-600.woff2",
  weight: "400 600",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

// Etiket ve el yazısı: ilk ekranda şart değil, önceden yüklenmez
export const jost = localFont({
  src: "../fonts/jost-500.woff2",
  weight: "500",
  variable: "--font-jost",
  display: "swap",
  preload: false,
  fallback: ["Futura", "Century Gothic", "sans-serif"],
});

export const caveat = localFont({
  src: "../fonts/caveat-500.woff2",
  weight: "500",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
  fallback: ["cursive"],
});

export const fontDegiskenleri = [bebas.variable, jost.variable, inter.variable, caveat.variable].join(" ");
