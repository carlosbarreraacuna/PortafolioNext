"use client";

import { useRef } from "react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealSection, scrollToId } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Head } from "./Section";

const MARK = { a: "mark mark-a", b: "mark mark-b", c: "mark mark-c" } as const;

export function About() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        revealSection(root.current!);
        // Los resaltados se encienden uno tras otro mientras se lee: marcan los datos que busca quien escanea.
        gsap.from(".mark", {
          opacity: 0.35,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-story", start: "top 70%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="scroll-mt-16 px-5 py-24 md:px-8 md:py-40">
      <Head lines={t.about.head} className="text-heading text-ink" />

      <p data-reveal className="about-story mt-12 text-lead text-ink md:mt-16 lg:columns-2 lg:gap-14">
        {t.about.story.map((part, i) =>
          typeof part === "string" ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i} className={MARK[part[1]]}>
              {part[0]}
            </span>
          ),
        )}{" "}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("contact");
          }}
          className="mark mark-a font-semibold underline decoration-2 underline-offset-4 transition-colors duration-200 hover:bg-ink hover:text-canvas"
        >
          {t.about.close}
        </a>
      </p>
    </section>
  );
}
