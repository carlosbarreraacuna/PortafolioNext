"use client";

import { useRef } from "react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Section, SectionTitle } from "./Section";

const CON_PUNTERO = `${CON_MOVIMIENTO} and (hover: hover) and (pointer: fine)`;

export function Stack() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => revealOnScroll(root.current!));

      // Cada herramienta salta y se inclina al pasar el cursor, como una pegatina que se despega.
      mm.add(CON_PUNTERO, () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".stack-chip", root.current).forEach((chip) => {
          const enter = () => gsap.to(chip, { y: -5, rotate: gsap.utils.random(-5, 5), duration: 0.35, ease: "back.out(3)" });
          const leave = () => gsap.to(chip, { y: 0, rotate: 0, duration: 0.35, ease: "back.out(2)" });
          chip.addEventListener("pointerenter", enter);
          chip.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            chip.removeEventListener("pointerenter", enter);
            chip.removeEventListener("pointerleave", leave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="stack" ref={root}>
      <SectionTitle>{t.sections.stack}</SectionTitle>

      <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {t.stack.groups.map((g) => (
          <div key={g.head} data-reveal className="flex flex-col gap-5 border-t-2 border-outline pt-6">
            <h3 className="text-lg font-extrabold tracking-tight">{g.head}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="stack-chip toon-control cursor-default bg-surface px-3 py-1.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent hover:text-on-accent"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-20 flex flex-col gap-8 md:mt-28">
        <h3 className="text-2xl font-extrabold tracking-tight">{t.stack.eduHead}</h3>
        <ul className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          {t.stack.edu.map((e) => (
            <li key={e.b} className="flex flex-col gap-1">
              <span className="text-base font-bold leading-snug text-ink">{e.b}</span>
              <span className="text-sm tabular-nums text-muted">{e.s}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
