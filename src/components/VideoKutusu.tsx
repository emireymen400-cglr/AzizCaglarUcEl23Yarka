import { JsonLd } from "@/components/JsonLd";
import { VideoOynatici } from "@/components/VideoOynatici";
import type { GaleriVideosu } from "@/content/galeri";
import { videoSchema } from "@/lib/schema";

/** Tıklayınca oynayan video + VideoObject JSON-LD (sunucuda). */
export function VideoKutusu({ video, className, schema = true }: { video: GaleriVideosu; className?: string; schema?: boolean }) {
  return (
    <>
      <VideoOynatici src={video.src} poster={video.poster} baslik={video.baslik} w={video.w} h={video.h} className={className} />
      {schema ? <JsonLd veri={videoSchema(video)} /> : null}
    </>
  );
}
