import { altLinks, localeMeta } from "@/lib/seo";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Check, ChevronDown, Leaf, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";

import { HeroCarousel } from "@/components/hero-carousel";
import ingGelee from "@/assets/ing-gelee.jpg";
import ingGinseng from "@/assets/ing-ginseng.jpg";
import ingMaca from "@/assets/ing-maca.jpg";
import ingPlantes from "@/assets/ing-plantes.jpg";
import orderBg from "@/assets/order-bg.jpg.asset.json";
import onssaLabel from "@/assets/filabio-onssa-v2.png.asset.json";
import productHand from "@/assets/v2-hand.jpg";
import productOpen from "@/assets/v2-flatlay.jpg";
import espritImage from "@/assets/esprit-filabio.jpg.asset.json";
import { ProductOrderForm } from "@/components/product-order-form";
import { SiteFooter } from "@/components/site-footer";
import { ReviewsSection } from "@/components/reviews-section";
import { FAQ_ITEMS } from "@/lib/faq";
import { SiteHeader } from "@/components/site-header";
import { PRICE, UI } from "@/lib/i18n";
import { useLang, type Lang } from "@/lib/lang";

const INGREDIENT_IMAGES = [ingMaca, ingGelee, ingGinseng, ingPlantes];
const BADGE_ICONS = [Leaf, Zap, ShieldCheck];
// Order must match COPY.qualityBadges: Halal, ISO 22000, Top Quality, SGS.
const QUALITY_BADGES = [
  { icon: Check, tone: "text-halal" },
  { icon: ShieldCheck, tone: "text-primary" },
  { icon: Star, tone: "text-primary" },
  { icon: BadgeCheck, tone: "text-primary" },
];

const COPY: Record<
  Lang,
  {
    hero: { title: string; sub: string; cta: string; price: string };
    badges: string[];
    ingredientsTitle: string;
    ingredients: { name: string; desc: string }[];
    capsuleTitle: string;
    capsuleSub: string;
    capsuleNote: string;
    usageTitle: string;
    usage: string[];
    usageNote: string;
    qualityTitle: string;
    qualitySub: string;
    qualityPoints: string[];
    qualityBadges: { name: string; desc: string }[];
    qualityLicense: string;
    qualityLicenseNote: string;
    espritTitle: string;
    espritSub: string;
    orderSub: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
  }
