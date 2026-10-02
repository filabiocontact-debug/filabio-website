import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Check, Truck } from "lucide-react";
import { z } from "zod";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLang } from "@/lib/lang";

const search = z.object({
  name: z.string().optional().catch(undefined),
  total: z.coerce.number().optional().catch(undefined),
});

export const Route = createFileRoute("/thank-you")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Merci pour votre commande — FilaBio" },
      { name: "description", content: "Votre commande FilaBio est confirmée. Paiement à la livraison, livraison gratuite au Maroc." },
      { property: "og:title", content: "Merci pour votre commande — FilaBio" },
      { property: "og:description", content: "Commande confirmée. Nous vous appelons très vite." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

const T = {
  fr: {
    title: (n?: string) => `Merci${n ? ` ${n}` : ""} !`,
    sub: "Votre commande est bien enregistrée. Notre équipe vous appelle très vite pour confirmer la livraison.",
    total: "Total à payer à la livraison",
    free: "Livraison gratuite partout au Maroc",
    cod: "Paiement à la livraison",
    back: "Retour à l'accueil",
  },
  ar: {
    title: (n?: string) => `شكراً${n ? ` ${n}` : ""}!`,
    sub: "تم تسجيل طلبك بنجاح. فريقنا غادي يتصل بك قريباً لتأكيد التوصيل.",
    total: "المبلغ عند الاستلام",
    free: "توصيل مجاني لجميع مدن المغرب",
    cod: "الدفع عند الاستلام",
    back: "العودة للرئيسية",
  },
};

function ThankYou() {
  const { name, total } = Route.useSearch();
  const { lang, dir } = useLang();
  const t = T[lang];
  return (
    <div dir={dir} className="min-h-screen bg-background pt-28 font-[Jost] text-foreground md:pt-32">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 font-[Playfair_Display] text-4xl font-bold">{t.title(name)}</h1>
        <p className="mt-4 text-muted-foreground">{t.sub}</p>
        {total ? (
          <p className="mt-6 rounded-2xl border border-primary/40 bg-primary/10 px-6 py-4 text-lg">
            {t.total} : <strong className="text-primary">{total} DH</strong>
          </p>
        ) : null}
        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> {t.free}</span>
          <span className="flex items-center gap-2"><Banknote className="h-4 w-4 text-primary" /> {t.cod}</span>
        </div>
        <Link to="/" className="mt-10 inline-block rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
          {t.back}
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
