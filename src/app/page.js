"use client";

import { useState, useEffect, useRef } from "react";
import { I18nProvider, useI18n, LangSwitch } from "@/componentes/portfolio/I18nProvider";
import { About, Skills, Career, Work, TechStack, Contact } from "@/componentes/portfolio/Sections";
import gsap from "gsap";

const DARK_PALETTE  = { cyan: "#5EEAD4", magenta: "#F472B6", bg: "#07070C" };
const LIGHT_PALETTE = { cyan: "#C7522A", magenta: "#2E7D6B", bg: "#F5F1EA" };

// ── Custom cursor ────────────────────────────────────────────────────────────
function CustomCursor({ enabled, accent }) {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const targetRef  = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
      setHovering(!!(e.target.closest && e.target.closest("a,button,.interactive")));
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const tick = () => {
      const t = targetRef.current, p = ringPosRef.current;
      p.x += (t.x - p.x) * 0.18;
      p.y += (t.y - p.y) * 0.18;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${p.x}px,${p.y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef}  className="cb-cursor-dot"  style={{ background: accent }} />
      <div ref={ringRef} className={"cb-cursor-ring" + (hovering ? " hover" : "")} style={{ borderColor: accent }} />
    </>
  );
}

// ── SVG photo filters ────────────────────────────────────────────────────────
function PhotoFilters({ cyan, magenta }) {
  const hex = (h) => {
    const n = h.replace("#", "");
    return [parseInt(n.slice(0,2),16)/255, parseInt(n.slice(2,4),16)/255, parseInt(n.slice(4,6),16)/255];
  };
  const [cR,cG,cB] = hex(cyan);
  const [mR,mG,mB] = hex(magenta);
  return (
    <svg width="0" height="0" style={{ position:"absolute" }}>
      <defs>
        <filter id="cb-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={`${mR} ${cR}`} />
            <feFuncG type="table" tableValues={`${mG} ${cG}`} />
            <feFuncB type="table" tableValues={`${mB} ${cB}`} />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}

// ── Portrait stage ───────────────────────────────────────────────────────────
function PortraitStage({ isDark, cyan, magenta, parallax }) {
  const { t: tr } = useI18n();
  const maskGradient = "radial-gradient(ellipse 78% 68% at 50% 42%, #000 58%, rgba(0,0,0,.85) 70%, transparent 88%)";
  const px = parallax.x * 16, py = parallax.y * 16;

  return (
    <div
      className="relative w-full animate-fade-up"
      style={{ aspectRatio: "1 / 1.05", maxWidth: "min(640px, 95%)", transform: `translate(${px}px,${py}px)` }}
    >
      {/* Orbs */}
      <div className="absolute w-[75%] aspect-square rounded-full pointer-events-none animate-drift-1"
        style={{ top: "10%", left: "-5%", filter: isDark ? "blur(60px)" : "blur(44px)",
          opacity: isDark ? 1 : 0.95,
          background: `radial-gradient(circle,${cyan}cc 0%,${cyan}00 65%)` }} />
      <div className="absolute w-[75%] aspect-square rounded-full pointer-events-none animate-drift-2"
        style={{ bottom: "8%", right: "-5%", filter: isDark ? "blur(60px)" : "blur(44px)",
          opacity: isDark ? 1 : 0.95,
          background: `radial-gradient(circle,${magenta}cc 0%,${magenta}00 65%)` }} />

      {/* Rings — centered with top/left 50% + translate */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]"
          style={{ borderColor: isDark ? `${cyan}66` : "rgba(27,34,64,0.28)" }} />
        <div className="absolute rounded-full border-dashed border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[74%] h-[74%]"
          style={{ borderColor: isDark ? `${magenta}55` : "rgba(27,34,64,0.22)" }} />
        <div className="absolute rounded-full border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[106%] h-[106%]"
          style={{ borderColor: isDark ? `${cyan}33` : "rgba(27,34,64,0.14)" }} />
      </div>

      {/* Arc SVG — dark only */}
      {isDark && (
        <svg className="absolute w-[92%] h-[92%] inset-0 m-auto pointer-events-none animate-spin-slow"
          viewBox="0 0 600 600" aria-hidden="true">
          <defs>
            <linearGradient id="cb-arc-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor={cyan}    stopOpacity="0.9" />
              <stop offset="100%" stopColor={magenta} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="300" r="245" fill="none" stroke="url(#cb-arc-grad)"
            strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
        </svg>
      )}

      {/* Photo */}
      <div
        className={[
          "relative w-[64%] aspect-square overflow-hidden z-10 mx-auto photo-mask",
          "top-1/2 -translate-y-1/2",
          isDark
            ? "rounded-full bg-[#111118] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_rgba(0,0,0,0.5)]"
            : "rounded-full bg-[#EDE9E0] shadow-[0_0_0_1px_rgba(27,34,64,0.1),0_30px_80px_rgba(27,34,64,0.18)]",
        ].join(" ")}
        style={{ WebkitMaskImage: maskGradient, maskImage: maskGradient }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/carlos.jpg"
          alt="Carlos Barrera Acuña"
          className="absolute inset-0 w-full h-full object-cover object-[50%_30%]"
          style={{ transform: `translate(${-px * 0.4}px,${-py * 0.4}px)` }}
        />
      </div>

      {/* Chips */}
      <div className={[
        "absolute flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-widest",
        "border backdrop-blur-md animate-chip-in-1",
        isDark ? "bg-[#07070C]/60 border-white/10" : "bg-white/70 border-[rgba(27,34,64,0.12)]",
      ].join(" ")}
        style={{ top: "6%", left: "-6%", borderColor: `${cyan}55`, color: cyan }}>
        <span className="w-1.5 h-1.5 rounded-full animate-blink-dot" style={{ background: cyan }} />
        {tr.hero.available}
      </div>

      <div className={[
        "absolute flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-widest",
        "border backdrop-blur-md animate-chip-in-2",
        isDark ? "bg-[#07070C]/60 border-white/10" : "bg-white/70 border-[rgba(27,34,64,0.12)]",
      ].join(" ")}
        style={{ bottom: "12%", right: "-8%", borderColor: `${magenta}55`, color: magenta }}>
        <span className="w-1.5 h-1.5 rounded-full animate-blink-dot" style={{ background: magenta }} />
        {tr.hero.timezone}
      </div>

      <div className={[
        "absolute flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-widest",
        "border backdrop-blur-md animate-chip-in-3",
        isDark ? "bg-[#07070C]/60 text-white/70 border-white/18" : "bg-white/70 text-[rgba(27,34,64,0.6)] border-[rgba(27,34,64,0.12)]",
      ].join(" ")}
        style={{ top: "50%", right: "-18%" }}>
        {tr.hero.experience}
      </div>
    </div>
  );
}

// ── Theme toggle ─────────────────────────────────────────────────────────────
function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      className={[
        "interactive w-9 h-9 rounded-full flex items-center justify-center text-sm",
        "transition-colors duration-200",
        isDark
          ? "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
          : "border border-[rgba(27,34,64,0.18)] bg-transparent text-[rgba(27,34,64,0.6)] hover:bg-[rgba(27,34,64,0.06)]",
      ].join(" ")}
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}

// ── Inner app (needs i18n context) ───────────────────────────────────────────
function Portfolio() {
  const { t: tr } = useI18n();

  const [isDark, setIsDark] = useState(true);
  const [palette, setPalette] = useState(DARK_PALETTE);
  const [mounted, setMounted] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerRef       = useRef(null);
  const drawerLinksRef  = useRef([]);
  const drawerCtrlRef   = useRef(null);
  const drawerFootRef   = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cb-theme");
      const dark = saved !== "light";
      setIsDark(dark);
      setPalette(dark ? DARK_PALETTE : LIGHT_PALETTE);
      document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    } catch {}
    setTime(new Date());
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onMove = (e) => setParallax({
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setDrawerOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    if (drawerOpen) {
      gsap.set(el, { display: "flex", x: "100%" });
      const tl = gsap.timeline();
      tl.to(el, { x: "0%", duration: 0.45, ease: "power3.out" })
        .from(drawerCtrlRef.current, { autoAlpha: 0, y: -8, duration: 0.3, ease: "power2.out" }, "-=0.2")
        .from(drawerLinksRef.current.filter(Boolean), { x: 40, autoAlpha: 0, duration: 0.35, ease: "power2.out", stagger: 0.06 }, "-=0.15")
        .from(drawerFootRef.current, { autoAlpha: 0, y: 10, duration: 0.3, ease: "power2.out" }, "-=0.2");
    } else {
      gsap.to(el, { x: "100%", duration: 0.35, ease: "power2.in", onComplete: () => gsap.set(el, { display: "none" }) });
    }
  }, [drawerOpen]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    setPalette(next ? DARK_PALETTE : LIGHT_PALETTE);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try { localStorage.setItem("cb-theme", next ? "dark" : "light"); } catch {}
  };

  const closeDrawer = () => setDrawerOpen(false);
  const timeStr = time
    ? time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
    : "--:--";

  const { cyan, magenta } = palette;

  // Shared class shorthands
  const navLinkBase = isDark
    ? "text-white/70 hover:text-white"
    : "text-[rgba(27,34,64,0.65)] hover:text-[#1B2240]";

  return (
    <div className={[
      "relative min-h-screen transition-colors duration-500",
      isDark ? "bg-[#07070C] text-white" : "bg-[#F5F1EA] text-[#1B2240]",
      mounted ? "opacity-100" : "opacity-0",
      "transition-opacity duration-500",
    ].join(" ")}>
      <PhotoFilters cyan={cyan} magenta={magenta} />

      {/* Noise */}
      <div className="noise-layer" aria-hidden="true" />
      {/* Vignette */}
      {isDark && <div className="vignette" aria-hidden="true" />}

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className={[
        "fixed top-0 inset-x-0 z-[100]",
        "grid items-center gap-4 px-5 lg:px-8 h-16",
        "grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_1fr_auto_auto_auto]",
        "backdrop-blur-xl border-b",
        isDark
          ? "bg-[#07070C]/80 border-white/5"
          : "bg-[#F5F1EA]/82 border-[rgba(27,34,64,0.08)]",
      ].join(" ")}>

        {/* Mark / Logo */}
        <div className={[
          "interactive relative flex items-center gap-2 px-3 py-1.5 rounded-full",
          "text-xs font-mono tracking-[0.18em] border cursor-pointer",
          isDark
            ? "border-white/10 text-white/80 bg-white/5 hover:bg-white/8"
            : "border-[rgba(27,34,64,0.15)] text-[#1B2240] font-fraunces font-semibold",
        ].join(" ")}>
          <span>{isDark ? "CB" : "Carlos B."}</span>
          <span className="w-1.5 h-1.5 rounded-full animate-blink-dot" style={{ background: isDark ? cyan : magenta }} />
        </div>

        {/* Email */}
        <a href="mailto:carlos.barreraacuna@gmail.com"
          className={[
            "interactive hidden lg:flex items-center gap-2 text-xs font-mono tracking-wide",
            "justify-self-center transition-colors duration-200",
            isDark ? "text-white/55 hover:text-white/90" : "text-[rgba(27,34,64,0.5)] hover:text-[rgba(27,34,64,0.9)]",
          ].join(" ")}>
          <span style={{ color: isDark ? cyan : magenta }}>✦</span>
          carlos.barreraacuna@gmail.com
        </a>

        {/* Nav links */}
        <nav className={[
          "hidden lg:flex items-center gap-6 text-[13px] tracking-wide",
          isDark ? "font-space" : "font-inter",
        ].join(" ")}>
          {[["#about", tr.nav.about], ["#skills", tr.nav.skills], ["#career", tr.nav.career], ["#work", tr.nav.work], ["#contact", tr.nav.contact]].map(([href, label]) => (
            <a key={href} href={href} className={["interactive transition-colors duration-200 relative group", navLinkBase].join(" ")}>
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: cyan }} />
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="hidden lg:flex items-center gap-2">
          <LangSwitch accent={cyan} isDark={isDark} />
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        {/* Burger */}
        <button
          type="button"
          className={[
            "lg:hidden interactive relative w-10 h-10 rounded-full flex items-center justify-center border",
            isDark
              ? "border-white/10 bg-white/5"
              : "border-[rgba(27,34,64,0.15)] bg-[rgba(255,255,255,0.7)]",
          ].join(" ")}
          aria-label="Menu"
          onClick={() => setDrawerOpen((o) => !o)}
        >
          <div className="flex flex-col gap-[5px] w-5">
            <span className={["h-px w-full transition-all duration-300", isDark ? "bg-white/80" : "bg-[#1B2240]",
              drawerOpen ? "rotate-45 translate-y-[7px]" : ""].join(" ")} />
            <span className={["h-px w-full transition-all duration-300", isDark ? "bg-white/80" : "bg-[#1B2240]",
              drawerOpen ? "opacity-0" : ""].join(" ")} />
            <span className={["h-px w-full transition-all duration-300", isDark ? "bg-white/80" : "bg-[#1B2240]",
              drawerOpen ? "-rotate-45 -translate-y-[7px]" : ""].join(" ")} />
          </div>
        </button>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        className={[
          "fixed inset-0 z-[200] lg:hidden flex-col px-7 pt-20 pb-8",
          isDark ? "bg-[#07070C]" : "bg-[#F5F1EA]",
        ].join(" ")}
        style={{ display: "none" }}
        onClick={(e) => { if (e.target === e.currentTarget) closeDrawer(); }}
      >
        <div ref={drawerCtrlRef}
          className={["flex items-center gap-3 pb-5 mb-5 border-b", isDark ? "border-white/7" : "border-[rgba(27,34,64,0.1)]"].join(" ")}>
          <LangSwitch accent={cyan} isDark={isDark} />
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        <nav className="flex flex-col gap-1">
          {[["#about", tr.nav.about, "01"], ["#skills", tr.nav.skills, "02"], ["#career", tr.nav.career, "03"], ["#work", tr.nav.work, "04"], ["#contact", tr.nav.contact, "05"]].map(([href, label, num], i) => (
            <a key={href} href={href} onClick={closeDrawer}
              ref={(el) => (drawerLinksRef.current[i] = el)}
              className={[
                "flex justify-between items-center py-4 text-2xl border-b tracking-tight",
                isDark
                  ? "font-space border-white/7 text-white/80 hover:text-white"
                  : "font-fraunces border-[rgba(27,34,64,0.08)] text-[#1B2240]/75 hover:text-[#1B2240]",
                "transition-colors duration-200",
              ].join(" ")}>
              {label}
              <span className={["text-xs font-mono", isDark ? "text-white/30" : "text-[rgba(27,34,64,0.3)]"].join(" ")}>{num}</span>
            </a>
          ))}
        </nav>

        <div ref={drawerFootRef}
          className={["mt-auto flex flex-col gap-1 text-sm font-mono", isDark ? "text-white/40" : "text-[rgba(27,34,64,0.4)]"].join(" ")}>
          <span>carlos.barreraacuna@gmail.com</span>
          <a href="tel:+573013502893" style={{ color: cyan }}>+57 301 350 2893</a>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <main className={[
        "relative z-[2] grid items-center gap-8 px-5 lg:px-10 pt-28 pb-10 min-h-screen",
        "grid-cols-1 lg:grid-cols-hero",
      ].join(" ")}>

        {/* LEFT — name */}
        <div className={["flex flex-col gap-4 lg:items-start items-center text-center lg:text-left z-[3]",
          mounted ? "animate-slide-left" : "opacity-0"].join(" ")}>
          <div className={["flex items-center gap-3 text-xs font-mono tracking-[0.18em]", isDark ? "italic" : "not-italic uppercase"].join(" ")}
            style={{ color: cyan }}>
            <span className="w-7 h-px" style={{ background: cyan }} />
            {tr.hero.hello}
          </div>

          <h1 className={[
            "leading-none tracking-tight",
            isDark
              ? "font-space font-bold text-[clamp(42px,6vw,86px)] text-white"
              : "font-fraunces font-bold text-[clamp(38px,5.5vw,76px)] text-[#1B2240]",
          ].join(" ")}>
            <span className="block">CARLOS</span>
            <span className="block">BARRERA</span>
            <span className="block" style={isDark ? {} : { color: cyan, fontStyle: "italic" }}>ACUÑA</span>
          </h1>

          <div className={["flex flex-col gap-1.5 text-[11px] font-mono tracking-[0.12em] mt-2",
            isDark ? "text-white/55" : "text-[rgba(27,34,64,0.5)]"].join(" ")}>
            <div className="flex gap-3">
              <span className={isDark ? "text-white/35" : "text-[rgba(27,34,64,0.35)]"}>{tr.hero.local}</span>
              <span>{tr.hero.localValue} · {timeStr}</span>
            </div>
            <div className="flex gap-3">
              <span className={isDark ? "text-white/35" : "text-[rgba(27,34,64,0.35)]"}>{tr.hero.focus}</span>
              <span>{tr.hero.focusValue}</span>
            </div>
          </div>
        </div>

        {/* CENTER — portrait */}
        <div className="flex items-center justify-center relative overflow-visible z-[1] lg:z-[1] self-stretch">
          <PortraitStage isDark={isDark} cyan={cyan} magenta={magenta} parallax={parallax} />
        </div>

        {/* RIGHT — tagline */}
        <div className={[
          "flex flex-col gap-2 items-center lg:items-end text-center lg:text-right z-[3]",
          mounted ? "animate-slide-right" : "opacity-0",
        ].join(" ")}>
          <span className={[
            "text-xs font-mono tracking-[0.18em]",
            isDark ? "italic" : "not-italic uppercase tracking-[0.22em]",
          ].join(" ")} style={{ color: cyan }}>
            {tr.hero.tagline}
          </span>

          {isDark ? (
            <span className={[
              "font-space font-bold tracking-tight leading-none",
              "text-[clamp(32px,4.5vw,68px)]",
              "relative text-transparent bg-clip-text",
            ].join(" ")}
              style={{ WebkitTextStroke: `1.5px ${magenta}`, textShadow: `0 0 80px ${magenta}55` }}>
              {tr.hero.taglineAccent}
            </span>
          ) : (
            <span className="tag-strike font-fraunces font-bold tracking-tight leading-none text-[clamp(30px,4.2vw,62px)]"
              style={{ color: `${magenta}88` }}>
              {tr.hero.taglineAccent}
            </span>
          )}

          <span className={[
            "font-bold tracking-tight leading-none",
            "text-[clamp(36px,5vw,76px)]",
            isDark ? "font-space text-white" : "font-fraunces text-[#1B2240]",
          ].join(" ")}>
            {tr.hero.taglineMain}
          </span>

          <div className={["flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono mt-2 justify-center lg:justify-end",
            isDark ? "text-white/55" : "text-[rgba(27,34,64,0.45)] tracking-[0.08em]"].join(" ")}>
            {["Laravel","·","Next.js","·","React","·","Node.js","·","NestJS","·","PostgreSQL","·","Python","·","TypeScript","·","Tailwind","·","OAuth 2.0"].map((item, i) => <span key={i}>{item}</span>)}
          </div>
        </div>
      </main>

      {/* ── Footer strip ───────────────────────────────────────────────── */}
      <footer className={[
        "relative z-[2] grid grid-cols-3 items-center px-8 py-4 text-[11px] font-mono tracking-widest",
        "border-t",
        isDark ? "border-white/5 text-white/45" : "border-[rgba(27,34,64,0.1)] text-[rgba(27,34,64,0.5)]",
      ].join(" ")}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-blink-dot" style={{ background: isDark ? cyan : magenta }} />
          {tr.foot.open}
        </div>

        <div className="flex items-center justify-center gap-3">
          <span>{tr.foot.scroll}</span>
          <svg width="36" height="10" viewBox="0 0 36 10">
            <path d="M0 5 H30 M26 1 L30 5 L26 9" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="flex items-center justify-end gap-4">
          <a href="https://linkedin.com/in/carlos-barrera-acuna" target="_blank" rel="noreferrer"
            className="interactive transition-opacity hover:opacity-75 active:scale-95">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6 object-contain rounded-md" />
          </a>
          <a href="https://github.com/cbarrerac" target="_blank" rel="noreferrer"
            className="interactive transition-opacity hover:opacity-75 active:scale-95">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/github.png" alt="GitHub"
              className={["w-6 h-6 object-contain rounded-md", isDark ? "invert" : ""].join(" ")} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"
            className="interactive transition-opacity hover:opacity-75 active:scale-95">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/instagram.png" alt="Instagram" className="w-6 h-6 object-contain rounded-full" />
          </a>
        </div>
      </footer>

      {/* ── Sections ───────────────────────────────────────────────────── */}
      <About    accent={cyan} isDark={isDark} />
      <Skills   accent={cyan} magenta={magenta} isDark={isDark} />
      <Career   accent={cyan} magenta={magenta} isDark={isDark} />
      <Work     accent={cyan} magenta={magenta} isDark={isDark} />
      <TechStack accent={cyan} magenta={magenta} isDark={isDark} />
      <Contact  accent={cyan} magenta={magenta} isDark={isDark} />

      <CustomCursor enabled={isDark} accent={cyan} />
    </div>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <Portfolio />
    </I18nProvider>
  );
}
