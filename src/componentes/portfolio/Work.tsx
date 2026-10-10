"use client";

import { useRef } from "react";
import Image from "next/image";
import { CON_MOVIMIENTO, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Section, SectionTitle } from "./Section";

export function Work() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(CON_MOVIMIENTO, () => revealOnScroll(root.current!, "[data-work-head]"));

      // Pila de tarjetas: cada panel queda fijo (CSS sticky, top 0) y la anterior se aleja
      // mientras la siguiente sube. El cambio se mide con el disparador de la tarjeta que llega.
      mm.add(`${CON_MOVIMIENTO} and (min-width: 768px)`, () => {
        const panels = gsap.utils.toArray<HTMLElement>(".work-panel", root.current);
        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;
          gsap.to(panel.querySelector(".work-card"), {
            scale: 0.93,
            autoAlpha: 0.45,
            ease: "none",
            scrollTrigger: { trigger: panels[i + 1], start: "top bottom", end: "top top", scrub: true },
          });
        });
        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="work" ref={root}>
      <div data-work-head>
        <SectionTitle>{t.sections.work}</SectionTitle>
      </div>

      <ul className="mt-12 flex flex-col gap-6 md:mt-16 md:gap-0">
        {t.work.map((p, i) => (
          <li key={p.title} className="work-panel md:sticky md:top-0 md:flex md:h-[100dvh] md:items-center">
            <article className="work-card toon-panel grid w-full gap-8 bg-surface p-5 shadow-toon-lg will-change-transform md:grid-cols-12 md:items-center md:gap-10 md:p-8">
              <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <Image
                  src={p.image}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  sizes="(min-width: 1280px) 700px, (min-width: 768px) 55vw, 90vw"
                  className="toon-control h-auto w-full"
                />
              </div>
              <div className="flex flex-col gap-5 md:col-span-5">
                <p className="text-sm font-bold text-accent-text">{p.where}</p>
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">{p.title}</h3>
                <p className="max-w-[48ch] text-base leading-relaxed text-muted">{p.text}</p>
                <ul className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li key={tag} className="toon-control bg-canvas px-3 py-1 text-sm font-semibold text-ink">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
