"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { useI18n } from "./I18nProvider";
import type { Lang } from "@/content/translations";

type Theme = "light" | "dark";

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
      className="toon-btn grid size-10 place-items-center bg-surface text-ink"
    >
      {theme && <Icon size={20} weight="regular" aria-hidden="true" />}
    </button>
  );
}

export function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  const langs: Lang[] = ["es", "en"];
  return (
    <div role="group" aria-label={t.ui.language} className="toon-control flex bg-surface p-0.5 text-sm font-bold">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={[
            "h-8 min-w-10 rounded-[calc(var(--radius-control)-4px)] px-3 transition-colors duration-200 active:scale-[0.98]",
            lang === l ? "bg-accent text-on-accent" : "text-muted hover:text-ink",
          ].join(" ")}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
