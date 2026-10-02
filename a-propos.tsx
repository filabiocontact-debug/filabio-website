import { altLinks, localeMeta } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import ingGelee from "@/assets/ing-gelee.jpg";
import ingGinseng from "@/assets/ing-ginseng.jpg";
import ingMaca from "@/assets/ing-maca.jpg";
import ingPlantes from "@/assets/ing-plantes.jpg";
import productFront from "@/assets/product-front.png";
import saharaHorse from "@/assets/sahara-horse.jpg";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UI } from "@/lib/i18n";
import { useLang, type Lang } from "@/lib/lang";

const INGREDIENT_IMAGES = [ingMaca, ingGelee, ingGinseng, ingPlantes];

const COPY: Record<
  Lang,
  {
    title: string;
    intro: string;
    storyTitle: string;
    story: string[];
    ingredientsTitle: string;
    ingredients: { name: string; desc: string }[];
    qualityTitle: string;
    quality: string[];
    contactCta: string;
    productCta: string;
  }
> = {
  fr: {
    title: "À propos de FilaBio",
    intro: "Une marque marocaine de compléments alimentaires naturels, née à Meknès.",
    storyTitle: "Notre histoire",
    story: [
      "FilaBio est exploité par Indoka SARL, une entreprise basée à Meknès, au Maroc. La marque est née d'une idée simple : proposer un complément alimentaire à base de plantes naturelles, avec une identité soignée et un prix accessible.",
      "Chaque boîte est fabriquée dans les laboratoires INDOKA, en Zone Industriale SSMK à Meknès. Le produit est déclaré auprès de l'ONSSA, l'autorité nationale en charge de la sécurité sanitaire des produits alimentaires.",
      "Notre approche reste volontairement simple : une seule formule, une composition courte et lisible, et une relation directe avec nos clients, sans intermédiaires.",
    ],
    ingredientsTitle: "Des ingrédients d'origine naturelle",
    ingredients: [
      { name: "Maca", desc: "Plante andine traditionnellement reconnue pour ses nutriments." },
      { name: "Gelée royale", desc: "Substance riche en nutriments, produite par les abeilles." },
      { name: "Ginseng", desc: "Plante traditionnellement utilisée pour son profil nutritionnel." },
      { name: "Herbes naturelles", desc: "Une sélection de plantes pour une formule équilibrée." },
    ],
    qualityTitle: "Qualité et contrôles",
    quality: [
      "Fabrication à Meknès, dans les laboratoires INDOKA",
      "Déclaration auprès de l'ONSSA",
      "Composition affichée sur l'emballage",
      "N° de lot et date de durabilité minimale imprimés sur la boîte",
    ],
    contactCta: "Nous contacter",
    productCta: "Voir FilaBio Capsules",
  },
  ar: {
    title: "من نحن — فيلابيو",
    intro: "علامة مغربية للمكملات الغذائية الطبيعية، وُلدت في مكناس.",
    storyTitle: "قصتنا",
    story: [
      "فيلابيو علامة تسيّرها شركة Indoka SARL، وهي مقاولة موجودة في مكناس بالمغرب. الفكرة بسيطة: تقديم مكمل غذائي بمكونات نباتية طبيعية، بهوية متقنة وثمن في المتناول.",
      "كل علبة تُصنَّع في مختبرات INDOKA بالمنطقة الصناعية SSMK بمكناس، والمنتج مصرَّح به لدى المكتب الوطني للسلامة الصحية للمنتجات الغذائية (ONSSA).",
      "مقاربتنا تبقى بسيطة: تركيبة واحدة، لائحة مكونات قصيرة وواضحة، وعلاقة مباشرة مع زبنائنا دون وسطاء.",
    ],
    ingredientsTitle: "مكونات ذات أصل طبيعي",
    ingredients: [
      { name: "الماكا", desc: "نبتة أندينية معروفة تقليدياً بمغذياتها." },
      { name: "غذاء الملكات", desc: "مادة غنية بالمغذيات تنتجها النحلة." },
      { name: "الجينسنغ", desc: "نبتة تُستعمل تقليدياً لملفها الغذائي." },
      { name: "أعشاب طبيعية", desc: "مجموعة من النباتات لتركيبة متوازنة." },
    ],
    qualityTitle: "الجودة والمراقبة",
    quality: [
      "التصنيع في مكناس بمختبرات INDOKA",
      "تصريح لدى المكتب الوطني للسلامة الصحية (ONSSA)",
      "التركيبة مكتوبة على العبوة",
      "رقم الدفعة وتاريخ انتهاء الصلاحية مطبوعان على العلبة",
    ],
    contactCta: "اتصلوا بنا",
    productCta: "اكتشفوا كبسولات فيلابيو",
  },
};

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — FilaBio | Indoka SARL, Meknès" },
      {
        name: "description",
        content:
          "FilaBio est une marque marocaine de compléments alimentaires naturels exploitée par Indoka SARL à Meknès : ingrédients d'origine naturelle, fabrication locale et déclaration ONSSA.",
      },
      { property: "og:title", content: "À propos — FilaBio" },
      {
        property: "og:description",
        content: "Une marque marocaine de compléments alimentaires naturels, née à Meknès.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...localeMeta("/a-propos"),
    ],
    links: altLinks("/a-propos"),
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang, dir } = useLang();
  const t = UI[lang];
  const c = COPY[lang];

  return (
    <div
      id="top"
      dir={dir}
      className="min-h-screen bg-background pt-28 font-[Jost] text-foreground md:pt-32"
    >
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <img
            src={saharaHorse}
            alt="Coucher de soleil au Sahara — l'univers FilaBio"
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-20">
            <h1 className="max-w-3xl font-[Playfair_Display] text-4xl font-bold md:text-5xl">
              {c.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-foreground/85">{c.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                {c.contactCta}
              </Link>
              <Link
                to="/produits/$slug"
                params={{ slug: "filabio" }}
                className="rounded-full border border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {c.productCta}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="flex items-center gap-2 font-[Playfair_Display] text-3xl font-bold">
            <Sparkles className="h-6 w-6 text-primary" /> {c.storyTitle}
          </h2>
          <div className="mt-6 grid gap-10 md:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4 text-muted-foreground">
              {c.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <img
              src={productFront}
              alt="FilaBio — boîte de 20 gélules"
              width={465}
              height={500}
              className="w-full max-w-xs justify-self-center rounded-2xl border border-border"
            />
          </div>
        </section>

        <section className="border-y border-border bg-card py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-[Playfair_Display] text-3xl font-bold">{c.ingredientsTitle}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.ingredients.map((ing, i) => (
                <div key={ing.name} className="overflow-hidden rounded-2xl border border-border">
                  <img
                    src={INGREDIENT_IMAGES[i]!}
                    alt={ing.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-[Playfair_Display] text-xl font-semibold text-primary">
                      {ing.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{ing.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="flex items-center gap-2 font-[Playfair_Display] text-3xl font-bold">
            <ShieldCheck className="h-6 w-6 text-primary" /> {c.qualityTitle}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {c.quality.map((q) => (
              <li
                key={q}
                className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4 text-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {q}
              </li>
            ))}
          </ul>
          <p className="mt-8 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Indoka SARL — ZI SSMK, Meknès, Maroc · {t.cod}
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
