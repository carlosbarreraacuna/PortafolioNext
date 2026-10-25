"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { useI18n } from "./I18nProvider";
import type { Lang } from "@/content/translations";

type Theme = "light" | "dark";

// Controles planos: heredan el color de la barra (claro sobre el hero, tinta sobre la pagina).
export function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("cb-theme", next); } catch {}
    setTheme(next);
  };

  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t.ui.toLight : t.ui.toDark}
      className="grid size-11 place-items-center transition-transform duration-200 hover:rotate-12 active:scale-90"
    >
      {theme && <Icon size={20} weight="bold" aria-hidden="true" />}
    </button>
  );
}

export function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  const langs: Lang[] = ["es", "en"];
  return (
    <div role="group" aria-label={t.ui.language} className="flex text-small font-semibold">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={[
            "h-11 min-w-9 px-1.5 transition-opacity duration-200 active:scale-95",
            lang === l ? "opacity-100" : "opacity-60 hover:opacity-100",
          ].join(" ")}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
