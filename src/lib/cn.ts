/** Koşullu sınıf birleştirici */
export function cn(...siniflar: (string | false | null | undefined)[]): string {
  return siniflar.filter(Boolean).join(" ");
}
