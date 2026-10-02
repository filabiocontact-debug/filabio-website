import type { Lang } from "@/lib/lang";

/** Quantity offers. Prices in DH, delivery always free. */
export const BUNDLES = [
  { qty: 1, price: 199, save: 0, popular: false },
  { qty: 2, price: 349, save: 50, popular: true },
  { qty: 3, price: 480, save: 117, popular: false },
] as const;

export type Bundle = (typeof BUNDLES)[number];

export function bundleFor(qty: number): Bundle {
  return BUNDLES.find((b) => b.qty === qty) ?? BUNDLES[0];
}

/** Major Moroccan cities. `value` is stored with the order. */
export const CITIES: { value: string; fr: string; ar: string }[] = [
  { value: "Casablanca", fr: "Casablanca", ar: "الدار البيضاء" },
  { value: "Rabat", fr: "Rabat", ar: "الرباط" },
  { value: "Meknès", fr: "Meknès", ar: "مكناس" },
  { value: "Fès", fr: "Fès", ar: "فاس" },
  { value: "Marrakech", fr: "Marrakech", ar: "مراكش" },
  { value: "Agadir", fr: "Agadir", ar: "أكادير" },
  { value: "Tanger", fr: "Tanger", ar: "طنجة" },
  { value: "Salé", fr: "Salé", ar: "سلا" },
  { value: "Kénitra", fr: "Kénitra", ar: "القنيطرة" },
  { value: "Oujda", fr: "Oujda", ar: "وجدة" },
  { value: "Tétouan", fr: "Tétouan", ar: "تطوان" },
  { value: "El Jadida", fr: "El Jadida", ar: "الجديدة" },
  { value: "Mohammedia", fr: "Mohammedia", ar: "المحمدية" },
  { value: "Béni Mellal", fr: "Béni Mellal", ar: "بني ملال" },
  { value: "Nador", fr: "Nador", ar: "الناظور" },
  { value: "Safi", fr: "Safi", ar: "آسفي" },
  { value: "Autre", fr: "Autre ville", ar: "مدينة أخرى" },
];

export function isValidMoroccanPhone(value: string) {
  const digits = value.replace(/[\s.\-()]/g, "");
  return /^(?:0[5-7]\d{8}|(?:\+|00)?212[5-7]\d{8})$/.test(digits);
}

/** Real, verified customer reviews only. Empty = section hidden. */
export type Review = { name: string; city: string; text: string; rating: number; photo?: string };
export const REVIEWS: Record<Lang, Review[]> = { fr: [], ar: [] };
