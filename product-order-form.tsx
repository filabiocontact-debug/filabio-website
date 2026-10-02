import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Banknote, Check, ShoppingCart, Truck } from "lucide-react";

import productJar from "@/assets/product-front.png";
import { supabase } from "@/integrations/supabase/client";
import { BUNDLES, bundleFor, isValidMoroccanPhone } from "@/lib/commerce";
import { UI } from "@/lib/i18n";
import { useLang } from "@/lib/lang";
import { addOrder, detectCity } from "@/lib/store";

const SHEETS_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbz07vJCvArg_WqWt0EXB8yAdnMVpsdQwLBnD2rxrmEsfwYtFnYWD0dO3KX9aI646ivm/exec";

type FieldKey = "name" | "phone" | "address";

const TXT = {
  fr: {
    offer: "Choisissez votre offre",
    box: (n: number) => (n === 1 ? "1 boîte" : `${n} boîtes`),
    save: (n: number) => `Économisez ${n} DH`,
    popular: "Le plus populaire",
    free: "Livraison gratuite",
    name: "Nom & Prénom",
    errPhone: "Numéro invalide. Exemple : 06 12 34 56 78 ou +212 6 12 34 56 78.",
    buy: "Commander maintenant",
    total: "Total",
  },
  ar: {
    offer: "اختر العرض ديالك",
    box: (n: number) => (n === 1 ? "علبة واحدة" : n === 2 ? "علبتين" : `${n} علب`),
    bundle: (n: number, price: number) =>
      n === 1
        ? `علبة واحدة (${price} درهم)`
        : n === 2
          ? `علبتين - الأكثر طلباً (${price} درهم)`
          : `${n} علب (${price} درهم)`,
    save: (n: number) => `وفّر ${n} درهم`,
    popular: "الأكثر طلباً",
    free: "توصيل مجاني",
    name: "الاسم الكامل",
    phone: "رقم الهاتف (مثال: 0612345678)",
    address: "العنوان الكامل للتوصيل",
    errPhone: "رقم غير صحيح. مثال: 0612345678 أو 212612345678+",
    buy: "اضغط هنا للطلب الآن",
    total: "المجموع",
  },
};

/**
 * Express one-page cash-on-delivery checkout with quantity offers.
 * Orders are saved locally (admin) and in the backend.
 */
