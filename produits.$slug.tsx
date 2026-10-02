import { altLinks, localeMeta } from "@/lib/seo";
import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Banknote, Check, Leaf, Truck, Zap } from "lucide-react";

import productBack from "@/assets/product-back.png";
import productFront from "@/assets/product-front.png";
import productHand from "@/assets/v2-hand.jpg";
import productLid from "@/assets/product-lid.png";
import productOpen from "@/assets/v2-flatlay.jpg";
import { ProductOrderForm } from "@/components/product-order-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PRICE, UI } from "@/lib/i18n";
import { useLang, type Lang } from "@/lib/lang";

const GALLERY = [
  { src: productFront, alt: "FilaBio — face avant de la boîte" },
  { src: productBack, alt: "FilaBio — étiquette arrière avec la composition" },
  { src: productLid, alt: "FilaBio — vue de dessus du couvercle" },
  { src: productOpen, alt: "FilaBio — boîte ouverte avec ses gélules" },
  { src: productHand, alt: "FilaBio — boîte en main" },
];

const COPY: Record<
  Lang,
  {
    back: string;
    subtitle: string;
    gallery: string;
    composition: string;
    ingredients: string[];
    usageTitle: string;
    usage: string;
    qualityTitle: string;
    quality: string[];
    orderTitle: string;
    orderSub: string;
  }
> = {
  fr: {
    back: "Retour aux produits",
    subtitle: "Complément alimentaire à base de plantes naturelles — 20 gélules.",
    gallery: "Photos du produit",
    composition: "Composition",
    ingredients: [
      "Extrait de Maca",
      "Gelée Royale",
      "Extrait de Ginseng",
      "Herbes Naturelles",
    ],
    usageTitle: "Conseils d'utilisation",
    usage: "2 gélules par jour avec un grand verre d'eau.",
    qualityTitle: "Fabrication & contrôles",
    quality: [
      "Fabriqué par INDOKA — ZI SSMK, Meknès, Maroc",
      "Déclaration ONSSA — complément alimentaire",
      "Boîte de 12 g — 20 gélules",
    ],
    orderTitle: "Commande express",
    orderSub: "Nom, téléphone et adresse. Vous payez à la réception.",
  },
  ar: {
    back: "العودة إلى المنتجات",
    subtitle: "مكمل غذائي بمكونات نباتية طبيعية — 20 كبسولة.",
    gallery: "صور المنتج",
    composition: "التركيبة",
    ingredients: ["مستخلص الماكا", "غذاء الملكات", "مستخلص الجينسنغ", "أعشاب طبيعية"],
    usageTitle: "طريقة الاستعمال",
    usage: "كبسولتان يومياً مع كوب كبير من الماء.",
    qualityTitle: "التصنيع والمراقبة",
    quality: [
      "من تصنيع INDOKA — المنطقة الصناعية SSMK، مكناس، المغرب",
      "تصريح ONSSA — مكمل غذائي",
      "علبة 12 غ — 20 كبسولة",
    ],
    orderTitle: "استمارة الطلب السريع",
    orderSub: "الاسم والهاتف والعنوان. تدفع عند الاستلام.",
  },
};

export const Route = createFileRoute("/produits/$slug")({
  head: () => ({
    meta: [
      { title: "FilaBio Capsules — 20 gélules | 199 DH" },
      {
        name: "description",
        content:
          "FilaBio Capsules : complément alimentaire à base de Maca, Gelée Royale, Ginseng et herbes naturelles. 20 gélules à 199 DH, livraison gratuite au Maroc, paiement à la livraison.",
      },
      { property: "og:title", content: "FilaBio Capsules — 20 gélules" },
      {
        property: "og:description",
        content: "199 DH, livraison gratuite partout au Maroc, paiement à la livraison.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      ...localeMeta("/produits/filabio"),
    ],
    links: altLinks("/produits/filabio"),
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { lang, dir } = useLang();
  const [active, setActive] = useState(0);

  if (slug !== "filabio") throw notFound();

  const t = UI[lang];
  const c = COPY[lang];

  return (
    <div
      id="top"
      dir={dir}
      className="min-h-screen bg-background pt-28 font-[Jost] text-foreground md:pt-32"
    >
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Link
          to="/produits"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {c.back}
        </Link>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
          {/* Left: product showcase */}
          <div>
            {/* Gallery */}
            <div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={GALLERY[active]!.src}
                alt={GALLERY[active]!.alt}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-4 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {c.gallery}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {GALLERY.map((g, i) => (
                <button
                  key={g.alt}
                  onClick={() => setActive(i)}
                  aria-label={g.alt}
                  className={`h-16 w-16 overflow-hidden rounded-lg border transition-colors ${
                    active === i ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={g.src} alt="" width={64} height={64} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <h1 className="font-[Playfair_Display] text-4xl font-bold md:text-5xl">
              FilaBio<span className="align-super text-lg">®</span>
            </h1>
            <p className="mt-2 text-muted-foreground">{c.subtitle}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
              {t.gelulesLabel}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-5">
              <span className="font-[Playfair_Display] text-4xl font-bold">{PRICE} DH</span>
              <span className="flex flex-col text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" /> {t.freeDelivery}
                </span>
                <span className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-primary" /> {t.cod}
                </span>
              </span>
            </div>

            <div className="mt-8">
              <h2 className="flex items-center gap-2 font-[Playfair_Display] text-xl font-semibold">
                <Leaf className="h-5 w-5 text-primary" /> {c.composition}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {c.ingredients.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" /> {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="flex items-center gap-2 font-[Playfair_Display] text-xl font-semibold">
                <Zap className="h-5 w-5 text-primary" /> {c.usageTitle}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.usage}</p>
            </div>

            <div className="mt-6">
              <h2 className="font-[Playfair_Display] text-xl font-semibold">{c.qualityTitle}</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {c.quality.map((q) => (
                  <li key={q} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" /> {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>

          {/* Right: sticky order section */}
          <section
            id="commander"
            aria-label={c.orderTitle}
            className="scroll-mt-32 self-start rounded-3xl bg-cream p-4 text-cream-foreground shadow-xl sm:p-6 lg:sticky lg:top-32"
          >
            <h2 className="text-center font-[Playfair_Display] text-2xl font-bold sm:text-3xl">{c.orderTitle}</h2>
            <p className="mt-1 text-center text-sm text-cream-muted">{c.orderSub}</p>
            <div className="mt-5">
              <ProductOrderForm price={PRICE} />
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
