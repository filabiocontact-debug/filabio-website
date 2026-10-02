import { useState } from "react";

import { useLang } from "@/lib/lang";
import {
  ArrowUpRight,
  Banknote,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  X,
  type LucideIcon,
} from "lucide-react";

export type Lang = "fr" | "ar";

/** Contact details — phone number is the placeholder provided by the owner. */
export const CONTACT = {
  company: "Indoka SARL",
  address: "ZI SSMK Meknès, Maroc",
  email: "filabio.contact@gmail.com",
  phoneDisplay: "+212 600 000 000",
  phoneHref: "+212600000000",
  whatsapp: "https://wa.me/212600000000",
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/",
};

type DialogKey = "contact" | "retours" | "cgv" | "privacy";
type FooterLink = { label: string; href?: string; dialog?: DialogKey };
type FooterCol = { title: string; links: FooterLink[] };

type FooterDict = {
  about: string;
  operatedBy: string;
  writeUs: string;
  close: string;
  cols: FooterCol[];
  rights: string;
  bottom: string;
  note: string;
  dialogs: Record<DialogKey, { title: string; body: string }>;
};

const T: Record<Lang, FooterDict> = {
  fr: {
    about:
      "FilaBio est une marque spécialisée dans les compléments alimentaires naturels et le bien-être.",
    operatedBy: "FilaBio est exploité par Indoka SARL",
    writeUs: "Nous écrire",
    close: "Fermer",
    cols: [
      {
        title: "Boutique",
        links: [
          { label: "Tous les produits", href: "/produits" },
          { label: "FilaBio Capsules", href: "/produits/filabio" },
          { label: "Offres spéciales", href: "/produits/filabio" },
        ],
      },
      {
        title: "Aide",
        links: [
          { label: "FAQ", href: "/faq" },
          { label: "Livraison & Paiement", href: "/livraison-retours" },
          { label: "Politiques de Retour", href: "/livraison-retours" },
          { label: "Contactez-nous", dialog: "contact" },
          { label: "Conditions Générales (CGV)", href: "/cgv" },
          { label: "Politique de Confidentialité", href: "/confidentialite" },
        ],
      },
      {
        title: "Suivre",
        links: [
          { label: "Instagram", href: CONTACT.instagram },
          { label: "TikTok", href: CONTACT.tiktok },
          { label: "WhatsApp", href: CONTACT.whatsapp },
        ],
      },
    ],
    rights: "© 2026 FilaBio. Tous droits réservés.",
    bottom: "Paiement à la livraison | Prix en dirhams (DH)",
    note: "Complément alimentaire. Ne remplace pas une alimentation variée et équilibrée. Tenir hors de portée des enfants.",
    dialogs: {
      contact: {
        title: "Nous écrire",
        body: "Une question sur votre commande ou sur le produit ? Écrivez-nous ou appelez-nous, nous vous répondons rapidement.",
      },
      retours: {
        title: "Politiques de Retour",
        body: "Les commandes FilaBio sont exploitées par Indoka SARL. Les conditions de retour applicables à votre commande vous sont communiquées lors de sa confirmation. Pour toute demande, contactez-nous par email ou par téléphone.",
      },
      cgv: {
        title: "Conditions Générales (CGV)",
        body: "Les présentes conditions régissent la vente des compléments alimentaires FilaBio au Maroc : prix en dirhams (DH), livraison gratuite partout au Maroc, paiement à la livraison. Un complément alimentaire ne remplace pas une alimentation variée et équilibrée.",
      },
      privacy: {
        title: "Politique de Confidentialité",
        body: "FilaBio collecte uniquement les informations nécessaires au traitement de votre commande : nom, téléphone et adresse. Ces données ne sont ni revendues ni utilisées à d'autres fins.",
      },
    },
  },
  ar: {
    about: "فيلابيو علامة تجارية متخصصة في المكملات الغذائية الطبيعية وفي العناية بالرفاهية.",
    operatedBy: "فيلابيو تُسيّرها شركة Indoka SARL",
    writeUs: "راسلونا",
    close: "إغلاق",
    cols: [
      {
        title: "المتجر",
        links: [
          { label: "جميع المنتجات", href: "/produits" },
          { label: "كبسولات فيلابيو", href: "/produits/filabio" },
          { label: "عروض خاصة", href: "/produits/filabio" },
        ],
      },
      {
        title: "المساعدة",
        links: [
          { label: "الأسئلة الشائعة", href: "/faq" },
          { label: "التوصيل والدفع", href: "/livraison-retours" },
          { label: "سياسة الإرجاع", href: "/livraison-retours" },
          { label: "اتصلوا بنا", dialog: "contact" },
          { label: "الشروط العامة للبيع", href: "/cgv" },
          { label: "سياسة الخصوصية", href: "/confidentialite" },
        ],
      },
      {
        title: "تابعونا",
        links: [
          { label: "Instagram", href: CONTACT.instagram },
          { label: "TikTok", href: CONTACT.tiktok },
          { label: "WhatsApp", href: CONTACT.whatsapp },
        ],
      },
    ],
    rights: "© 2026 فيلابيو. جميع الحقوق محفوظة.",
    bottom: "الدفع عند الاستلام | الأسعار بالدرهم (DH)",
    note: "مكمل غذائي. لا يعوّض نظامًا غذائيًا متنوعًا ومتوازنًا. يُحفظ في متناول الأطفال.",
    dialogs: {
      contact: {
        title: "راسلونا",
        body: "سؤال حول طلبك أو حول المنتج؟ راسلونا عبر البريد الإلكتروني أو اتصلوا بنا وسنجيبكم في أقرب وقت.",
      },
      retours: {
        title: "سياسة الإرجاع",
        body: "طلبات فيلابيو تُسيّرها شركة Indoka SARL. تُبلَّغ شروط الإرجاع المطبقة على طلبك عند تأكيد الطلب. لأي استفسار راسلونا بالبريد أو الهاتف.",
      },
      cgv: {
        title: "الشروط العامة للبيع",
        body: "تنظّم هذه الشروط بيع مكملات فيلابيو الغذائية في المغرب: الأسعار بالدرهم (DH)، التوصيل المجاني في جميع أنحاء المغرب، والدفع عند الاستلام. المكمل الغذائي لا يعوّض نظامًا غذائيًا متنوعًا ومتوازنًا.",
      },
      privacy: {
        title: "سياسة الخصوصية",
        body: "تجمع فيلابيو فقط المعلومات الضرورية لمعالجة طلبك: الاسم الكامل والهاتف والعنوان. لا تُباع هذه المعطيات ولا تُستعمل لأغراض أخرى.",
      },
    },
  },
};

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href);