export function ProductOrderForm(_props: { price?: number }) {
  const { lang, qty, setQty } = useLang();
  const t = UI[lang];
  const x = TXT[lang];
  const bundle = bundleFor(qty);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const clearError = (key: FieldKey) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<FieldKey, string>> = {};
    if (name.trim().length < 3) next.name = t.errName;
    if (!isValidMoroccanPhone(phone)) next.phone = x.errPhone;
    if (address.trim().length < 6) next.address = t.errAddress;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const unit = Math.round(bundle.price / bundle.qty);
    addOrder({
      name: name.trim(),
      phone: phone.trim(),
      city: detectCity(address.trim()) || "",
      address: address.trim(),
      productSlug: "filabio",
      productName: "FilaBio",
      qty: bundle.qty,
      unitPrice: unit,
      deliveryFee: 0,
    });
    void supabase
      .from("orders")
      .insert({
        full_name: name.trim().slice(0, 120),
        phone: phone.trim().slice(0, 20),
        city: detectCity(address.trim()) || "",
        address: address.trim().slice(0, 300),
        product_slug: "filabio",
        product_name: "FilaBio",
        quantity: bundle.qty,
        unit_price: unit,
        total: bundle.price,
        delivery_fee: 0,
        language: lang,
      })
      .then(() => undefined);
    const total = bundle.price;
    const nom = name.trim();
    void fetch(SHEETS_WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        nom,
        telephone: phone.trim(),
        ville: detectCity(address.trim()) || "",
        adresse: address.trim(),
        pack: x.box(bundle.qty),
        total,
      }),
    }).catch((err) => console.error("Google Sheets order error:", err));
    setSubmitted(true);
    void navigate({ to: "/thank-you", search: { name: nom, total } });
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-cream-line bg-cream-surface p-6 text-center shadow-xl">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-8 w-8 text-cream-strong" />
        </div>
        <h3 className="font-[Playfair_Display] text-2xl font-bold">
          {t.successTitle} {name} !
        </h3>
        <p className="mt-2 text-cream-muted">
          {t.successText} — <strong>{bundle.price} DH</strong>
        </p>
      </div>
    );
  }

  const inputCls = (key: FieldKey) =>
    `w-full rounded-xl border bg-cream px-4 py-3 text-cream-foreground outline-none transition-colors placeholder:text-cream-muted focus:border-primary ${
      errors[key] ? "border-destructive" : "border-cream-line-strong"
    }`;

  const textFields: {
    key: FieldKey;
    label: string;
    value: string;
    set: (v: string) => void;
    type: string;
    placeholder: string;
  }[] = [
    { key: "name", label: x.name, value: name, set: setName, type: "text", placeholder: x.name },
    { key: "phone", label: t.formPhone, value: phone, set: setPhone, type: "tel", placeholder: lang === "ar" ? TXT.ar.phone : "+212 6 12 34 56 78" },
  ];
  const addressField = { key: "address" as const, label: t.formAddress, value: address, set: setAddress, type: "text", placeholder: lang === "ar" ? TXT.ar.address : t.formAddress };

  const renderText = (f: (typeof textFields)[number]) => (
    <div key={f.key}>
      <input
        type={f.type}
        value={f.value}
        aria-label={f.label}
        aria-invalid={Boolean(errors[f.key])}
        dir={f.key === "phone" ? "ltr" : undefined}
        onChange={(e) => {
          f.set(e.target.value);
          clearError(f.key);
        }}
        placeholder={f.placeholder}
        className={inputCls(f.key)}
      />
      {errors[f.key] && <p className="mt-1.5 ps-1 text-sm text-destructive">{errors[f.key]}</p>}
    </div>
  );

  return (
    <div className="rounded-2xl border border-cream-line bg-cream-surface p-5 text-cream-foreground shadow-xl sm:p-6">
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">


        <p className="pt-1 text-sm font-semibold uppercase tracking-wider text-cream-muted">{x.offer}</p>
        <div className="grid gap-2.5" role="radiogroup" aria-label={x.offer}>
          {BUNDLES.map((b) => {
            const active = b.qty === bundle.qty;
            return (
              <button
                key={b.qty}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setQty(b.qty)}
                className={`relative flex items-center justify-between gap-2 rounded-xl border-2 px-3 py-3 sm:gap-3 sm:px-4 text-start transition-all ${
                  active ? "border-cream-strong bg-transparent" : "border-cream-line-strong bg-transparent hover:border-cream-muted"
                }`}
              >
                {b.popular && lang !== "ar" && (
                  <span className="absolute -top-2.5 end-3 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold uppercase text-primary-foreground">
                    {x.popular}
                  </span>
                )}
                <span className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <span className="flex shrink-0 items-center -space-x-3 sm:-space-x-2" aria-hidden="true">
                    {Array.from({ length: b.qty }).map((_, i) => (
                      <img
                        key={i}
                        src={productJar}
                        alt=""
                        className="h-8 w-6 rounded-md sm:h-10 sm:w-8 border border-cream-line object-cover shadow-sm"
                        style={{ zIndex: b.qty - i }}
                      />
                    ))}
                  </span>
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${active ? "border-cream-strong" : "border-cream-line-strong"}`}>
                      {active && <span className="h-2.5 w-2.5 rounded-full bg-cream-strong" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold">
                      {lang === "ar" ? TXT.ar.bundle(b.qty, b.price) : x.box(b.qty)}
                    </span>
                    <span className="flex flex-wrap gap-1 text-[11px] sm:gap-1.5 sm:text-xs">
                      {b.save > 0 && (
                        <span className="rounded bg-destructive/10 px-1.5 py-0.5 font-semibold text-destructive">{x.save(b.save)}</span>
                      )}
                      <span className="rounded bg-primary/15 px-1.5 py-0.5 font-semibold text-cream-strong">{x.free}</span>
                    </span>
                  </span>
                </span>
                <span className={lang === "ar" ? "hidden" : "shrink-0 text-end"}>
                  <span className="block font-[Playfair_Display] whitespace-nowrap text-lg font-bold text-cream-strong sm:text-xl">{b.price} DH</span>
                  {b.save > 0 && <span className="text-xs whitespace-nowrap text-xs text-cream-muted line-through">{b.price + b.save} DH</span>}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-3.5">
          {textFields.map(renderText)}
          {renderText(addressField)}
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-cream-muted sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <span className="flex items-center gap-2">
            <Truck className="h-4 w-4 shrink-0 text-primary" />
            {t.freeDelivery}
          </span>
          <span className="flex items-center gap-2">
            <Banknote className="h-4 w-4 shrink-0 text-primary" />
            {t.cod}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-cream-line pt-4 font-bold">
          <span>{x.total}</span>
          <span className="font-[Playfair_Display] text-2xl text-cream-strong">{bundle.price} DH</span>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cream-strong px-4 py-4 text-sm font-bold uppercase tracking-[0.12em] text-cream transition-opacity hover:opacity-90 sm:text-base"
        >
          <ShoppingCart className="h-4 w-4 shrink-0" />
          {x.buy}
        </button>
      </form>

    </div>
  );
}
