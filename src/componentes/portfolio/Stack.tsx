"use client";

import { Fragment, useRef } from "react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealSection } from "@/lib/motion";
import { TOOL_LOGOS } from "@/content/translations";
import { useI18n } from "./I18nProvider";
import { Head } from "./Section";

const CON_PUNTERO = `${CON_MOVIMIENTO} and (hover: hover) and (pointer: fine)`;

/**
 * El stack como un solo parrafo a escala de cartel sobre el campo oscuro: cada herramienta en Anton,
 * separadas por comas, y las que tienen logo lo llevan en linea justo despues del nombre.
 */
export function Stack() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        revealSection(root.current!);
        // Las herramientas suben en oleada y los logos giran al llegar.
        gsap.from(".tool", {
          yPercent: 60,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tools", start: "top 80%", once: true },
        });
        gsap.from(".tool-logo", {
          rotate: -90,
          scale: 0,
          duration: 0.8,
          stagger: 0.06,
          delay: 0.3,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".tools", start: "top 80%", once: true },
        });
      });

      // Al pasar el cursor el logo da un giro: confirma la herramienta que se esta mirando.
      mm.add(CON_PUNTERO, () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".tool", root.current).forEach((tool) => {
          const logo = tool.querySelector(".tool-logo");
          const enter = () => {
            gsap.to(tool, { color: "#ff7a45", duration: 0.25 });
            if (logo) gsap.to(logo, { rotate: 360, duration: 0.6, ease: "power3.out", overwrite: true, onComplete: () => gsap.set(logo, { rotate: 0 }) });
          };
          const leave = () => gsap.to(tool, { color: "", duration: 0.3 });
          tool.addEventListener("pointerenter", enter);
          tool.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            tool.removeEventListener("pointerenter", enter);
            tool.removeEventListener("pointerleave", leave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const tools = t.stack.tools;

  return (
    <section id="stack" ref={root} className="scroll-mt-16 bg-field px-5 py-24 text-field-ink md:px-8 md:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Head lines={t.stack.head} className="text-heading" />
        <p data-reveal className="max-w-[40ch] text-body text-field-muted">
          {t.stack.text}
        </p>
      </div>

      <ul className="tools mt-14 font-display text-[clamp(2.5rem,5.2vw,5rem)] uppercase leading-[1.1] md:mt-20">
        {tools.map((name, i) => (
          <Fragment key={name}>
            <li className="tool inline-block cursor-default">
              {name}
              {TOOL_LOGOS[name] && (
                <img
                  src={`/habilidades/${TOOL_LOGOS[name]}.svg`}
                  alt=""
                  aria-hidden="true"
                  className={`tool-logo ml-[0.2em] inline-block h-[0.72em] w-auto align-[0.02em] ${TOOL_LOGOS[name] === "next-js" ? "invert" : ""}`}
                />
              )}
              {i < tools.length - 1 && <span className="text-field-muted">,</span>}
            </li>{" "}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
