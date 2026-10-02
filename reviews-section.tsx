import { BadgeCheck, Star } from "lucide-react";

import { REVIEWS } from "@/lib/commerce";
import { useLang } from "@/lib/lang";

/** Verified customer reviews. Hidden until real reviews are added to REVIEWS. */
export function ReviewsSection() {
  const { lang } = useLang();
  const list = REVIEWS[lang];
  if (list.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center font-[Playfair_Display] text-3xl font-bold">
        {lang === "ar" ? "آراء زبنائنا" : "Avis de nos clients"}
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {list.map((r) => (
          <article key={r.name + r.text} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              {r.photo && <img src={r.photo} alt={r.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />}
              <div>
                <p className="flex items-center gap-1 font-semibold">
                  {r.name} <BadgeCheck className="h-4 w-4 text-primary" />
                </p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-0.5" aria-label={`${r.rating}/5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
