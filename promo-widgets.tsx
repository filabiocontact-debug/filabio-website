import { useEffect, useState } from "react";
import { Flame, Timer } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";

import { useLang } from "@/lib/lang";
import { useSettings } from "@/lib/store";

function endTime(iso: string) {
  if (iso) {
    const t = new Date(iso).getTime();
    if (!Number.isNaN(t)) return t;
  }
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

export function CountdownBadge() {
  const { lang } = useLang();
  const s = useSettings();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!s.showCountdown || now === null) return null;
  const left = endTime(s.promoEndsAt) - now;
  if (left <= 0) return null;
  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const sec = Math.floor((left % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
      <Timer className="h-4 w-4 shrink-0" />
      <span>{lang === "ar" ? "عرض محدود: ينتهي خلال" : "Offre limitée : se termine dans"}</span>
      <span dir="ltr" className="font-mono tabular-nums">
        {pad(h)}h {pad(m)}m {pad(sec)}s
      </span>
    </div>
  );
}

export function StockBadge() {
  const { lang } = useLang();
  const s = useSettings();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !s.showStock || s.stockLeft <= 0) return null;
  return (
    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-cream-strong">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive" />
      </span>
      <Flame className="h-4 w-4 text-destructive" />
      {lang === "ar"
        ? `بقيت ${s.stockLeft} علب فقط في المخزون!`
        : `Plus que ${s.stockLeft} unités en stock !`}
    </div>
  );
}

export function WhatsAppFloat() {
  const { lang } = useLang();
  const s = useSettings();
  const path = useRouterState({ select: (r) => r.location.pathname });
  if (path.startsWith("/admin")) return null;
  const text = encodeURIComponent(
    lang === "ar" ? "السلام، بغيت نسول على FilaBio" : "Bonjour, j'ai une question sur FilaBio",
  );
  return (
    <a
      href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 end-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-xl transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-current" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43a9.4 9.4 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.01-1.58a11.3 11.3 0 0 0 5.43 1.38h.01c6.25 0 11.34-5.08 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02" />
      </svg>
    </a>
  );
}
