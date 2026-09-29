// Çerez onayı: tarayıcıda localStorage'da tutulur. Sunucu tarafında karar yoktur.

export type Onay = "kabul" | "red";

const ANAHTAR = "ucel23-cerez-onayi";
const OLAY = "ucel23-cerez-degisti";

export function onayOku(): Onay | null {
  try {
    const d = window.localStorage.getItem(ANAHTAR);
    return d === "kabul" || d === "red" ? d : null;
  } catch {
    return null;
  }
}

export function onayYaz(deger: Onay | null) {
  try {
    if (deger) window.localStorage.setItem(ANAHTAR, deger);
    else window.localStorage.removeItem(ANAHTAR);
  } catch {
    // Gizli sekme vb.: onay sadece bu sayfa görüntülemesi için geçerli olur
  }
  window.dispatchEvent(new Event(OLAY));
}

/** useSyncExternalStore aboneliği: başka sekmede veya "tercihleri değiştir" ile değişince haber verir. */
export function onayaAbone(bildir: () => void) {
  window.addEventListener(OLAY, bildir);
  window.addEventListener("storage", bildir);
  return () => {
    window.removeEventListener(OLAY, bildir);
    window.removeEventListener("storage", bildir);
  };
}

/** "Çerez tercihleri" linki: kararı sıfırlayıp bandı yeniden gösterir. */
export function tercihleriAc() {
  onayYaz(null);
}

/** Red: GA'yı bu oturumda durdur ve _ga çerezlerini sil. */
export function analitigiKapat(gaId: string) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = true;
  const alanlar = [location.hostname, `.${location.hostname.replace(/^www\./, "")}`];
  for (const c of document.cookie.split(";")) {
    const ad = c.split("=")[0].trim();
    if (!ad.startsWith("_ga")) continue;
    for (const alan of alanlar) document.cookie = `${ad}=; Max-Age=0; path=/; domain=${alan}`;
    document.cookie = `${ad}=; Max-Age=0; path=/`;
  }
}
