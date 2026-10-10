"use client";

import { useRef } from "react";
import Image from "next/image";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "./I18nProvider";

type Variant = "pan" | "screen" | "doors" | "flip";

// Cada cuadro tiene su propia transicion, pensada desde lo que muestra la escena:
//  pan    oficina: la camara recorre la sala hasta la pizarra y el cuadro sube como un telon.
//  screen monitor: la camara entra en la pantalla de codigo, que se apaga y deja la pagina.
//  doors  colaboracion: el cuadro se abre por el centro, donde esta el holograma, como dos puertas.
//  flip   pizarra: la camara se acerca al diagrama y la hoja se voltea hacia arriba como un rotafolio.
const FRAMES = [
  { src: "/story/frame-1.jpg", w: 784, h: 335, focal: { x: 27, y: 24 }, variant: "pan" },
  { src: "/story/frame-2.jpg", w: 784, h: 328, focal: { x: 24, y: 42 }, variant: "screen" },
  { src: "/story/frame-3.jpg", w: 784, h: 329, focal: { x: 50, y: 52 }, variant: "doors" },
  { src: "/story/frame-4.jpg", w: 784, h: 308, focal: { x: 30, y: 58 }, variant: "flip" },
] as const satisfies ReadonlyArray<{ src: string; w: number; h: number; focal: { x: number; y: number }; variant: Variant }>;

// Ancho completo, borde a borde. La altura sigue la proporcion del cuadro (sin pasar de una pantalla) y las
// lineas de tinta arriba y abajo sustituyen al marco. Sin esquinas redondeadas ni sombra.
const FRAME_BOX = "relative aspect-[4/3] w-full max-h-[100dvh] md:aspect-[784/330]";

/**
 * Transicion entre secciones. El cuadro queda fijo (pin) y el scroll controla el tiempo de la animacion,
 * igual que en la skill scroll-world pero con cuadros estaticos en lugar de video.
 * Con movimiento reducido es una imagen normal: sin fijar, sin acercar.
 */
export function StoryBand({ index }: { index: 0 | 1 | 2 | 3 }) {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const f = FRAMES[index];
  const variant: Variant = f.variant;
  const origin = `${f.focal.x}% ${f.focal.y}%`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=75%", pin: true, anticipatePin: 1, scrub: 0.6 },
        });

        if (variant === "pan") {
          // apertura tipo cine: dos persianas del color de la pagina se separan desde el centro y dejan ver la sala
          tl.fromTo(".story-bar-t", { yPercent: 0 }, { yPercent: -100, duration: 0.24, ease: "power3.out" }, 0)
            .fromTo(".story-bar-b", { yPercent: 0 }, { yPercent: 100, duration: 0.24, ease: "power3.out" }, 0)
            // recorrido horizontal de la sala: de Carlos a la pizarra de arquitectura (escala fija; xPercent actua sobre el elemento ya escalado, por eso el rango es 12 y no 25)
            .fromTo(".story-img", { scale: 1.5, xPercent: 12 }, { scale: 1.5, xPercent: -12, duration: 0.72, transformOrigin: "50% 50%" }, 0.06)
            // el cuadro sube y sale por arriba mientras la pagina entra
            .to(".story-frame", { yPercent: -135, duration: 0.3, ease: "power2.in" }, 0.7);
        }

        if (variant === "screen") {
          // zoom hacia la pantalla del monitor
          tl.fromTo(".story-img", { scale: 1 }, { scale: 3.2, duration: 0.66, ease: "power2.in", transformOrigin: origin }, 0)
            // la pantalla llena el cuadro y se apaga
            .fromTo(".story-boot", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.14 }, 0.6)
            .to(".story-frame", { scale: 2.4, duration: 0.26, ease: "power2.in", transformOrigin: origin }, 0.74)
            .to(".story-frame", { autoAlpha: 0, duration: 0.14 }, 0.86);
        }

        if (variant === "doors") {
          // avance lento de camara hacia el holograma del centro
          tl.fromTo(".story-img", { scale: 1 }, { scale: 1.14, duration: 0.6, transformOrigin: "50% 50%" }, 0)
            // el cuadro se parte en dos y las mitades salen hacia los lados
            .to(".story-half-l", { xPercent: -112, duration: 0.4, ease: "power3.inOut" }, 0.6)
            .to(".story-half-r", { xPercent: 112, duration: 0.4, ease: "power3.inOut" }, 0.6);
        }

        if (variant === "flip") {
          // la camara se acerca al diagrama
          tl.fromTo(".story-img", { scale: 1 }, { scale: 1.5, duration: 0.6, transformOrigin: origin }, 0)
            // la hoja se voltea hacia arriba, como un rotafolio, y deja ver la pagina
            .to(".story-frame", { rotationX: -100, duration: 0.38, ease: "power2.in", transformOrigin: "50% 0%" }, 0.62);
        }
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [variant] },
  );

  const image = (alt: string, extra = "") => (
    <Image
      src={f.src}
      alt={alt}
      width={f.w}
      height={f.h}
      sizes="100vw"
      className={`story-img size-full object-cover saturate-[1.06] contrast-[1.03] will-change-transform ${extra}`}
      style={{ objectPosition: `${f.focal.x}% ${f.focal.y}%` }}
    />
  );

  return (
    <section
      ref={root}
      className="story-band grid place-items-center overflow-hidden"
      style={variant === "flip" ? { perspective: "1400px" } : undefined}
    >
      {variant === "doors" ? (
        <div className={`story-frame ${FRAME_BOX}`}>
          <div className="story-half-l absolute inset-y-0 left-0 w-1/2 overflow-hidden border-y-2 border-outline bg-surface will-change-transform">
            <div className="absolute inset-y-0 left-0 w-[200%]">{image(t.story[index].alt)}</div>
          </div>
          <div className="story-half-r absolute inset-y-0 right-0 w-1/2 overflow-hidden border-y-2 border-outline bg-surface will-change-transform">
            <div className="absolute inset-y-0 right-0 w-[200%]">{image("")}</div>
          </div>
        </div>
      ) : (
        <div
          className={`story-frame ${FRAME_BOX} overflow-hidden border-y-2 border-outline bg-surface will-change-transform`}
          style={variant === "flip" ? { backfaceVisibility: "hidden" } : undefined}
        >
          {image(t.story[index].alt)}
          {variant === "pan" && (
            <>
              <div aria-hidden="true" className="story-bar story-bar-t absolute inset-x-0 top-0 z-10 h-1/2 border-b-2 border-outline bg-canvas" />
              <div aria-hidden="true" className="story-bar story-bar-b absolute inset-x-0 bottom-0 z-10 h-1/2 border-t-2 border-outline bg-canvas" />
            </>
          )}
          {variant === "screen" && <div aria-hidden="true" className="story-boot absolute inset-0 bg-[#0E1220] opacity-0" />}
        </div>
      )}
    </section>
  );
}
