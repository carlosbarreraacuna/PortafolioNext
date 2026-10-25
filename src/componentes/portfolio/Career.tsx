"use client";

import { useRef } from "react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealSection } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Head } from "./Section";

/**
 * Trayectoria como un programa a un solo tamano: cargo, empresa y periodo en columnas fijas, sin lineas;
 * los logros de cada puesto debajo, a tamano de lectura. La formacion es el segundo bloque, con su
 * encabezado en el color de acento.
 */
export function Career() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => revealSection(root.current!));
      return () => mm.revert();
    },
    { scope: root },
  );

  const row = "grid gap-1 text-lead lg:grid-cols-[3fr_2fr_1fr] lg:gap-6";

  return (
    <section id="career" ref={root} className="scroll-mt-16 px-5 pb-20 pt-24 md:px-8 md:pb-32 md:pt-40">
      <Head lines={t.career.head} className="text-heading text-ink" />

      <ul className="mt-14 flex flex-col gap-14 md:mt-20">
        {t.career.jobs.map((j) => (
          <li key={j.role + j.period} data-reveal className="flex flex-col gap-5">
            <div className={row}>
              <h3 className="font-semibold text-ink">{j.role}</h3>
              <p className="text-ink">{j.org}</p>
              <p className="tabular-nums text-muted lg:text-right">{j.period}</p>
            </div>
            <ul className="grid gap-3 text-body text-ink md:grid-cols-3 md:gap-8">
              {j.bullets.map((b) => (
                <li key={b} className="max-w-[46ch]">
                  {b}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3 data-reveal className="mt-20 text-lead font-semibold text-accent-text md:mt-28">
        {t.career.eduHead}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {t.career.edu.map((e) => (
          <li key={e.b} data-reveal className={row}>
            <span className="text-ink">{e.b}</span>
            <span className="text-muted">{e.s}</span>
            <span className="tabular-nums text-muted lg:text-right">{e.y}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
