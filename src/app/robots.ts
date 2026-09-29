import type { MetadataRoute } from "next";
import { tamUrl } from "@/lib/schema";

/** Preview ortamlarında (VERCEL_ENV !== "production") hiçbir şey indekslenmez (CLAUDE.md §5). */
export default function robots(): MetadataRoute.Robots {
  const uretim = process.env.VERCEL_ENV === "production";
  if (!uretim) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: tamUrl("/sitemap.xml"),
  };
}
