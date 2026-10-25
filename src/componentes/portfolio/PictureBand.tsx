"use client";

import { useRef } from "react";
import Image from "next/image";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "./I18nProvider";

// Escenas del personaje 3D generadas con Higgsfield (public/scenes). Van entre secciones de texto,
// grandes y pocas, como respiro de la tipografia.
const SCENES = {
  arch: { src: "/scenes/arch.webp", w: 2000, h: 1116 },
  desk: { src: "/scenes/desk.webp", w: 2000, h: 1116 },
} as const;

/**
 * Banda de imagen a todo el ancho. Al hacer scroll el marco se abre desde una ventana interior hasta el
 * borde de la pantalla y la escena se acerca un poco: el paso de una pantalla de texto a la imagen grande.
 */
export function PictureBand({ scene }: { scene: keyof typeof SCENES }) {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const s = SCENES[scene];
  const copy = t.pictures[scene];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: 0.6 } })
          .fromTo(".band-frame", { scale: 0.84 }, { scale: 1, ease: "none" }, 0)
          .fromTo(".band-img", { scale: 1.18 }, { scale: 1, ease: "none" }, 0);
        gsap.from(".band-caption", {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".band-caption", start: "top 95%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <figure ref={root} className="m-0">
      <div className="band-frame relative aspect-[4/5] w-full overflow-clip bg-field will-change-transform sm:aspect-[16/9] lg:aspect-auto lg:h-[92svh]">
        <Image
          src={s.src}
          alt={copy.alt}
          width={s.w}
          height={s.h}
          sizes="100vw"
          className="band-img size-full object-cover object-[72%_50%] will-change-transform sm:object-center"
        />
      </div>
      <figcaption className="band-caption px-5 pt-5 text-small text-muted md:px-8">{copy.caption}</figcaption>
    </figure>
  );
}
