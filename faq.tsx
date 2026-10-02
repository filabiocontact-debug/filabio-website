import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { legalHead, LegalPage, type LegalCopy } from "@/components/legal-page";
import { FAQ_ITEMS } from "@/lib/faq";
import { useLang } from "@/lib/lang";

export const Route = createFileRoute("/faq")({
  head: () =>
    legalHead(
      "FAQ — FilaBio | Questions fréquentes",
      "Utilisation, livraison en 24 à 48h partout au Maroc, paiement à la livraison et conformité ONSSA : toutes les réponses sur FilaBio.",
      "/faq",
    ),
  component: FaqPage,
});

const COPY: LegalCopy = {
  fr: { title: "Questions fréquentes", intro: "Toutes les réponses sur FilaBio, la livraison et le paiement.", updated: "", sections: [] },
  ar: { title: "أسئلة متكررة", intro: "جميع الأجوبة حول FilaBio، التوصيل والدفع.", updated: "", sections: [] },
};

function FaqPage() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <LegalPage copy={COPY}>
      <div className="mt-8 space-y-3">
        {FAQ_ITEMS[lang].map((item, i) => (
          <div key={item.q} className="overflow-hidden rounded-xl border border-border bg-card">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-medium transition-colors hover:text-primary"
            >
              {item.q}
              <ChevronDown className={`h-4 w-4 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">{item.a}</p>}
          </div>
        ))}
      </div>
    </LegalPage>
  );
}
