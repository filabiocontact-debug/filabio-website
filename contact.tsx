import { altLinks, localeMeta } from "@/lib/seo";
import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShoppingCart,
  User,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CONTACT } from "@/components/site-footer";
import { UI } from "@/lib/i18n";
import { useLang, type Lang } from "@/lib/lang";

type FieldKey = "name" | "email" | "phone" | "message";

const COPY: Record<
  Lang,
  {
    title: string;
    sub: string;
    formTitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successText: string;
    errName: string;
    errEmail: string;
    errPhone: string;
    errMessage: string;
    details: string;
    emailLabel: string;
    addressLabel: string;
    whatsapp: string;
    whatsappNote: string;
    orderNote: string;
    orderCta: string;
  }
> = {
  fr: {
    title: "Contact",
    sub: "Une question sur FilaBio, une commande ou une livraison ? Écrivez-nous, nous répondons rapidement.",
    formTitle: "Envoyez-nous un message",
    name: "Nom complet",
    email: "Email",
    phone: "Téléphone",
    message: "Message",
    messagePlaceholder: "Décrivez votre demande…",
    submit: "Envoyer le message",
    sending: "Message envoyé",
    successTitle: "Merci",
    successText: "Votre message est bien reçu. Nous vous répondrons à l'adresse indiquée.",
    errName: "Merci d'indiquer votre nom complet.",
    errEmail: "Adresse email invalide.",
    errPhone: "Numéro invalide. Exemple : 0612345678.",
    errMessage: "Merci de détailler votre demande.",
    details: "Coordonnées",
    emailLabel: "Email",
    addressLabel: "Adresse",
    whatsapp: "Commander sur WhatsApp",
    whatsappNote: "Vous pouvez aussi commander directement sur WhatsApp.",
    orderNote: "Pour commander, le formulaire de commande express est le plus rapide.",
    orderCta: "Commander FilaBio",
  },
  ar: {
    title: "اتصل بنا",
    sub: "سؤال حول فيلابيو أو حول طلب أو توصيل؟ راسلونا وسنجيبكم بسرعة.",
    formTitle: "أرسلوا لنا رسالة",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    messagePlaceholder: "اكتبوا استفساركم…",
    submit: "إرسال الرسالة",
    sending: "تم إرسال الرسالة",
    successTitle: "شكراً",
    successText: "تم استلام رسالتكم. سنرد عليكم على العنوان المذكور.",
    errName: "يُرجى إدخال الاسم الكامل.",
    errEmail: "عنوان بريد إلكتروني غير صحيح.",
    errPhone: "رقم غير صحيح. مثال: 0612345678.",
    errMessage: "يُرجى تفصيل طلبكم.",
    details: "معلومات الاتصال",
    emailLabel: "البريد الإلكتروني",
    addressLabel: "العنوان",
    whatsapp: "اطلب عبر WhatsApp",
    whatsappNote: "يمكنك الطلب مباشرة عبر WhatsApp.",
    orderNote: "للطلب، استمارة الطلب السريع هي الأسرع.",
    orderCta: "اطلب فيلابيو",
  },
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FilaBio | filabio.contact@gmail.com" },
      {
        name: "description",
        content:
          "Contactez FilaBio (Indoka SARL, ZI SSMK Meknès) : email, WhatsApp et formulaire de contact. Livraison gratuite au Maroc, paiement à la livraison.",
      },
      { property: "og:title", content: "Contact — FilaBio" },
      {
        property: "og:description",
        content: "Une question sur FilaBio ? Écrivez-nous ou commandez sur WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...localeMeta("/contact"),
    ],
    links: altLinks("/contact"),
  }),
  component: ContactPage,
});

function ContactPage() {
  const { lang, dir } = useLang();
  const t = UI[lang];
  const c = COPY[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const isValidPhone = (value: string) => {
    const digits = value.replace(/[\s.\-()]/g, "");
    return /^(?:0[5-7]\d{8}|\+?212[5-7]\d{8})$/.test(digits);
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<FieldKey, string>> = {};
    if (name.trim().length < 3) next.name = c.errName;
    if (!isValidEmail(email)) next.email = c.errEmail;
    if (phone.trim() && !isValidPhone(phone)) next.phone = c.errPhone;
    if (message.trim().length < 10) next.message = c.errMessage;
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const clearError = (key: FieldKey) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const fields: {
    key: FieldKey;
    icon: typeof User;
    label: string;
    value: string;
    set: (v: string) => void;
    type: string;
    placeholder: string;
  }[] = [
    { key: "name", icon: User, label: c.name, value: name, set: setName, type: "text", placeholder: c.name },
    { key: "email", icon: Mail, label: c.email, value: email, set: setEmail, type: "email", placeholder: "nom@exemple.com" },
    { key: "phone", icon: Phone, label: c.phone, value: phone, set: setPhone, type: "tel", placeholder: "06 12 34 56 78" },
  ];

  return (
    <div
      id="top"
      dir={dir}
      className="min-h-screen bg-background pt-28 font-[Jost] text-foreground md:pt-32"
    >
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-[Playfair_Display] text-4xl font-bold md:text-5xl">{c.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{c.sub}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-[Playfair_Display] text-2xl font-bold">{c.successTitle}</h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">{c.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <h2 className="font-[Playfair_Display] text-2xl font-bold">{c.formTitle}</h2>

                {fields.map(({ key, icon: Icon, label, value, set, type, placeholder }) => (
                  <div key={key}>
                    <div className="relative">
                      <Icon className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type={type}
                        value={value}
                        aria-label={label}
                        aria-invalid={Boolean(errors[key])}
                        onChange={(e) => {
                          set(e.target.value);
                          clearError(key);
                        }}
                        placeholder={placeholder}
                        className={`w-full rounded-xl border bg-background px-4 py-3 ps-10 outline-none placeholder:text-muted-foreground focus:border-primary ${
                          errors[key] ? "border-destructive" : "border-border"
                        }`}
                      />
                    </div>
                    {errors[key] && (
                      <p className="mt-1.5 ps-1 text-sm text-destructive">{errors[key]}</p>
                    )}
                  </div>
                ))}

                <div>
                  <textarea
                    value={message}
                    aria-label={c.message}
                    aria-invalid={Boolean(errors.message)}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      clearError("message");
                    }}
                    placeholder={c.messagePlaceholder}
                    rows={5}
                    className={`w-full rounded-xl border bg-background px-4 py-3 outline-none placeholder:text-muted-foreground focus:border-primary ${
                      errors.message ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 ps-1 text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <Send className="h-4 w-4" />
                  {c.submit}
                </button>
              </form>
            )}
          </div>

          {/* Direct details */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                {c.details}
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-start gap-3 transition-colors hover:text-primary"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <span className="block text-xs text-muted-foreground">{c.emailLabel}</span>
                      {CONTACT.email}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phoneHref}`}
                    className="flex items-start gap-3 transition-colors hover:text-primary"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <span className="block text-xs text-muted-foreground">{t.formPhone}</span>
                      {CONTACT.phoneDisplay}
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="block text-xs text-muted-foreground">{c.addressLabel}</span>
                    {CONTACT.address}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/50 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                {c.whatsapp}
              </a>
              <p className="mt-3 text-sm text-muted-foreground">{c.whatsappNote}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">{c.orderNote}</p>
              <Link
                to="/produits/$slug"
                params={{ slug: "filabio" }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <ShoppingCart className="h-4 w-4" />
                {c.orderCta}
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