> = {
  fr: {
    hero: {
      title: "Vitalité naturelle au quotidien",
      sub: "Un complément alimentaire à base de plantes naturelles, conçu pour accompagner votre vitalité.",
      cta: "Commander maintenant",
      price: "199 DH",
    },
    badges: ["Ingrédients naturels", "Vitalité et énergie", "Qualité contrôlée"],
    ingredientsTitle: "Une synergie de plantes naturelles",
    ingredients: [
      { name: "Maca", desc: "Plante andine traditionnellement reconnue pour ses nutriments." },
      { name: "Gelée royale", desc: "Substance riche en nutriments, produite par les abeilles." },
      { name: "Ginseng", desc: "Plante traditionnellement utilisée pour son profil nutritionnel." },
      { name: "Herbes naturelles", desc: "Une sélection de plantes pour une formule équilibrée." },
    ],
    capsuleTitle: "Une formule pensée pour votre quotidien",
    capsuleSub: "20 gélules par boîte — 10 jours de programme.",
    capsuleNote: "Respecter les indications figurant sur l'emballage.",
    usageTitle: "Mode d'emploi",
    usage: ["Prendre 2 gélules par jour", "Avec un grand verre d'eau", "De préférence le matin"],
    usageNote:
      "Les compléments alimentaires ne se substituent pas à une alimentation variée et équilibrée et à un mode de vie sain.",
    qualityTitle: "Qualité et conformité ONSSA",
    qualitySub:
      "Chaque boîte FilaBio est fabriquée dans un atelier certifié et contrôlée avant expédition. Toutes les garanties sont imprimées directement sur l’emballage, en bas de l’étiquette.",
    qualityPoints: ["Sans OGM", "Sans conservateurs artificiels", "Qualité contrôlée"],
    qualityBadges: [
      { name: "Halal", desc: "Produit certifié halal" },
      { name: "ISO 22000", desc: "Certification sécurité des aliments" },
      { name: "Top Quality", desc: "Marque de qualité primée" },
      { name: "SGS", desc: "Contrôle qualité indépendant" },
    ],
    qualityLicense: "Agrément ONSSA : CAPV.13.90.19",
    qualityLicenseNote:
      "Agrément délivré par l’Office national de sécurité sanitaire des produits alimentaires.",
    espritTitle: "L'esprit FilaBio",
    espritSub: "Une énergie puisée dans les paysages du Sud.",
    orderSub: "Livraison gratuite partout au Maroc — paiement à la réception.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Quand puis-je espérer des résultats ?",
        a: "Les compléments alimentaires s'inscrivent dans la durée. Les sensations varient d'une personne à l'autre ; une utilisation régulière pendant plusieurs semaines est recommandée.",
      },
      {
        q: "Y a-t-il des contre-indications ?",
        a: "Déconseillé aux personnes de moins de 18 ans. Si vous êtes enceinte, allaitante ou sous traitement médical, demandez conseil à votre médecin ou à votre pharmacien.",
      },
      {
        q: "Comment dois-je conserver le produit ?",
        a: "Conservez la boîte dans un endroit sec, à l'abri de la chaleur et de la lumière directe, et hors de portée des jeunes enfants.",
      },
      {
        q: "Puis-je le prendre avec un traitement médical ?",
        a: "En cas de traitement en cours, rapprochez-vous de votre médecin ou de votre pharmacien avant toute supplémentation.",
      },
    ],
  },
  ar: {
    hero: {
      title: "استرجع طاقتك وحيويتك الطبيعية 100%",
      sub: "منتج طبيعي أصلي لتعزيز النشاط والقوة اليومية",
      cta: "اطلب الآن",
      price: "199 درهم",
    },
    badges: ["توصيل سريع وسريع جداً", "الدفع بعد المعاينة والاستلام", "منتج طبيعي وآمن 100%"],
    ingredientsTitle: "تآزر نباتات طبيعية",
    ingredients: [
      { name: "الماكا", desc: "نبتة أندينية معروفة تقليدياً بمغذياتها." },
      { name: "غذاء الملكات", desc: "مادة غنية بالمغذيات تنتجها النحلة." },
      { name: "الجينسنغ", desc: "نبتة تُستعمل تقليدياً لملفها الغذائي." },
      { name: "أعشاب طبيعية", desc: "مجموعة من النباتات لتركيبة متوازنة." },
    ],
    capsuleTitle: "تركيبة مصممة ليومك",
    capsuleSub: "20 كبسولة في العلبة — برنامج 10 أيام.",
    capsuleNote: "يُرجى احترام الإرشادات المذكورة على العبوة.",
    usageTitle: "طريقة الاستعمال",
    usage: ["كبسولتان يومياً", "مع كوب كبير من الماء", "يُفضل في الصباح"],
    usageNote:
      "المكملات الغذائية لا تغني عن نظام غذائي متوازن ونمط حياة صحي.",
    qualityTitle: "الجودة والترخيص ديال ONSSA",
    qualitySub:
      "كل علبة FilaBio كتصنع فمعمل معتمد وكتتراقب قبل ما تتبعت. الضمانات كاملين مطبوعين فوق العلبة، فتحت اللصيقة.",
    qualityPoints: ["بلا مواد معدلة وراثياً", "بلا مواد حافظة اصطناعية", "جودة مراقبة"],
    qualityBadges: [
      { name: "حلال", desc: "منتج حلال معتمد" },
      { name: "ISO 22000", desc: "شهادة سلامة الغذاء" },
      { name: "Top Quality", desc: "علامة الجودة بالنجوم" },
      { name: "SGS", desc: "شهادة مراقبة الجودة" },
    ],
    qualityLicense: "Agrément ONSSA : CAPV.13.90.19",
    qualityLicenseNote: "ترخيص من المكتب الوطني للسلامة الصحية للمنتجات الغذائية.",
    espritTitle: "روح فيلابيو",
    espritSub: "طاقة مستوحاة من مناظر الجنوب.",
    orderSub: "توصيل مجاني لجميع أنحاء المغرب — الدفع عند الاستلام.",
    faqTitle: "أسئلة متكررة",
    faq: [
      {
        q: "متى يمكنني ملاحظة النتيجة؟",
        a: "المكملات الغذائية تحتاج إلى الانتظام. تختلف الإحساسات من شخص لآخر، ويُستحسن الاستعمال بانتظام لعدة أسابيع.",
      },
      {
        q: "هل هناك موانع الاستعمال؟",
        a: "غير مُنصَح به لمن هم أقل من 18 سنة. إذا كنت حاملاً أو مرضعاً أو تتناول علاجاً، استشر طبيبك أو الصيدلي.",
      },
      {
        q: "كيف أحفظ المنتج؟",
        a: "يُحفظ في مكان جاف، بعيداً عن الحرارة والضوء المباشر، وبعيداً عن متناول الأطفال.",
      },
      {
        q: "هل يمكنني تناوله مع علاج طبي؟",
        a: "إذا كنت تتابع علاجاً، استشر طبيبك أو الصيدلي قبل تناول أي مكمل.",
      },
    ],
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FilaBio | 199 DH — Paiement à la livraison" },
      {
        name: "description",
        content:
          "FilaBio : complément alimentaire à base de Maca, Gelée Royale, Ginseng et herbes naturelles. 199 DH, livraison gratuite partout au Maroc, paiement à la livraison.",
      },
      { property: "og:title", content: "FilaBio | 199 DH — Paiement à la livraison" },
      {
        property: "og:description",
        content:
          "20 gélules à base de plantes naturelles. 199 DH, livraison gratuite au Maroc, paiement à la livraison.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...localeMeta("/"),
    ],
    links: altLinks("/"),
  }),
  component: HomePage,
});

