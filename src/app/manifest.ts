import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.ad,
    short_name: "Üçel 23",
    description: site.aciklama,
    start_url: "/",
    display: "browser",
    background_color: "#fbf9f6",
    theme_color: "#234386",
    lang: "tr",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
