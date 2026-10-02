import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";

import { UI } from "@/lib/i18n";
import { useLang } from "@/lib/lang";

export function SiteHeader() {
  const { lang, setLang, qty } = useLang();
  const t = UI[lang];
  const [open, setOpen] = useState(false);

  const navItems: ReactNode = (
    <>
      <Link to="/" className="transition-colors hover:text-primary" onClick={() => setOpen(false)}>
        {t.nav.home}
      </Link>
      <Link to="/produits" className="transition-colors hover:text-primary" onClick={() => setOpen(false)}>
        {t.nav.products}
      </Link>
      <Link
        to="/produits/$slug"
        params={{ slug: "filabio" }}
        className="transition-colors hover:text-primary"
        onClick={() => setOpen(false)}
      >
        {t.nav.capsules}
      </Link>
      <Link to="/a-propos" className="transition-colors hover:text-primary" onClick={() => setOpen(false)}>
        {t.nav.about}
      </Link>
      <Link to="/contact" className="transition-colors hover:text-primary" onClick={() => setOpen(false)}>
        {t.nav.contact}
      </Link>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground">
        <p className="mx-auto max-w-6xl px-4 py-1.5 text-center text-[11px] font-semibold tracking-wide sm:text-xs">
          {t.announcement}
        </p>
      </div>

      {/* Main navbar */}
      <div className="border-b border-border bg-charcoal shadow-lg shadow-black/25">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="shrink-0">
            <span className="font-[Playfair_Display] text-2xl font-bold tracking-wide text-primary">
              FilaBio<span className="align-super text-xs">®</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
            {navItems}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="flex overflow-hidden rounded-full border border-border text-xs font-bold">
              <button
                onClick={() => setLang("ar")}
                aria-label="العربية"
                className={`px-3 py-1.5 transition-colors ${
                  lang === "ar" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                عربية
              </button>
              <button
                onClick={() => setLang("fr")}
                aria-label="Français"
                className={`px-3 py-1.5 transition-colors ${
                  lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                FR
              </button>
            </div>

            <Link
              to="/produits/$slug"
              params={{ slug: "filabio" }}
              aria-label={`${t.cart} (${qty})`}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {qty}
              </span>
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t.menu}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary lg:hidden"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-3 border-t border-border bg-charcoal px-4 py-5 text-sm text-muted-foreground lg:hidden">
            {navItems}
          </nav>
        )}
      </div>
    </header>
  );
}
