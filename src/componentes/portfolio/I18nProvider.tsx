"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TRANSLATIONS, type Dict, type Lang } from "@/content/translations";

type I18nValue = { lang: Lang; t: Dict; setLang: (l: Lang) => void };

const I18nContext = createContext<I18nValue>({ lang: "es", t: TRANSLATIONS.es, setLang: () => {} });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cb-lang");
      if (saved === "es" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("cb-lang", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: TRANSLATIONS[lang] }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
