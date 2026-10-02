import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "ar";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "ltr" | "rtl";
  /** Quantity currently selected for the cash-on-delivery order. */
  qty: number;
  setQty: (qty: number) => void;
};

const STORAGE_KEY = "filabio-lang";

const DEFAULT_LANG_CONTEXT: LangContextValue = {
  lang: "ar",
  setLang: () => undefined,
  dir: "rtl",
  qty: 1,
  setQty: () => undefined,
};

const LangContext = createContext<LangContextValue>(DEFAULT_LANG_CONTEXT);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [qty, setQty] = useState(1);

  // Restore the saved language after hydration (never during SSR).
  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("lang");
      if (fromUrl === "fr" || fromUrl === "ar") {
        setLang(fromUrl);
        return;
      }
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "fr" || saved === "ar") setLang(saved);
    } catch {
      /* storage unavailable — keep Arabic */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — ignore */
    }
  }, [lang]);

  const handleSetLang = useCallback((next: Lang) => setLang(next), []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang: handleSetLang,
      dir: lang === "ar" ? "rtl" : "ltr",
      qty,
      setQty: (next: number) => setQty(Math.min(99, Math.max(1, next))),
    }),
    [lang, qty, handleSetLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
