"use client";

import { forwardRef } from "react";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

/** Contenedor comun: ancho maximo, gutter de 20px en movil y ritmo vertical amplio. */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section({ id, children, className = "" }, ref) {
  return (
    <section id={id} ref={ref} className={`scroll-mt-16 px-5 py-24 md:px-8 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
});

/** Titulo de seccion con barra de acento que se dibuja al entrar (data-bar). */
export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 data-reveal className="max-w-[18ch] text-3xl font-extrabold leading-[1.1] tracking-tight text-ink md:text-5xl">
        {children}
      </h2>
      <span data-bar aria-hidden="true" className="mt-4 block h-2 w-20 rounded-full border-2 border-outline bg-accent" />
    </div>
  );
}
