import { useSyncExternalStore } from "react";

// ============ Types ============

export type OrderStatus = "nouvelle" | "confirmee" | "transit" | "livree" | "annulee";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  promoPrice: number | null;
  description: string;
  ingredients: string[];
  stock: number;
  category?: string;
  image: string | null;
  visible: boolean;
  createdAt: string;
};

export type Order = {
  id: string;
  ref: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  productSlug: string;
  productName: string;
  qty: number;
  unitPrice: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  demo?: boolean;
};

export type Settings = {
  company: string;
  email: string;
  phoneDisplay: string;
  whatsapp: string;
  address: string;
  accessCode: string;
  defaultDeliveryFee: number;
  deliveryFees: Record<string, number>;
  /** Units displayed in the "only N left" badge. 0 hides it. */
  stockLeft: number;
  showStock: boolean;
  /** ISO date when the promo ends. Empty = end of the current day. */
  promoEndsAt: string;
  showCountdown: boolean;
};

// ============ Defaults ============

const K_PRODUCTS = "filabio.v1.products";
const K_ORDERS = "filabio.v1.orders";
const K_SETTINGS = "filabio.v1.settings";
const K_VISITS = "filabio.v1.visits";

export const STATUS_ORDER: OrderStatus[] = [
  "nouvelle",
  "confirmee",
  "transit",
  "livree",
  "annulee",
];

export const STATUS_FR: Record<OrderStatus, string> = {
  nouvelle: "Nouvelle",
  confirmee: "Confirmée",
  transit: "En transit",
  livree: "Livrée",
  annulee: "Annulée",
};

export const STATUS_AR: Record<OrderStatus, string> = {
  nouvelle: "جديدة",
  confirmee: "مؤكدة",
  transit: "قيد النقل",
  livree: "تم تسليمها",
  annulee: "ملغاة",
};

export const STATUS_COLOR: Record<OrderStatus, string> = {
  nouvelle: "oklch(0.72 0.13 250)",
  confirmee: "oklch(0.78 0.13 85)",
  transit: "oklch(0.7 0.15 40)",
  livree: "oklch(0.7 0.15 155)",
  annulee: "oklch(0.6 0.19 25)",
};

export const DEFAULT_SETTINGS: Settings = {
  company: "Indoka SARL",
  email: "filabio.contact@gmail.com",
  phoneDisplay: "+212 600 000 000",
  whatsapp: "212600000000",
  address: "ZI SSMK, Meknès, Maroc",
  accessCode: "@FilaBio2000",
  defaultDeliveryFee: 0,
  deliveryFees: {
    Casablanca: 0,
    Rabat: 0,
    Meknès: 0,
    Marrakech: 0,
    Fès: 0,
    Tanger: 0,
    Agadir: 0,
    Oujda: 0,
  },
  stockLeft: 7,
  showStock: true,
  promoEndsAt: "",
  showCountdown: true,
};

export const DEFAULT_PRODUCT: Product = {
  id: "p_filabio",
  name: "FilaBio",
  slug: "filabio",
  price: 199,
  promoPrice: null,
  description:
    "Complément alimentaire à base de plantes naturelles — Maca, Gelée Royale, Ginseng et herbes naturelles. Boîte de 20 gélules.",
  ingredients: ["Extrait de Maca", "Gelée Royale", "Extrait de Ginseng", "Herbes Naturelles"],
  stock: 120,
  image: null,
  visible: true,
  createdAt: "2026-09-01T09:00:00.000Z",
};

// ============ Reactive local store ============

const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function notify() {
  cache.clear();
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return fallback;
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value = fallback;
  if (raw) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded — ignore */
  }
  notify();
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}

// ============ Products ============

export function getProducts(): Product[] {
  return read<Product[]>(K_PRODUCTS, [DEFAULT_PRODUCT]);
}

export function setProducts(next: Product[]) {
  write(K_PRODUCTS, next);
}

export function saveProduct(p: Product) {
  const all = getProducts();
  const i = all.findIndex((x) => x.id === p.id);
  if (i >= 0) all[i] = p;
  else all.push(p);
  setProducts(all);
}

export function deleteProduct(id: string) {
  setProducts(getProducts().filter((p) => p.id !== id));
}

export function newProduct(): Product {
  return {
    id: uid("p"),
    name: "",
    slug: "",
    price: 199,
    promoPrice: null,
    description: "",
    ingredients: [],
    stock: 0,
    image: null,
    visible: true,
    createdAt: new Date().toISOString(),
  };
}

// ============ Orders ============

export function getOrders(): Order[] {
  return read<Order[]>(K_ORDERS, []);
}

export function setOrders(next: Order[]) {
  write(K_ORDERS, next);
}

