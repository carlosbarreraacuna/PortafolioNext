"use client";

import { useRef } from "react";
import { Code, Headset, PlugsConnected, StackSimple } from "@phosphor-icons/react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Section, SectionTitle } from "./Section";

const CON_PUNTERO = `${CON_MOVIMIENTO} and (hover: hover) and (pointer: fine)`;
const ICONS = [Code, StackSimple, Headset, PlugsConnected];

// Bento de 4 celdas exactas (4 + 2 / 2 + 4) con superficies distintas: tinte de acento, liso, punteado y acento pleno.
const CELLS = [
  { span: "md:col-span-4", surface: "toon-tint text-ink", badge: "bg-accent text-on-accent", chip: "bg-surface text-ink", desc: "text-muted" },
  { span: "md:col-span-2", surface: "bg-surface text-ink", badge: "bg-accent text-on-accent", chip: "bg-canvas text-ink", desc: "text-muted" },
  { span: "md:col-span-2", surface: "toon-pattern text-ink", badge: "bg-accent text-on-accent", chip: "bg-surface text-ink", desc: "text-muted" },
  { span: "md:col-span-4", surface: "bg-accent text-on-accent", badge: "bg-surface text-ink", chip: "bg-surface text-ink", desc: "text-on-accent" },
];

export function Services() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => revealOnScroll(root.current!));

      // Al pasar el cursor, el icono da un saltito con rebote: confirma que la tarjeta responde.
      mm.add(CON_PUNTERO, () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".service-card", root.current).forEach((card) => {
          const badge = card.querySelector<HTMLElement>(".service-badge");
          if (!badge) return;
          const enter = () => gsap.to(badge, { rotate: -12, scale: 1.18, duration: 0.45, ease: "back.out(3)" });
          const leave = () => gsap.to(badge, { rotate: 0, scale: 1, duration: 0.4, ease: "back.out(2)" });
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="skills" ref={root}>
      <SectionTitle>{t.sections.skills}</SectionTitle>

      <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-6">
        {t.skills.map((s, i) => {
          const Icon = ICONS[i];
          const c = CELLS[i];
          return (
            <li
              key={s.t}
              data-reveal
              className={`service-card toon-panel flex flex-col justify-between gap-10 p-7 transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-toon-lg md:p-9 ${c.span} ${c.surface}`}
            >
              <div className="flex flex-col gap-5">
                <span className={`service-badge toon-control grid size-14 place-items-center ${c.badge}`}>
                  <Icon size={28} weight="bold" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight">{s.t}</h3>
                <p className={`max-w-[52ch] text-base leading-relaxed ${c.desc}`}>{s.d}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className={`toon-control px-3 py-1 text-sm font-semibold ${c.chip}`}>
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
