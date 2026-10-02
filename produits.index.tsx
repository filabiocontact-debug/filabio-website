import { altLinks, localeMeta } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Banknote, Truck } from "lucide-react";

import productFront from "@/assets/product-front.png";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PRICE, UI } from "@/lib/i18n";
import { useLang, type Lang } from "@/lib/lang";

const COPY: Record<Lang, { title: string; sub: string; view: string; details: string; coming: string }> = {
  fr: {
    title: "Nos Produits",
    sub: "Des compléments alimentaires à base de plantes naturelles, pensés pour accompagner votre vitalité au quotidien.",
    view: "Voir le produit",
    details: "20 gélules — 10 jours de programme",
    coming: "D'autres références FilaBio seront ajoutées ici.",
  },
  ar: {
    title: "جميع المنتجات",
    sub: "مكملات غذائية بمكونات نباتية طبيعية، مصممة لمرافقة حيوتك يوميا.",
    view: "عرض المنتج",
    details: "20 كبسولة — برنامج 10 أيام",
    coming: "ستُضاف مراجع أخرى من فيلابيو هنا.",
  },
};

export const Route = createFileRoute("/produits/")({
  head: () => ({
    meta: [
      { title: "Nos Produits — FilaBio | 199 DH" },
      {
        name: "description",
        content:
          "Découvrez FilaBio, complément alimentaire à base de plantes naturelles (Maca, Gelée Royale, Ginseng). 199 DH, livraison gratuite au Maroc, paiement à la livraison.",
      },
      { property: "og:title", content: "Nos Produits — FilaBio" },
      {
        property: "og:description",
        content: "FilaBio Capsules : 20 gélules, 199 DH, livraison gratuite au Maroc, paiement à la livraison.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...localeMeta("/produits"),
    ],
    links: altLinks("/produits"),
  }),
  component: ProduitsPage,
});

function ProduitsPage() {
  const { lang, dir } = useLang();
  const t = UI[lang];
  const c = COPY[lang];

  return (
    <div id="top" dir={dir} className="min-h-screen bg-background pt-28 font-[Jost] text-foreground md:pt-32">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-[Playfair_Display] text-4xl font-bold md:text-5xl">{c.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{c.sub}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50">
            <img
              src={productFront}
              alt="FilaBio — boîte de 20 gélules"
              width={465}
              height={500}
              className="aspect-square w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-[Playfair_Display] text-2xl font-semibold text-primary">FilaBio</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.details}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" /> {t.freeDelivery}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Banknote className="h-4 w-4 text-primary" /> {t.cod}
              </p>
              <div className="mt-5 flex items-center justify-between gap-3 pt-4">
                <span className="font-[Playfair_Display] text-3xl font-bold">{PRICE} DH</span>
                <Link
                  to="/produits/$slug"
                  params={{ slug: "filabio" }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  {c.view}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground/70">{c.coming}</p>
      </main>

      <SiteFooter />
    </div>
  );
}