export function nextOrderRef() {
  const n = getOrders().length + 1041;
  return `FB-${n}`;
}

export function addOrder(input: {
  name: string;
  phone: string;
  address: string;
  city?: string;
  productSlug: string;
  productName: string;
  qty: number;
  unitPrice: number;
  deliveryFee: number;
}) {
  const total = input.qty * input.unitPrice + input.deliveryFee;
  const order: Order = {
    id: uid("o"),
    ref: nextOrderRef(),
    name: input.name,
    phone: input.phone,
    address: input.address,
    city: input.city ?? detectCity(input.address),
    productSlug: input.productSlug,
    productName: input.productName,
    qty: input.qty,
    unitPrice: input.unitPrice,
    deliveryFee: input.deliveryFee,
    total,
    status: "nouvelle",
    createdAt: new Date().toISOString(),
  };
  setOrders([order, ...getOrders()]);
  return order;
}

export function updateOrder(id: string, patch: Partial<Order>) {
  setOrders(getOrders().map((o) => (o.id === id ? { ...o, ...patch } : o)));
}

export function deleteOrder(id: string) {
  setOrders(getOrders().filter((o) => o.id !== id));
}

// ============ Settings & visits ============

let settingsMemo: { src: unknown; value: Settings } | null = null;

export function getSettings(): Settings {
  const src = read<Partial<Settings>>(K_SETTINGS, {});
  if (settingsMemo && settingsMemo.src === src) return settingsMemo.value;
  const value = { ...DEFAULT_SETTINGS, ...src, deliveryFees: { ...DEFAULT_SETTINGS.deliveryFees, ...(src.deliveryFees ?? {}) } };
  settingsMemo = { src, value };
  return value;
}

export function saveSettings(s: Settings) {
  write(K_SETTINGS, s);
}

export function deliveryFeeFor(city: string, s = getSettings()) {
  const key = Object.keys(s.deliveryFees).find(
    (c) => c.toLowerCase() === (city || "").trim().toLowerCase(),
  );
  return key ? (s.deliveryFees[key] ?? s.defaultDeliveryFee) : s.defaultDeliveryFee;
}

export function countVisit() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(K_VISITS, String(Number(window.localStorage.getItem(K_VISITS) ?? 0) + 1));
  } catch {
    /* ignore */
  }
}

export function getVisits() {
  return read<number>(K_VISITS, 0);
}

// ============ City detection ============

const CITIES = [
  "Casablanca",
  "Rabat",
  "Salé",
  "Marrakech",
  "Meknès",
  "Meknes",
  "Fès",
  "Fez",
  "Tanger",
  "Agadir",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "El Jadida",
  "Mohammedia",
  "Berrechid",
  "Settat",
  "Béni Mellal",
  "Nador",
  "Larache",
  "Safi",
  "Khouribga",
  "Errachidia",
  "Ouarzazate",
  "Essaouira",
  "Dakhla",
  "Laâyoune",
];

export function detectCity(address: string) {
  const found = CITIES.find((c) => address.toLowerCase().includes(c.toLowerCase()));
  if (!found) return "";
  return found === "Meknes" ? "Meknès" : found === "Fez" ? "Fès" : found;
}

// ============ Stats ============

export type Stats = {
  revenue: number;
  orders: number;
  aov: number;
  conversion: number;
  visits: number;
  pending: number;
};

export function computeStats(orders: Order[], visits: number): Stats {
  const valid = orders.filter((o) => o.status !== "annulee");
  const revenue = valid.reduce((s, o) => s + o.total, 0);
  const ordersCount = orders.length;
  const aov = valid.length ? Math.round(revenue / valid.length) : 0;
  const conversion = visits > 0 ? (ordersCount / visits) * 100 : 0;
  return {
    revenue,
    orders: ordersCount,
    aov,
    conversion,
    visits,
    pending: orders.filter((o) => o.status === "nouvelle" || o.status === "confirmee").length,
  };
}

export type Granularity = "daily" | "weekly" | "monthly";

export function revenueSeries(
  orders: Order[],
  granularity: Granularity,
): { label: string; value: number }[] {
  const valid = orders.filter((o) => o.status !== "annulee");
  const buckets = new Map<string, { key: string; label: string; value: number }>();

  const fmt = (d: Date) => {
    if (granularity === "daily") {
      return {
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        label: d.toLocaleDateString("fr-MA", { day: "2-digit", month: "short" }),
      };
    }
    if (granularity === "weekly") {
      const onejan = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
      return {
        key: `${d.getFullYear()}-W${String(week).padStart(2, "0")}`,
        label: `S${week}`,
      };
    }
    return {
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("fr-MA", { month: "short", year: "2-digit" }),
    };
  };

  valid.forEach((o) => {
    const d = new Date(o.createdAt);
    const { key, label } = fmt(d);
    const cur = buckets.get(key) ?? { key, label, value: 0 };
    cur.value += o.total;
    buckets.set(key, cur);
  });

  return [...buckets.values()].sort((a, b) => a.key.localeCompare(b.key)).slice(-14);
}

