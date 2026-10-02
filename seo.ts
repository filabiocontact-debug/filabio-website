export const SITE_URL = "https://filabio.ma";

/** Canonical + hreflang alternates. French is the default URL; Arabic uses ?lang=ar. */
export function altLinks(path: string) {
  const fr = `${SITE_URL}${path}`;
  const ar = `${fr}?lang=ar`;
  return [
    { rel: "canonical", href: fr },
    { rel: "alternate", hrefLang: "fr-MA", href: fr },
    { rel: "alternate", hrefLang: "ar-MA", href: ar },
    { rel: "alternate", hrefLang: "x-default", href: fr },
  ];
}

export function localeMeta(path: string) {
  return [
    { property: "og:url", content: `${SITE_URL}${path}` },
    { property: "og:locale", content: "fr_MA" },
    { property: "og:locale:alternate", content: "ar_MA" },
  ];
}
