import { jsonLdMetni } from "@/lib/schema";

type Props = { veri: Record<string, unknown> | Record<string, unknown>[] };

export function JsonLd({ veri }: Props) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdMetni(veri) }} />;
}
