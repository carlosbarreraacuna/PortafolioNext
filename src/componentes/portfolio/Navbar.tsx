"use client";

import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { CON_MOVIMIENTO, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToId } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { LangSwitch, ThemeToggle } from "./Controls";
import { CONTACT } from "@/content/translations";

const SECTION_IDS = ["about", "skills", "career", "work", "stack", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export function Navbar() {
  const { t } = useI18n();
  const [active, setActive] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Seccion activa y fondo de la barra: se resuelven con ScrollTrigger, sin listeners de scroll.
  useGSAP(() => {
    const triggers = SECTION_IDS.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(id);
        },
      }),
    );
    const top = ScrollTrigger.create({
      start: 8,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    const hero = ScrollTrigger.create({
      trigger: "#top",
      start: "top top",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) setActive(null);
      },
    });
    return () => {
      triggers.forEach((s) => s.kill());
      top.kill();
      hero.kill();
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

  // Entrada del menu movil: el panel y sus enlaces aparecen en secuencia.
  useGSAP(
    () => {
      if (!open || !drawerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        gsap.from(drawerRef.current, { autoAlpha: 0, duration: 0.25, ease: "power2.out" });
        gsap.from("[data-drawer-link]", { x: 32, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: "power3.out", delay: 0.05 });
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

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-nav border-b-2 transition-colors duration-300",
          scrolled ? "border-outline bg-canvas/90 backdrop-blur-md" : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav aria-label="Principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
          <a
            href="#top"
            onClick={go("top")}
            aria-hidden={!scrolled}
            tabIndex={scrolled ? 0 : -1}
            className={[
              "font-display text-lg font-extrabold tracking-tight transition-opacity duration-300",
              scrolled ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
          >
            Carlos Barrera
          </a>

          <ul
            aria-hidden={!scrolled}
            className={[
              "hidden items-center gap-1 transition-opacity duration-300 lg:flex",
              scrolled ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
          >
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  tabIndex={scrolled ? 0 : -1}
                  aria-current={active === id ? "true" : undefined}
                  className={[
                    "relative block rounded-control px-3 py-2 text-sm font-semibold transition-colors duration-200",
                    active === id ? "text-ink" : "text-muted hover:text-ink",
                  ].join(" ")}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-x-3 bottom-0 h-1 origin-left rounded-full bg-accent transition-transform duration-300",
                      active === id ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={go("contact")}
              tabIndex={scrolled ? -1 : 0}
              aria-hidden={scrolled}
              className={[
                "hidden rounded-control px-3 py-2 text-sm font-semibold text-white/85 transition duration-300 hover:text-white lg:block",
                scrolled ? "pointer-events-none opacity-0" : "opacity-100",
              ].join(" ")}
            >
              {t.nav.contact}
            </a>
            <LangSwitch />
            <ThemeToggle />
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.ui.menu}
              aria-expanded={open}
              className="toon-btn grid size-10 place-items-center bg-surface text-ink lg:hidden"
            >
              <List size={20} aria-hidden="true" />
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
          className="fixed inset-0 z-drawer flex flex-col bg-canvas px-5 py-4 md:px-8"
        >
          <div className="flex h-12 items-center justify-between">
            <span className="font-display text-base font-bold tracking-tight">Carlos Barrera</span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.ui.close}
              className="toon-btn grid size-10 place-items-center bg-surface text-ink"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-10 flex flex-1 flex-col gap-1">
            {links.map(({ id, label }) => (
              <li key={id} data-drawer-link>
                <a href={`#${id}`} onClick={go(id)} className="block rounded-control py-3 font-display text-4xl font-bold tracking-tight text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href={CONTACT.phoneHref} className="py-4 text-lg font-bold text-accent-text">
            {CONTACT.phone}
          </a>
        </div>
      )}
    </>
  );
}
