declare module "subset-font" {
  type Eksen = number | { min: number; max: number; default?: number };
  export default function subsetFont(
    kaynak: Buffer,
    metin: string,
    secenekler?: { targetFormat?: "woff2" | "woff" | "truetype" | "sfnt"; variationAxes?: Record<string, Eksen> },
  ): Promise<Buffer>;
}
