"use client";

import { useRef, useState, useEffect } from "react";
import { useI18n } from "./I18nProvider";
import gsap from "gsap";

function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); obs.unobserve(e.target); } }),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, shown];
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, isDark, children }) {
  return (
    <section id={id} className={[
      "relative px-5 md:px-10 py-28 md:py-36",
      isDark ? "border-t border-white/5" : "border-t border-[rgba(27,34,64,0.07)]",
    ].join(" ")}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ index, kicker, title, accent, isDark }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={["flex flex-col gap-2 mb-14 md:mb-20 transition-all duration-700",
      shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"].join(" ")}>
      <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.22em] uppercase" style={{ color: accent }}>
        <span className="w-7 h-px" style={{ background: accent }} />
        {kicker}
      </div>
      <div className="flex items-baseline gap-4">
        <span className={["font-mono text-xs pt-1", isDark ? "text-white/30" : "text-[rgba(27,34,64,0.3)]"].join(" ")}>{index}</span>
        <h2 className={[
          "leading-tight tracking-tight",
          isDark ? "font-space font-bold text-4xl md:text-5xl text-white" : "font-fraunces font-bold text-4xl md:text-5xl text-[#1B2240]",
        ].join(" ")}>{title}</h2>
      </div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
export function About({ accent, isDark }) {
  const { t: tr } = useI18n();
  const [ref, shown] = useReveal(0.2);
  const ab = tr.about;

  return (
    <Section id="about" isDark={isDark}>
      <SectionHeader index="01" kicker={tr.sections.about.kicker} title={tr.sections.about.title} accent={accent} isDark={isDark} />
      <div ref={ref} className={["grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 transition-all duration-700",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>

        {/* Copy */}
        <div className={["flex flex-col gap-5 text-base leading-relaxed",
          isDark ? "font-space text-white/75" : "font-inter text-[rgba(27,34,64,0.7)]"].join(" ")}>
          <p className={["text-lg font-medium leading-snug", isDark ? "text-white/90" : "text-[#1B2240]"].join(" ")}>{ab.lead}</p>
          <p>{ab.p2}</p>
          <p>{ab.p3}</p>
        </div>

        {/* Side */}
        <div className="flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {ab.stats.map((s) => (
              <div key={s.lbl} className="flex flex-col gap-1">
                <div className={["text-2xl font-bold leading-none", isDark ? "font-space text-white" : "font-fraunces text-[#1B2240]"].join(" ")}>{s.num}</div>
                <div className={["text-[10px] font-mono tracking-widest", isDark ? "text-white/40" : "text-[rgba(27,34,64,0.45)]"].join(" ")}>{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Info card */}
          <div className={["rounded-xl p-5 flex flex-col gap-3 border",
            isDark
              ? "bg-white/[0.03] border-white/8"
              : "bg-[rgba(27,34,64,0.03)] border-[rgba(27,34,64,0.1)]"].join(" ")}>
            {ab.info.map((row, idx) => (
              <div key={row.k} className="flex justify-between items-center gap-2 text-sm">
                <span className={["font-mono text-[10px] tracking-widest", isDark ? "text-white/35" : "text-[rgba(27,34,64,0.4)]"].join(" ")}>{row.k}</span>
                <b className={["font-medium text-right", isDark
                  ? idx === ab.info.length - 1 ? "" : "text-white/80 font-space"
                  : idx === ab.info.length - 1 ? "" : "text-[#1B2240] font-inter"].join(" ")}
                  style={idx === ab.info.length - 1 ? { color: accent } : {}}>
                  {row.v}
                </b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function SkillCard({ card, index, accent, magenta, isDark }) {
  const [ref, shown] = useReveal();
  const c = index % 2 ? magenta : accent;
  return (
    <article ref={ref}
      className={["relative rounded-2xl p-6 border flex flex-col gap-4 overflow-hidden transition-all duration-700",
        isDark ? "bg-white/[0.025] border-white/8 hover:border-white/14" : "bg-white/60 border-[rgba(27,34,64,0.1)] hover:border-[rgba(27,34,64,0.2)]",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ")}
      style={{ transitionDelay: shown ? `${index * 90}ms` : "0ms" }}>

      <div className={["text-xs font-mono tracking-widest", isDark ? "text-white/30" : "text-[rgba(27,34,64,0.35)]"].join(" ")} style={{ color: c }}>0{index + 1}</div>
      <h3 className={["text-lg font-bold leading-tight", isDark ? "font-space text-white" : "font-fraunces text-[#1B2240]"].join(" ")}>{card.t}</h3>
      <p className={["text-sm leading-relaxed flex-1", isDark ? "text-white/60 font-space" : "text-[rgba(27,34,64,0.65)] font-inter"].join(" ")}>{card.d}</p>
      <div className="flex flex-wrap gap-2">
        {card.items.map((it) => (
          <span key={it} className={["text-[10px] font-mono px-2.5 py-1 rounded-full tracking-wider border",
            isDark ? "border-white/12 text-white/55 bg-white/5" : "border-[rgba(27,34,64,0.15)] text-[rgba(27,34,64,0.6)] bg-[rgba(27,34,64,0.04)]"].join(" ")}>
            {it}
          </span>
        ))}
      </div>

      {/* Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 20%,${c}18,transparent 60%)` }} />
    </article>
  );
}

export function Skills({ accent, magenta, isDark }) {
  const { t: tr } = useI18n();
  return (
    <Section id="skills" isDark={isDark}>
      <SectionHeader index="02" kicker={tr.sections.skills.kicker} title={tr.sections.skills.title} accent={accent} isDark={isDark} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tr.skills.map((card, i) => (
          <SkillCard key={i} card={card} index={i} accent={accent} magenta={magenta} isDark={isDark} />
        ))}
      </div>
    </Section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────
function CareerItem({ item, index, accent, magenta, isDark }) {
  const [ref, shown] = useReveal(0.25);
  const c = index % 2 ? magenta : accent;
  return (
    <div ref={ref} className={["relative pl-8 pb-12 last:pb-0 transition-all duration-700",
      shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ")}>
      {/* Dot */}
      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 z-10"
        style={{ background: c, borderColor: isDark ? "#07070C" : "#F5F1EA" }} />
      {/* Line */}
      <div className={["absolute left-[5px] top-4 bottom-0 w-px", isDark ? "bg-white/10" : "bg-[rgba(27,34,64,0.1)]"].join(" ")} />

      <div className={["text-[10px] font-mono tracking-widest mb-3", isDark ? "text-white/40" : "text-[rgba(27,34,64,0.45)]"].join(" ")} style={{ color: c }}>{item.period}</div>

      <div className={["rounded-xl p-5 border", isDark ? "bg-white/[0.025] border-white/8" : "bg-white/60 border-[rgba(27,34,64,0.1)]"].join(" ")}>
        <h3 className={["text-base font-bold mb-1", isDark ? "font-space text-white" : "font-fraunces text-[#1B2240]"].join(" ")}>{item.role}</h3>
        <div className={["text-xs font-mono mb-4", isDark ? "text-white/45" : "text-[rgba(27,34,64,0.5)]"].join(" ")}>{item.org}</div>
        <ul className={["flex flex-col gap-2 text-sm", isDark ? "text-white/65 font-space" : "text-[rgba(27,34,64,0.7)] font-inter"].join(" ")}>
          {item.bullets.map((b, j) => (
            <li key={j} className="flex gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: c }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Career({ accent, magenta, isDark }) {
  const { t: tr } = useI18n();
  return (
    <Section id="career" isDark={isDark}>
      <SectionHeader index="03" kicker={tr.sections.career.kicker} title={tr.sections.career.title} accent={accent} isDark={isDark} />
      <div className="relative max-w-2xl">
        {tr.career.map((item, i) => (
          <CareerItem key={i} item={item} index={i} accent={accent} magenta={magenta} isDark={isDark} />
        ))}
      </div>
    </Section>
  );
}

// ── Work ──────────────────────────────────────────────────────────────────────
function WorkCard({ project, index, accent, magenta, isDark }) {
  const [ref, shown] = useReveal(0.18);
  const c  = index % 2 ? magenta : accent;
  const c2 = index % 2 ? accent  : magenta;
  return (
    <article ref={ref}
      className={["interactive group relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-700",
        isDark
          ? "bg-white/[0.02] border-white/8 hover:border-white/16"
          : "bg-white/70 border-[rgba(27,34,64,0.1)] hover:border-[rgba(27,34,64,0.22)]",
        "hover:-translate-y-1",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}
      style={{ transitionDelay: shown ? `${index * 80}ms` : "0ms" }}>

      {/* Frame / screenshot */}
      <div className={["relative overflow-hidden", isDark ? "border-b border-white/6" : "border-b border-[rgba(27,34,64,0.08)]"].join(" ")}
        style={{ aspectRatio: "16/9" }}>
        {/* BG glow */}
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 30% 30%,${c}44,transparent 60%),radial-gradient(circle at 70% 70%,${c2}28,transparent 60%)` }} />

        {/* Screenshot or Mock */}
        {project.image ? (
          <div className={["absolute inset-4 rounded-lg overflow-hidden flex flex-col",
            "border shadow-lg",
            isDark ? "border-white/12 bg-[#0f0f16]" : "border-[rgba(27,34,64,0.12)] bg-[#f0ece4]"].join(" ")}>
            {/* Bar */}
            <div className={["flex items-center gap-1.5 px-3 py-2 border-b shrink-0",
              isDark ? "border-white/8" : "border-[rgba(27,34,64,0.1)]"].join(" ")}>
              {[c, isDark ? "rgba(255,255,255,.12)" : "rgba(27,34,64,.12)", isDark ? "rgba(255,255,255,.12)" : "rgba(27,34,64,.12)"].map((bg, i) => (
                <span key={i} className="w-2 h-2 rounded-full" style={{ background: bg }} />
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.title} className="flex-1 w-full object-cover object-top" />
          </div>
        ) : (
          <div className={["absolute inset-4 rounded-lg overflow-hidden flex flex-col border",
            isDark ? "bg-[#0f0f16]/92 border-white/10" : "bg-[#F5F1EA]/95 border-[rgba(27,34,64,0.1)]"].join(" ")}>
            <div className={["flex items-center gap-1.5 px-3 py-2.5 border-b",
              isDark ? "border-white/6" : "border-[rgba(27,34,64,0.08)]"].join(" ")}>
              {[c, isDark ? "rgba(255,255,255,.12)" : "rgba(27,34,64,.12)", isDark ? "rgba(255,255,255,.12)" : "rgba(27,34,64,.12)"].map((bg, i) => (
                <span key={i} className="w-2 h-2 rounded-full" style={{ background: bg }} />
              ))}
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className={["w-16 shrink-0 flex flex-col gap-1.5 p-2 border-r",
                isDark ? "border-white/6" : "border-[rgba(27,34,64,0.08)]"].join(" ")}>
                <div className="h-1.5 rounded" style={{ background: `${c}66` }} />
                {[1,2,3].map(i => <div key={i} className={["h-1.5 rounded", isDark ? "bg-white/10" : "bg-[rgba(27,34,64,0.1)]"].join(" ")} />)}
              </div>
              <div className="flex-1 p-3 flex flex-col gap-2">
                <div className="h-2 rounded w-3/4" style={{ background: `${c}aa` }} />
                <div className={["grid grid-cols-3 gap-1.5 mt-1", isDark ? "" : ""].join(" ")}>
                  {[...Array(6)].map((_, i) => <div key={i} className={["h-8 rounded", isDark ? "bg-white/6" : "bg-[rgba(27,34,64,0.06)]"].join(" ")} />)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-3 p-5">
        <div className="text-[11px] font-mono tracking-widest" style={{ color: c }}>{project.where}</div>
        <h3 className={["text-lg font-bold leading-tight",
          isDark ? "font-space text-white" : "font-fraunces text-[#1B2240]"].join(" ")}>{project.title}</h3>
        <p className={["text-sm leading-relaxed",
          isDark ? "text-white/60 font-space" : "text-[rgba(27,34,64,0.65)] font-inter"].join(" ")}>{project.text}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tg) => (
            <span key={tg} className={["text-[10px] font-mono px-2 py-0.5 rounded border tracking-wider",
              isDark ? "border-white/12 text-white/50 bg-white/4" : "border-[rgba(27,34,64,0.14)] text-[rgba(27,34,64,0.55)]"].join(" ")}>
              {tg}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Work({ accent, magenta, isDark }) {
  const { t: tr } = useI18n();
  return (
    <Section id="work" isDark={isDark}>
      <SectionHeader index="04" kicker={tr.sections.work.kicker} title={tr.sections.work.title} accent={accent} isDark={isDark} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tr.work.map((project, i) => (
          <WorkCard key={i} project={project} index={i} accent={accent} magenta={magenta} isDark={isDark} />
        ))}
      </div>
    </Section>
  );
}

// ── Tech Stack ────────────────────────────────────────────────────────────────

// StackItem — GSAP magnetic hover + scale pop
function StackItem({ item, c, isDark }) {
  const ref = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3.out" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" });
    return () => gsap.killTweensOf(ref.current);
  }, []);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    xTo.current?.((e.clientX - rect.left - rect.width  / 2) * 0.22);
    yTo.current?.((e.clientY - rect.top  - rect.height / 2) * 0.22);
  };

  const handleMouseEnter = () => {
    gsap.to(ref.current, {
      scale: 1.08,
      boxShadow: `0 0 0 1.5px ${c}88, 0 8px 24px ${c}22`,
      color: c,
      duration: 0.3,
      ease: "back.out(2.5)",
    });
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
    gsap.to(ref.current, {
      scale: 1,
      boxShadow: "none",
      color: "",
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <li
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={[
        "interactive text-sm py-1.5 px-3 rounded-lg border cursor-default will-change-transform",
        isDark
          ? "border-white/6 text-white/70 bg-white/[0.02] font-space"
          : "border-[rgba(27,34,64,0.1)] text-[rgba(27,34,64,0.7)] font-inter",
      ].join(" ")}
    >
      {item}
    </li>
  );
}

function StackCol({ group, index, accent, magenta, isDark }) {
  const [ref, shown] = useReveal();
  const c = index % 2 ? magenta : accent;
  return (
    <div ref={ref} className={["flex flex-col gap-4 transition-all duration-700",
      shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ")}
      style={{ transitionDelay: shown ? `${index * 60}ms` : "0ms" }}>
      <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em]" style={{ color: c }}>
        <span className="w-5 h-px" style={{ background: c }} />
        {group.head}
      </div>
      <ul className="flex flex-col gap-2">
        {group.items.map((it) => (
          <StackItem key={it} item={it} c={c} isDark={isDark} />
        ))}
      </ul>
    </div>
  );
}

export function TechStack({ accent, magenta, isDark }) {
  const { t: tr } = useI18n();
  return (
    <Section id="stack" isDark={isDark}>
      <SectionHeader index="05" kicker={tr.sections.stack.kicker} title={tr.sections.stack.title} accent={accent} isDark={isDark} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
        {tr.stack.groups.map((g, i) => (
          <StackCol key={g.head} group={g} index={i} accent={accent} magenta={magenta} isDark={isDark} />
        ))}
      </div>

      {/* Education */}
      <div className={["rounded-2xl p-6 md:p-8 border", isDark ? "bg-white/[0.02] border-white/8" : "bg-white/50 border-[rgba(27,34,64,0.1)]"].join(" ")}>
        <div className="text-[10px] font-mono tracking-[0.22em] mb-6" style={{ color: accent }}>{tr.stack.eduHead}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tr.stack.edu.map((e) => (
            <div key={e.b} className={["flex flex-col gap-1 p-4 rounded-xl border",
              isDark ? "border-white/6 bg-white/2" : "border-[rgba(27,34,64,0.08)] bg-[rgba(27,34,64,0.02)]"].join(" ")}>
              <b className={["text-sm font-semibold leading-snug", isDark ? "font-space text-white/85" : "font-inter text-[#1B2240]"].join(" ")}>{e.b}</b>
              <span className={["text-xs font-mono", isDark ? "text-white/40" : "text-[rgba(27,34,64,0.45)]"].join(" ")}>{e.s}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
export function Contact({ accent, magenta, isDark }) {
  const { t: tr } = useI18n();
  const [ref, shown] = useReveal(0.2);
  const ct = tr.contact;
  return (
    <Section id="contact" isDark={isDark}>
      <SectionHeader index="06" kicker={tr.sections.contact.kicker} title={tr.sections.contact.title} accent={accent} isDark={isDark} />

      <div ref={ref} className={["flex flex-col gap-10 transition-all duration-700",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>

        {/* Big email */}
        <a href="mailto:carlos.barreraacuna@gmail.com"
          className="interactive group flex items-center gap-4 w-fit">
          <span className="text-2xl transition-transform group-hover:translate-x-2 duration-300" style={{ color: accent }}>→</span>
          <span className={["font-bold leading-none tracking-tight text-[clamp(22px,4vw,52px)]",
            isDark ? "font-space text-white group-hover:text-white/80" : "font-fraunces text-[#1B2240] group-hover:text-[rgba(27,34,64,0.7)]"].join(" ")}>
            carlos.barreraacuna
            <span style={{ color: magenta }}>@</span>
            gmail.com
          </span>
        </a>

        {/* Contact meta */}
        <div className={["grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t",
          isDark ? "border-white/8" : "border-[rgba(27,34,64,0.1)]"].join(" ")}>
          {[
            { label: ct.phone, value: "+57 301 350 2893", href: "tel:+573013502893" },
            { label: ct.based, value: ct.basedValue },
            { label: ct.hours, value: ct.hoursValue },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className={["text-[10px] font-mono tracking-widest", isDark ? "text-white/35" : "text-[rgba(27,34,64,0.4)]"].join(" ")}>{label}</span>
              {href
                ? <a href={href} className="interactive font-medium text-sm transition-colors duration-200" style={{ color: accent }}>{value}</a>
                : <b className={["font-medium text-sm", isDark ? "font-space text-white/80" : "font-inter text-[#1B2240]"].join(" ")}>{value}</b>
              }
            </div>
          ))}
        </div>

        {/* Footer line */}
        <div className={["flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-6 border-t text-xs font-mono",
          isDark ? "border-white/5 text-white/30" : "border-[rgba(27,34,64,0.08)] text-[rgba(27,34,64,0.4)]"].join(" ")}>
          <span>{ct.copyright}</span>
          <span>{ct.built}</span>
        </div>
      </div>
    </Section>
  );
}