export function topCities(orders: Order[], limit = 6) {
  const map = new Map<string, number>();
  orders
    .filter((o) => o.status !== "annulee")
    .forEach((o) => {
      const c = o.city || "Non précisé";
      map.set(c, (map.get(c) ?? 0) + o.total);
    });
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function statusCounts(orders: Order[]) {
  return STATUS_ORDER.map((s) => ({
    status: s,
    label: s,
    value: orders.filter((o) => o.status === s).length,
  }));
}

export function toCsv(orders: Order[]) {
  const head = [
    "Réf",
    "Date",
    "Client",
    "Téléphone",
    "Ville",
    "Adresse",
    "Produit",
    "Qté",
    "Prix unitaire",
    "Livraison",
    "Total",
    "Statut",
  ];
  const rows = orders.map((o) => [
    o.ref,
    new Date(o.createdAt).toLocaleString("fr-MA"),
    o.name,
    o.phone,
    o.city,
    o.address.replace(/\s+/g, " "),
    o.productName,
    String(o.qty),
    String(o.unitPrice),
    String(o.deliveryFee),
    String(o.total),
    STATUS_FR[o.status],
  ]);
  return [head, ...rows]
    .map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(";"))
    .join("\r\n");
}

// ============ Demo data ============

const DEMO_NAMES = [
  "Youssef El Amrani",
  "Salma Bennani",
  "Karim Chraibi",
  "Fatima Zahra Idrissi",
  "Mehdi Bouzid",
  "Nadia Alaoui",
  "Omar Tazi",
  "Imane Kabbaj",
  "Rachid Moutawakil",
  "Hanane Sebti",
  "Adil Berrada",
  "Sofia Lahlou",
];

const DEMO_CITIES = [
  "Casablanca",
  "Rabat",
  "Meknès",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
];

export function seedDemoData() {
  const settings = getSettings();
  const products = getProducts();
  const product = products[0] ?? DEFAULT_PRODUCT;
  const orders: Order[] = [];
  const now = Date.now();
  const statuses: OrderStatus[] = [
    "livree",
    "livree",
    "livree",
    "livree",
    "livree",
    "transit",
    "transit",
    "confirmee",
    "confirmee",
    "nouvelle",
    "nouvelle",
    "annulee",
  ];

  for (let i = 0; i < 46; i++) {
    const name = DEMO_NAMES[i % DEMO_NAMES.length]!;
    const city = DEMO_CITIES[i % DEMO_CITIES.length]!;
    const qty = (i % 3) + 1;
    const unitPrice = product.promoPrice ?? product.price;
    const deliveryFee = deliveryFeeFor(city, settings);
    const status = statuses[i % statuses.length]!;
    const daysAgo = Math.floor((i * 47) % 60);
    const created = new Date(now - daysAgo * 86400000 - (i % 9) * 3600000);
    orders.push({
      id: uid("o"),
      ref: `FB-${1041 + i}`,
      name,
      phone: `06${String(10000000 + ((i * 7919) % 89999999)).padStart(8, "0").slice(0, 8)}`,
      address: `Quartier ${["Agdal", "Maârif", "Hay Riad", "Guéliz", "Nouvelle Ville"][i % 5]}, Rue ${12 + i}`,
      city,
      productSlug: product.slug,
      productName: product.name,
      qty,
      unitPrice,
      deliveryFee,
      total: qty * unitPrice + deliveryFee,
      status,
      createdAt: created.toISOString(),
      demo: true,
    });
  }

  setOrders([...orders, ...getOrders().filter((o) => !o.demo)]);
  if (getVisits() === 0) {
    try {
      window.localStorage.setItem(K_VISITS, "820");
    } catch {
      /* ignore */
    }
  }
  notify();
}

export function clearDemoData() {
  setOrders(getOrders().filter((o) => !o.demo));
}

// ============ React hooks ============

export function useProducts() {
  return useSyncExternalStore(subscribe, getProducts, () => [DEFAULT_PRODUCT]);
}

export function useOrders() {
  return useSyncExternalStore(subscribe, getOrders, () => []);
}

export function useSettings() {
  return useSyncExternalStore(subscribe, getSettings, () => DEFAULT_SETTINGS);
}

export function useVisits() {
  return useSyncExternalStore(subscribe, getVisits, () => 0);
}

export function formatDH(n: number) {
  return `${Math.round(n).toLocaleString("fr-FR")} DH`;
}
