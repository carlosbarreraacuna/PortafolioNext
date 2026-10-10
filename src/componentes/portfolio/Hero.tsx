"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDownRight, BracketsCurly, Database, GitBranch } from "@phosphor-icons/react";
import { CON_MOVIMIENTO, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { scrollToId } from "@/lib/motion";
import { useI18n } from "./I18nProvider";

const CON_PUNTERO = `${CON_MOVIMIENTO} and (hover: hover) and (pointer: fine)`;

// Pegatinas del fondo: iconos del stack real que flotan fuera de la foto (no se superponen a la imagen).
const STICKERS = [
  { Icon: BracketsCurly, pos: "right-[7%] top-[22%]", tone: "bg-accent text-on-accent", size: "size-16", depth: 1.4 },
  { Icon: Database, pos: "right-[22%] bottom-[14%]", tone: "bg-surface text-ink", size: "size-14", depth: 0.9 },
  { Icon: GitBranch, pos: "right-[4%] bottom-[30%]", tone: "toon-tint text-ink", size: "size-12", depth: 1.8 },
];

export function Hero() {
  const { t, lang } = useI18n();
  const root = useRef<HTMLElement>(null);

  // Texto: primero el titular por lineas (jerarquia), despues el resto en orden de lectura.
  // Se repite al cambiar de idioma porque el titular se vuelve a montar.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        SplitText.create(".hero-title", {
          type: "lines",
          mask: "lines",
          maskClass: "hero-line-mask",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: 0.9, stagger: 0.1, ease: "back.out(1.3)" }),
        });
        gsap.from(".hero-fade", { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1, delay: 0.35, ease: "back.out(1.6)" });
      });
      return () => mm.revert();
    },
    { dependencies: [lang], scope: root, revertOnUpdate: true },
  );

  // Personaje: la cortina de color se abre y revela la ilustracion, que rebota al asentarse y luego
  // respira. Al bajar sube con parallax. Las pegatinas aparecen con rebote y flotan. Todo es transform.
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(CON_MOVIMIENTO, () => {
        gsap
          .timeline()
          .fromTo(".hero-photo-curtain", { scaleY: 1 }, { scaleY: 0, transformOrigin: "top", duration: 1.1, ease: "power4.inOut" })
          .from(".hero-photo-img", { scale: 1.25, duration: 1.6, ease: "elastic.out(1, 0.7)" }, 0.15)
          .from(".hero-arch-back", { rotate: 0, duration: 1.1, ease: "back.out(2.2)" }, 0.5)
          .from(".hero-arch-mid", { rotate: 0, duration: 1.1, ease: "back.out(2.2)" }, 0.65)
          .from(".hero-sticker", { scale: 0, rotate: -40, duration: 0.8, stagger: 0.14, ease: "back.out(3)" }, 0.9);

        // Vida en reposo: el personaje respira y las pegatinas flotan a ritmos distintos.
        gsap.to(".hero-photo-shift", { scale: 1.018, transformOrigin: "50% 100%", duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 });
        gsap.utils.toArray<HTMLElement>(".hero-sticker-float").forEach((s, i) => {
          gsap.to(s, {
            y: i % 2 ? 12 : -14,
            rotate: i % 2 ? -7 : 7,
            duration: 2.2 + i * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.2 + i * 0.3,
          });
        });

        // Al bajar, el personaje sube un poco mas rapido que el marco: profundidad entre foto y texto.
        gsap.to(".hero-photo-img", {
          yPercent: -5,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      });

      mm.add(CON_PUNTERO, () => {
        const shift = el.querySelector<HTMLElement>(".hero-photo-shift");
        if (!shift) return;
        const xTo = gsap.quickTo(shift, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(shift, "y", { duration: 0.9, ease: "power3.out" });
        const stickers = gsap.utils.toArray<HTMLElement>(".hero-sticker-drift").map((s) => ({
          depth: Number(s.dataset.depth ?? 1),
          x: gsap.quickTo(s, "x", { duration: 1.1, ease: "power3.out" }),
          y: gsap.quickTo(s, "y", { duration: 1.1, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          xTo(-nx * 28);
          yTo(-ny * 20);
          stickers.forEach((s) => {
            s.x(nx * 36 * s.depth);
            s.y(ny * 26 * s.depth);
          });
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
          stickers.forEach((s) => {
            s.x(0);
            s.y(0);
          });
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative overflow-hidden px-5 pt-20 md:px-8 md:pt-16">
      <div aria-hidden="true" className="toon-dots absolute inset-0" />

      {STICKERS.map(({ Icon, pos, tone, size, depth }, i) => (
        <div key={i} aria-hidden="true" className={`absolute z-10 hidden md:block ${pos}`}>
          <div className="hero-sticker-drift" data-depth={depth}>
            <div className="hero-sticker-float">
              <div className={`hero-sticker toon-panel grid place-items-center ${size} ${tone}`}>
                <Icon size={28} weight="bold" />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="relative mx-auto grid w-full max-w-7xl md:min-h-[calc(100dvh-4rem)] md:grid-cols-12 md:gap-10">
        {/* Texto: en movil va primero, en escritorio a la derecha */}
        <div className="order-1 flex flex-col justify-center pb-12 pt-6 md:order-2 md:col-span-7 md:col-start-6 md:pb-24 md:pt-0">
          <p className="hero-fade mb-5 text-base font-bold text-accent-text">{t.hero.eyebrow}</p>
          <h1
            key={lang}
            className="hero-title pb-1 text-4xl font-extrabold leading-[1.12] tracking-tight text-ink md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem]"
          >
            {t.hero.title}
          </h1>
          <p className="hero-fade mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">{t.hero.sub}</p>
          <div className="hero-fade mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("work");
              }}
              className="toon-btn inline-flex h-12 items-center gap-2 whitespace-nowrap bg-accent px-6 text-base font-bold text-on-accent"
            >
              {t.hero.ctaWork}
              <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              className="toon-btn inline-flex h-12 items-center whitespace-nowrap bg-surface px-6 text-base font-bold text-ink"
            >
              {t.hero.ctaContact}
            </a>
          </div>
        </div>

        {/* Personaje: arco tipo ventana pegado al borde inferior, con dos capas inclinadas detras */}
        <div className="relative order-2 self-end md:order-1 md:col-span-5 md:col-start-1">
          <div
            aria-hidden="true"
            style={{ transform: "rotate(-5deg)" }}
            className="hero-arch-back absolute inset-x-2 bottom-0 top-10 origin-bottom rounded-t-[999px] border-2 border-b-0 border-outline bg-accent"
          />
          <div
            aria-hidden="true"
            style={{ transform: "rotate(4deg)" }}
            className="hero-arch-mid toon-tint absolute inset-x-2 bottom-0 top-6 origin-bottom rounded-t-[999px] border-2 border-b-0 border-outline"
          />
          <div className="relative h-[62dvh] min-h-[22rem] overflow-hidden rounded-t-[999px] border-2 border-b-0 border-outline bg-surface md:h-[calc(100dvh-5rem)] md:max-h-[56rem]">
            <div className="hero-photo-shift absolute inset-x-[-6%] bottom-[-6%] top-0">
              <Image
                src="/carlos-toon.png"
                alt={t.hero.photoAlt}
                fill
                priority
                sizes="(min-width: 768px) 44vw, 100vw"
                className="hero-photo-img object-cover object-[50%_0%]"
              />
            </div>
            <div aria-hidden="true" className="hero-photo-curtain absolute inset-0 origin-top bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
