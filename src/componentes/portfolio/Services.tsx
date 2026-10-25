"use client";

import { useRef } from "react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealSection, scrollToId } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Head } from "./Section";

/**
 * Dos mitades pegadas: a la izquierda la tesis (titular en zigzag, parrafo y accion) sobre el tono claro;
 * a la derecha los cuatro frentes de trabajo como filas sobre el campo oscuro, separadas solo por tono.
 */
export function Services() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        revealSection(root.current!);
        // Las cifras cuentan desde cero al entrar: el numero llega como un dato, no como un adorno.
        gsap.utils.toArray<HTMLElement>(".stat-num", root.current).forEach((el) => {
          const target = parseInt(el.textContent ?? "0", 10);
          const suffix = (el.textContent ?? "").replace(/\d+/, "");
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.v)}${suffix}`;
            },
          });
        });
        // Las filas entran desde la derecha una tras otra, como si se apilaran contra la tesis.
        gsap.from(".service-row", {
          xPercent: 12,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".service-rows", start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="skills" ref={root} className="scroll-mt-16 grid overflow-x-clip lg:grid-cols-2">
      <div className="flex min-h-[70svh] flex-col justify-between gap-16 bg-surface px-5 py-20 md:px-8 lg:min-h-[92svh] lg:py-24">
        <Head lines={t.services.head} lineClass={["", "text-right"]} className="text-[clamp(2.25rem,4.8vw,5.5rem)] leading-[0.95] text-ink" />
        {/* Dos cifras grandes con su frase: la evidencia de la tesis, en el centro de la celda */}
        <div className="grid grid-cols-2 gap-6">
          {t.services.stats.map((st) => (
            <div key={st.num} data-reveal className="flex flex-col gap-2">
              <p className="stat-num font-display text-[clamp(4rem,9vw,9.5rem)] leading-[0.85] text-ink">{st.num}</p>
              <p className="max-w-[24ch] text-body text-ink">{st.lbl}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p data-reveal className="max-w-[36ch] text-body text-ink">
            {t.services.text}
          </p>
          <a
            data-reveal
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
            className="btn self-start sm:self-auto"
          >
            {t.services.cta}
          </a>
        </div>
      </div>

      <ul className="service-rows flex flex-col bg-field text-field-ink">
        {t.services.rows.map((r, i) => (
          <li
            key={r.t}
            className={`service-row group grid gap-4 px-5 py-9 transition-colors duration-300 hover:bg-[#1b2742] md:grid-cols-12 md:gap-6 md:px-8 lg:flex-1 lg:content-center ${i % 2 ? "bg-field-2" : "bg-field"}`}
          >
            <h3 className="text-lead font-semibold transition-transform duration-300 group-hover:translate-x-2 md:col-span-5">{r.t}</h3>
            <p className="text-body md:col-span-4">{r.d}</p>
            <ul className="flex flex-wrap gap-x-1 text-small text-field-muted md:col-span-3 md:flex-col md:gap-1">
              {r.items.map((it, j) => (
                <li key={it}>
                  {it}
                  <span className="md:hidden">{j < r.items.length - 1 ? "," : ""}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
