import { altLinks, localeMeta } from "@/lib/seo";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLang, type Lang } from "@/lib/lang";

export type LegalSection = { h: string; p: string[] };
export type LegalCopy = Record<Lang, { title: string; intro: string; updated: string; sections: LegalSection[] }>;

export function LegalPage({ copy, children }: { copy: LegalCopy; children?: ReactNode }) {
  const { lang } = useLang();
  const c = copy[lang];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="font-[Playfair_Display] text-4xl font-bold text-primary">{c.title}</h1>
        <p className="mt-3 text-muted-foreground">{c.intro}</p>
        <p className="mt-1 text-xs text-muted-foreground">{c.updated}</p>
        {children}
        <div className="mt-10 space-y-8">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-[Playfair_Display] text-xl font-semibold">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-2 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function legalHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      ...localeMeta(path),
    ],
    links: altLinks(path),
  };
}
