"use client";

import { useRef } from "react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { scrollToId } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { CONTACT } from "@/content/translations";

const SECTIONS = ["about", "skills", "work", "career", "stack", "contact"] as const;

/** Cierre: el nombre a todo el ancho abre el pie, y debajo las formas de contacto y los enlaces. */
export function Footer() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        // Las letras del nombre suben con el scroll mientras el pie entra en pantalla.
        gsap.from(".footer-char", {
          yPercent: 100,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 35%", scrub: 0.6 },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer ref={root} className="bg-field px-5 pb-8 pt-16 text-field-ink md:px-8 md:pt-20">
      <p aria-hidden="true" className="overflow-clip whitespace-nowrap font-display text-[11.6vw] uppercase leading-[0.9]">
        {"Carlos Barrera".split("").map((c, i) => (
          <span key={i} className="footer-char inline-block whitespace-pre">
            {c}
          </span>
        ))}
      </p>

      <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="text-small text-field-muted">{t.footer.reach}</h2>
          <ul className="mt-4 flex flex-col gap-2 text-lead text-accent">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="link-draw break-all">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="link-draw">
                {CONTACT.phone}
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:col-start-8">
          <div>
            <h2 className="text-small text-field-muted">{t.footer.sections}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-body">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={go(id)} className="link-draw">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-small text-field-muted">{t.footer.social}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-body">
              <li>
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer noopener" className="link-draw">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={CONTACT.github} target="_blank" rel="noreferrer noopener" className="link-draw">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-between gap-6 text-small text-field-muted md:mt-24">
        <p>{t.footer.legal}</p>
        <a href="#top" onClick={go("top")} className="link-draw">
          {t.footer.top}
        </a>
      </div>
    </footer>
  );
}
