"use client";

import { gsap, ScrollTrigger, SIN_MOVIMIENTO } from "@/lib/gsap";

const NAV_OFFSET = 64;

/** Desplazamiento suave a una seccion. Con movimiento reducido salta directo. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.matchMedia(SIN_MOVIMIENTO).matches) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET });
    return;
  }
  gsap.to(window, { scrollTo: { y: el, offsetY: NAV_OFFSET }, duration: 0.9, ease: "power3.inOut" });
}

/**
 * Revela en cascada los elementos [data-reveal] de un contenedor al entrar al viewport.
 * Solo anima transform y opacity. Llamar dentro de gsap.matchMedia(CON_MOVIMIENTO).
 */
export function revealOnScroll(root: Element, selector = "[data-reveal]") {
  const targets = gsap.utils.toArray<HTMLElement>(selector, root);
  if (!targets.length) return;
  gsap.set(targets, { autoAlpha: 0, y: 24 });
  ScrollTrigger.batch(targets, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "back.out(1.4)", stagger: 0.08, overwrite: true }),
  });

  // Barras de acento bajo los titulos: se dibujan de izquierda a derecha al entrar.
  gsap.utils.toArray<HTMLElement>("[data-bar]", root).forEach((bar) => {
    gsap.from(bar, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.7,
      delay: 0.15,
      ease: "back.out(2)",
      scrollTrigger: { trigger: bar, start: "top 90%", once: true },
    });
  });
}
