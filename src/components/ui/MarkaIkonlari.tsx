import type { SosyalHesap } from "@/content/site";
import { cn } from "@/lib/cn";

type P = { className?: string };

/** WhatsApp logosu (dolu). Kaynak: Simple Icons (CC0). */
export function WhatsAppIkon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={cn("fill-current", className)}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/** Instagram — sadece kontur, çizim diliyle uyumlu. */
export function InstagramIkon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIkon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <path d="M15 3.5h-2.4A3.6 3.6 0 0 0 9 7.1V10H6.5v3.4H9V21h3.5v-7.6h2.6l.5-3.4h-3.1V7.6a1 1 0 0 1 1-1H15z" />
    </svg>
  );
}

export function YouTubeIkon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
    </svg>
  );
}

/** TikTok notası — kontur. */
export function TikTokIkon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13.5 3v11.8a3.3 3.3 0 1 1-3.3-3.3" />
      <path d="M13.5 3c.4 2.6 2.2 4.4 5 4.6" />
    </svg>
  );
}

export function SosyalIkon({ ad, className }: { ad: SosyalHesap["ad"]; className?: string }) {
  if (ad === "Instagram") return <InstagramIkon className={className} />;
  if (ad === "Facebook") return <FacebookIkon className={className} />;
  if (ad === "YouTube") return <YouTubeIkon className={className} />;
  if (ad === "TikTok") return <TikTokIkon className={className} />;
  // Kullanıcının verdiği Sahibinden logosu (sarı kare, siyah S)
  // eslint-disable-next-line @next/next/no-img-element -- 1,4 KB hazır ikon
  return <img src="/images/sosyal/sahibinden.webp" alt="" width={96} height={96} className={cn("rounded-[4px]", className)} />;
}
