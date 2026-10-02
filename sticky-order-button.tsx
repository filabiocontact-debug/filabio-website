import { ShoppingCart } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import { useLang } from "@/lib/lang";

const TXT = {
  fr: "Commander maintenant",
  ar: "اطلب الآن",
};

/**
 * Sticky "Order now" button, always visible (except admin / thank-you).
 * Scrolls to the order form on the current page, or navigates to the
 * homepage order section from any other page.
 */
export function StickyOrderButton() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const path = useRouterState({ select: (r) => r.location.pathname });
  if (path.startsWith("/admin") || path.startsWith("/thank-you")) return null;

  const onClick = () => {
    const el = document.getElementById("commander");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    void navigate({ to: "/", hash: "commander" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="animate-buy-pulse fixed bottom-5 start-5 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold uppercase text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105"
    >
      <ShoppingCart className="h-4 w-4 shrink-0" />
      {TXT[lang]}
    </button>
  );
}
