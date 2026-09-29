"use client";

import { tercihleriAc } from "@/lib/cerez";

/** Footer'da: verilen onayı geri almak / değiştirmek için bandı yeniden açar. */
export function CerezTercihleriButonu({ className }: { className?: string }) {
  return (
    <button type="button" onClick={tercihleriAc} className={className}>
      Çerez tercihleri
    </button>
  );
}
