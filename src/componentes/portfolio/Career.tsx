"use client";

import { useRef } from "react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Section, SectionTitle } from "./Section";

export function Career() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        revealOnScroll(root.current!);
        // La linea se dibuja con el scroll: muestra el avance en el tiempo, de lo mas reciente a lo mas antiguo.
        gsap.fromTo(
          ".career-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: ".career-list", start: "top 70%", end: "bottom 70%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="career" ref={root}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionTitle>{t.sections.career}</SectionTitle>
          </div>
        </div>

        <ol className="career-list relative flex flex-col gap-16 pl-8 lg:col-span-8 lg:pl-12">
          <span aria-hidden="true" className="absolute -left-[1.5px] bottom-0 top-2 w-[3px] rounded-full bg-line" />
          <span aria-hidden="true" className="career-progress absolute -left-[1.5px] bottom-0 top-2 w-[3px] origin-top rounded-full bg-accent" />
          {t.career.map((c) => (
            <li key={c.role + c.period} data-reveal className="relative flex flex-col gap-3">
              <span aria-hidden="true" className="absolute -left-8 top-0.5 size-5 -translate-x-1/2 rounded-full border-2 border-outline bg-accent lg:-left-12" />
              <p className="toon-control w-fit bg-accent-soft px-3 py-1 text-sm font-bold tabular-nums text-ink">{c.period}</p>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-ink">{c.role}</h3>
              <p className="text-base text-muted">{c.org}</p>
              <ul className="mt-3 flex max-w-[65ch] flex-col gap-3">
                {c.bullets.map((b) => (
                  <li key={b} className="text-base leading-relaxed text-ink">
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
