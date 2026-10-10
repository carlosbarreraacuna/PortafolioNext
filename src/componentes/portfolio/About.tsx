"use client";

import { useRef } from "react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Section, SectionTitle } from "./Section";

export function About() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => revealOnScroll(root.current!));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="about" ref={root}>
      <SectionTitle>{t.sections.about}</SectionTitle>

      <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <p data-reveal className="max-w-[60ch] text-xl leading-relaxed text-ink md:text-2xl">
            {t.about.lead}
          </p>
          <p data-reveal className="max-w-[65ch] text-base leading-relaxed text-muted">
            {t.about.p2}
          </p>
          <p data-reveal className="max-w-[65ch] text-base leading-relaxed text-muted">
            {t.about.p3}
          </p>
        </div>

        <dl className="flex flex-col lg:col-span-4 lg:col-start-9">
          {t.about.stats.map((s, i) => (
            <div key={s.lbl} data-reveal className={`flex items-baseline justify-between gap-6 py-6 ${i > 0 ? "border-t-2 border-outline" : ""}`}>
              <dd className="font-display text-5xl font-extrabold tabular-nums tracking-tighter text-ink md:text-6xl">{s.num}</dd>
              <dt className="max-w-[14ch] text-right text-sm leading-snug text-muted">{s.lbl}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
