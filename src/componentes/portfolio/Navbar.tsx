"use client";

import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { CON_MOVIMIENTO, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToId } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { LangSwitch, ThemeToggle } from "./Controls";
import { CONTACT } from "@/content/translations";

// En el orden en que aparecen en la pagina. Contacto va aparte como la accion de la barra.
const SECTION_IDS = ["about", "skills", "work", "career", "stack"] as const;
type SectionId = (typeof SECTION_IDS)[number] | "contact";

export function Navbar() {
  const { t } = useI18n();
  const [active, setActive] = useState<SectionId | null>(null);
  const [onHero, setOnHero] = useState(true);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Seccion activa, tono de la barra y ocultar al bajar: todo con ScrollTrigger, sin listeners de scroll.
  useGSAP(() => {
    const ids: SectionId[] = [...SECTION_IDS, "contact"];
    const triggers = ids.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(id),
      }),
    );
    const hero = ScrollTrigger.create({
      trigger: "#top",
      start: "top top",
      end: "bottom 64px",
      onToggle: (self) => {
        setOnHero(self.isActive);
        if (self.isActive) setActive(null);
      },
    });

    // Fuera del hero, la barra se esconde al bajar y vuelve al subir: deja leer sin perder la navegacion.
    const mm = gsap.matchMedia();
    mm.add(CON_MOVIMIENTO, () => {
      const hide = gsap.to(headerRef.current, { yPercent: -100, duration: 0.35, ease: "power2.out", paused: true });
      const st = ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const pastHero = self.scroll() > window.innerHeight * 0.9;
          if (self.direction === 1 && pastHero) hide.play();
          else hide.reverse();
        },
      });
      return () => st.kill();
    });

    return () => {
      triggers.forEach((s) => s.kill());
      hero.kill();
      mm.revert();
    };
  }, []);

  // Cierre con Escape, bloqueo de scroll y foco al abrir el menu movil.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const btn = menuBtnRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      btn?.focus();
    };
  }, [open]);

  // Entrada del menu movil: el panel baja y los enlaces suben desde su mascara, uno tras otro.
  useGSAP(
    () => {
      if (!open || !drawerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        gsap.from(drawerRef.current, { yPercent: -100, duration: 0.5, ease: "power4.out" });
        gsap.from("[data-drawer-link] > a > span", { yPercent: 110, duration: 0.7, stagger: 0.06, ease: "power4.out", delay: 0.15 });
      });
      return () => mm.revert();
    },
    { dependencies: [open], scope: drawerRef, revertOnUpdate: true },
  );

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  const links = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));
  const tone = onHero ? "bg-transparent text-white" : "bg-canvas text-ink";

  return (
    <>
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-nav transition-colors duration-300 ${tone}`}>
        <nav aria-label="Principal" className="flex h-16 items-center justify-between gap-6 px-5 md:px-8">
          <a href="#top" onClick={go("top")} className="whitespace-nowrap font-display text-xl uppercase leading-none md:text-2xl">
            Carlos Barrera
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={`link-draw py-1 text-small font-semibold ${active === id ? (onHero ? "text-accent" : "text-accent-text") : ""}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-2">
            <LangSwitch />
            <ThemeToggle />
            <a href="#contact" onClick={go("contact")} className="btn ml-2 hidden min-h-11 px-5 text-small sm:inline-flex">
              {t.nav.cta}
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.ui.menu}
              aria-expanded={open}
              className="grid size-11 place-items-center active:scale-90 lg:hidden"
            >
              <List size={24} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.ui.menu}
          className="fixed inset-0 z-drawer flex flex-col bg-field px-5 pb-8 text-field-ink md:px-8"
        >
          <div className="flex h-16 items-center justify-between">
            <span className="font-display text-2xl uppercase leading-none">Carlos Barrera</span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.ui.close}
              className="grid size-11 place-items-center active:scale-90"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-8 flex flex-1 flex-col gap-2">
            {[...links, { id: "contact", label: t.nav.contact }].map(({ id, label }) => (
              <li key={id} data-drawer-link className="overflow-clip">
                <a href={`#${id}`} onClick={go(id)} className="block py-1 font-display text-[13vw] uppercase leading-[0.95] sm:text-7xl">
                  <span className={`block ${active === id ? "text-accent" : ""}`}>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1 text-body">
            <a href={`mailto:${CONTACT.email}`} className="font-semibold">{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="text-field-muted">{CONTACT.phone}</a>
          </div>
        </div>
      )}
    </>
  );
}
