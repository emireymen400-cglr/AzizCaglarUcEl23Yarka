import { JsonLd } from "@/components/JsonLd";
import type { GaleriVideosu } from "@/content/galeri";
import { cn } from "@/lib/cn";
import { videoSchema } from "@/lib/schema";

/**
 * Kullanıcı başlatınca oynayan video. preload="none" + poster: kullanıcı oynatmadan
 * video indirilmez (Vercel bant genişliği).
 */
export function VideoKutusu({ video, className, schema = true }: { video: GaleriVideosu; className?: string; schema?: boolean }) {
  return (
    <>
      <video
        className={cn("w-full rounded-card bg-ink/5", className)}
        poster={video.poster}
        controls
        preload="none"
        playsInline
        width={video.w}
        height={video.h}
        aria-label={video.baslik}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      {schema ? <JsonLd veri={videoSchema(video)} /> : null}
    </>
  );
}
