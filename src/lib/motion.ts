"use client";

import { gsap, SIN_MOVIMIENTO } from "@/lib/gsap";

const NAV_OFFSET = 64;

/** Desplazamiento suave a una seccion. Con movimiento reducido salta directo. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.matchMedia(SIN_MOVIMIENTO).matches) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET });
    return;
  }
  gsap.to(window, { scrollTo: { y: el, offsetY: NAV_OFFSET }, duration: 1, ease: "power3.inOut" });
}

/**
 * Entrada de una seccion, en orden de lectura: primero cada linea de los titulares [data-lines] sube
 * desde su mascara (.line-mask > span), despues los elementos [data-reveal] en cascada (texto, luego imagen).
 * Solo transform y opacity; llamar dentro de gsap.matchMedia(CON_MOVIMIENTO) para que sin movimiento
 * el contenido se vea de entrada.
 */
export function revealSection(root: Element) {
  gsap.utils.toArray<HTMLElement>("[data-lines]", root).forEach((head) => {
    gsap.from(head.querySelectorAll(".line-mask > span"), {
      yPercent: 108,
      duration: 0.9,
      stagger: 0.11,
      ease: "power4.out",
      scrollTrigger: { trigger: head, start: "top 88%", once: true },
    });
  });

  // Un disparador por elemento: cada parte entra cuando llega a la pantalla, en orden de lectura.
  gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 28,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });
}