function HomePage() {
  const { lang, dir } = useLang();
  const t = UI[lang];
  const c = COPY[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div id="top" dir={dir} className="min-h-screen bg-background font-[Jost] text-foreground">
      <SiteHeader />

      <main className="pt-28 md:pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <HeroCarousel />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-36">
            <div className={lang === "ar" ? "ms-auto max-w-xl" : "max-w-xl"}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                <Sparkles className="h-3.5 w-3.5" /> FilaBio
              </span>
              <h1 className="mt-5 font-[Playfair_Display] text-4xl font-bold leading-tight md:text-6xl">
                {c.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">{c.hero.sub}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#commander"
                  className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  {c.hero.cta}
                </a>
                <Link
                  to="/a-propos"
                  className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {t.seeMore}
                </Link>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xl font-bold text-primary">
                  {c.hero.price}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-sm">
            {c.badges.map((b, i) => {
              const Icon = BADGE_ICONS[i] ?? Leaf;
              return (
                <span key={b} className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" /> {b}
                </span>
              );
            })}
          </div>
        </section>

        {/* Ingredients */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-center font-[Playfair_Display] text-3xl font-bold md:text-4xl">
            {c.ingredientsTitle}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.ingredients.map((ing, i) => (
              <div key={ing.name} className="overflow-hidden rounded-2xl border border-border bg-card">
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
        </section>

        {/* Order */}
        <section id="commander" className="relative scroll-mt-28 overflow-hidden py-16 text-cream md:py-24">
          <img
            src={orderBg.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto max-w-2xl px-4">
            <h3 className="text-center font-[Playfair_Display] text-2xl font-bold text-cream sm:text-3xl">
              {t.formTitle}
            </h3>
            <p className="mt-1.5 text-center text-sm text-cream/80">{c.orderSub}</p>
            <div className="mt-6">
              <ProductOrderForm price={PRICE} />
            </div>
          </div>
        </section>

        {/* Capsules */}
        <section className="border-y border-border bg-card py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={productOpen}
                alt="FilaBio ouvert avec gélules, ginseng, miel et herbes"
                loading="lazy"
                width={1600}
                height={1200}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-[Playfair_Display] text-3xl font-bold">{c.capsuleTitle}</h2>
              <p className="mt-4 inline-flex rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
                {t.gelulesLabel}
              </p>
              <p className="mt-4 text-muted-foreground">{c.capsuleSub}</p>
              <p className="mt-2 text-sm text-muted-foreground/80">{c.capsuleNote}</p>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={productHand}
                alt="FilaBio tenu dans la main"
                loading="lazy"
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-[Playfair_Display] text-3xl font-bold">{c.usageTitle}</h2>
              <ol className="mt-6 space-y-3">
                {c.usage.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs text-muted-foreground/70">{c.usageNote}</p>
            </div>
          </div>
        </section>

        {/* Quality and ONSSA */}
        <section className="border-y border-border bg-card py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-xl">
              <img
                src={onssaLabel.url}
                alt="Étiquette FilaBio affichant les logos Halal, ISO 22000, Top Quality, SGS et l'agrément ONSSA"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full object-cover"
              />
            </div>
            <div className="mx-auto mt-10 max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">ONSSA</p>
              <h2 className="mt-2 font-[Playfair_Display] text-3xl font-bold md:text-4xl">
                {c.qualityTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {c.qualitySub}
              </p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {c.qualityPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-4">
              {c.qualityBadges.map((badge, i) => {
                const meta = QUALITY_BADGES[i];
                const Icon = meta?.icon ?? ShieldCheck;
                const tone = meta?.tone ?? "text-primary";
                return (
                  <li
                    key={badge.name}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-background px-3 py-4 text-center"
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${tone}`} />
                    <span className="text-sm font-semibold">{badge.name}</span>
                    <span className="text-xs leading-snug text-muted-foreground">{badge.desc}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-center">
              <p className="text-sm font-bold" dir="ltr">
                {c.qualityLicense}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{c.qualityLicenseNote}</p>
            </div>
          </div>
        </section>

        {/* Esprit FilaBio */}
        <section className="relative overflow-hidden border-y border-border">
          <img
            src={espritImage.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-20">
            <div className="max-w-xl">
              <h2 className="font-[Playfair_Display] text-3xl font-bold md:text-4xl">
                {c.espritTitle}
              </h2>
              <p className="mt-3 text-lg text-foreground/85">{c.espritSub}</p>
            </div>
          </div>
        </section>

        <ReviewsSection />

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-4 py-16">
          <h2 className="text-center font-[Playfair_Display] text-3xl font-bold">{c.faqTitle}</h2>
          <div className="mt-8 space-y-3">
            {FAQ_ITEMS[lang].map((item, i) => (
              <div key={item.q} className="overflow-hidden rounded-xl border border-border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-medium transition-colors hover:text-primary"
                >
                  {item.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-primary transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
