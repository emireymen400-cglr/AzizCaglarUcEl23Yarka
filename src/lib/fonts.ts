import { Bebas_Neue, Caveat, Inter, Jost } from "next/font/google";

// Türkçe karakterler için latin-ext ŞART (CLAUDE.md §2).

export const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-bebas",
  display: "swap",
});

export const jost = Jost({
  weight: ["500"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const caveat = Caveat({
  weight: ["500"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  display: "swap",
});

export const fontDegiskenleri = [bebas.variable, jost.variable, inter.variable, caveat.variable].join(" ");
