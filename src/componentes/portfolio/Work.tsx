"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CON_MOVIMIENTO, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { revealSection } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Head } from "./Section";

// El escenario fijo solo existe con pantalla ancha y movimiento permitido; si no, los proyectos se apilan.
const CON_ESCENARIO = `${CON_MOVIMIENTO} and (min-width: 1024px)`;

/**
 * Indice pequeno, imagen grande. En escritorio la seccion se fija una pantalla por proyecto: a la izquierda
 * el titular, la ficha del proyecto actual y el indice; a la derecha la captura real, que entra barriendo
 * desde abajo. Las filas del indice llevan a su proyecto.
 */
export function Work() {
  const { t } = useI18n();
  const items = t.work.items;
  const root = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [staged, setStaged] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(CON_ESCENARIO);
    const sync = () => setStaged(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => revealSection(root.current!));

      if (staged) {
        const shots = gsap.utils.toArray<HTMLElement>(".work-shot", root.current);
        gsap.set(shots.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        const tl = gsap.timeline({ defaults: { ease: "none" } });
        shots.slice(1).forEach((shot, i) => {
          tl.to(shot, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5 }, i + 0.5).fromTo(
            shot.querySelector("img"),
            { scale: 1.15 },
            { scale: 1, duration: 0.5 },
            i + 0.5,
          );
        });
        stRef.current = ScrollTrigger.create({
          trigger: ".work-stage",
          start: "top top",
          end: () => `+=${(items.length - 1) * window.innerHeight}`,
          pin: true,
          scrub: 0.5,
          animation: tl,
          onUpdate: (self) => setCurrent(Math.min(items.length - 1, Math.round(self.progress * (items.length - 1)))),
        });
      }

      return () => {
        stRef.current = null;
        mm.revert();
      };
    },
    { scope: root, dependencies: [staged, items.length], revertOnUpdate: true },
  );

  // Ir a un proyecto desde el indice: se desplaza hasta su pantalla dentro del tramo fijado.
  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    const y = st.start + ((st.end - st.start) * i) / (items.length - 1);
    gsap.to(window, { scrollTo: { y }, duration: 0.9, ease: "power3.inOut" });
  };

  const p = items[current];

  return (
    <section id="work" ref={root} className="scroll-mt-16">
      {staged ? (
        <div className="work-stage grid h-[100svh] grid-cols-[38fr_62fr] overflow-clip">
          <div className="flex flex-col justify-between gap-8 px-8 pb-8 pt-24">
            <Head lines={t.work.head} className="text-heading text-ink" />

            <div aria-live="polite" className="flex flex-col gap-4">
              <h3 className="text-lead font-semibold text-ink">{p.title}</h3>
              <p className="-mt-2 text-small font-semibold text-accent-text">
                {p.where}, {p.year}
              </p>
              <p className="max-w-[44ch] text-body text-ink">{p.text}</p>
              <p className="text-small text-muted">{p.tags.join(", ")}</p>
            </div>

            <ul>
              {items.map((it, i) => (
                <li key={it.name}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === current ? "true" : undefined}
                    className={`flex min-h-11 w-full items-baseline justify-between gap-4 text-left transition-colors duration-300 ${i === current ? "text-ink" : "text-muted hover:text-ink"}`}
                  >
                    <span className={`text-lead transition-transform duration-300 ${i === current ? "translate-x-3 font-semibold" : ""}`}>
                      {it.name}
                    </span>
                    <span className="text-small">{it.kind}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative bg-field">
            {items.map((it, i) => (
              <div key={it.name} className="work-shot absolute inset-0 overflow-clip will-change-[clip-path]" style={{ zIndex: i }}>
                <Image
                  src={it.image}
                  alt={it.alt}
                  width={it.w}
                  height={it.h}
                  sizes="62vw"
                  className="size-full object-cover object-left-top"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 py-24 md:px-8 md:py-32">
          <Head lines={t.work.head} className="text-heading text-ink" />
          <ul className="mt-12 flex flex-col gap-20 md:mt-16">
            {items.map((it) => (
              <li key={it.name} data-reveal className="grid gap-6 md:grid-cols-12 md:gap-8">
                <div className="aspect-[16/10] overflow-clip bg-field md:col-span-7">
                  <Image
                    src={it.image}
                    alt={it.alt}
                    width={it.w}
                    height={it.h}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="size-full object-cover object-left-top"
                  />
                </div>
                <div className="flex flex-col gap-3 md:col-span-5">
                  <h3 className="text-lead font-semibold text-ink">{it.title}</h3>
                  <p className="-mt-1 text-small font-semibold text-accent-text">
                    {it.where}, {it.year}
                  </p>
                  <p className="text-body text-ink">{it.text}</p>
                  <p className="text-small text-muted">{it.tags.join(", ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