const socialIcon = (label: string): LucideIcon | null =>
  label === "Instagram" ? Instagram : label === "TikTok" ? Music2 : label === "WhatsApp" ? MessageCircle : null;

export function SiteFooter() {
  const { lang } = useLang();
  const t = T[lang];
  const [dialog, setDialog] = useState<DialogKey | null>(null);

  return (
    <footer className="border-t border-border bg-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          {/* Column 1 — brand & legal info */}
          <div>
            <span className="font-[Playfair_Display] text-2xl font-bold text-primary">
              FilaBio<span className="align-super text-xs">®</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.about}</p>
            <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
              <li>{t.operatedBy}</li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{CONTACT.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2 transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="flex items-start gap-2 transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
              </li>
            </ul>
            <button
              onClick={() => setDialog("contact")}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Mail className="h-4 w-4" />
              {t.writeUs}
            </button>
          </div>

          {/* Columns 2-4 */}
          {t.cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold tracking-[0.2em] text-foreground/90 uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const Icon = socialIcon(l.label);
                  return (
                    <li key={l.label}>
                      {l.href ? (
                        <a
                          href={l.href}
                          {...(isExternal(l.href) ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {Icon && <Icon className="h-3.5 w-3.5" />}
                          {l.label}
                          {isExternal(l.href) && (
                            <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          )}
                        </a>
                      ) : (
                        <button
                          onClick={() => l.dialog && setDialog(l.dialog)}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {l.label}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[11px] leading-relaxed text-muted-foreground/70">{t.note}</p>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t.rights}</p>
          <p className="flex items-center gap-2">
            <Banknote className="h-3.5 w-3.5 text-primary" />
            {t.bottom}
          </p>
        </div>
      </div>

      {dialog && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.dialogs[dialog].title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-background/85 backdrop-blur-sm"
            onClick={() => setDialog(null)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <button
              onClick={() => setDialog(null)}
              aria-label={t.close}
              className="absolute end-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-[Playfair_Display] text-xl font-bold text-primary">
              {t.dialogs[dialog].title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.dialogs[dialog].body}
            </p>
            <div className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
                WhatsApp
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {CONTACT.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
