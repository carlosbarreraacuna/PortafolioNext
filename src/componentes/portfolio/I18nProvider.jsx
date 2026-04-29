"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";

const TRANSLATIONS = {
  es: {
    nav: { about: "Sobre mí", skills: "Servicios", career: "Trayectoria", work: "Proyectos", stack: "Stack", contact: "Contacto" },
    hero: {
      hello: "Hola! Soy",
      tagline: "Un Full Stack",
      taglineAccent: "DESARROLLADOR",
      taglineMain: "INGENIERO",
      local: "LOCAL", focus: "FOCO",
      localValue: "Cartagena, CO",
      focusValue: "Web · APIs · Cloud",
      available: "Disponible · 2026",
      timezone: "CTG · GMT-5",
      experience: "~3 años construyendo",
    },
    foot: { open: "Abierto a nuevas colaboraciones", scroll: "Desliza para explorar" },
    sections: {
      about:   { kicker: "SOBRE MÍ",      title: "Detrás del teclado" },
      skills:  { kicker: "QUÉ HAGO",      title: "Capacidades" },
      career:  { kicker: "TRAYECTORIA",   title: "Donde he trabajado" },
      work:    { kicker: "PROYECTOS",     title: "Selección de trabajo" },
      stack:   { kicker: "STACK TÉCNICO", title: "Las herramientas que uso" },
      contact: { kicker: "CONTACTO",      title: "Construyamos algo" },
    },
    about: {
      lead: "Ingeniero de Sistemas con experiencia sólida en desarrollo full stack y soporte técnico. Trabajo en el mantenimiento, evolución y mejora de plataformas empresariales — combinando código, arquitectura y la administración del día a día.",
      p2: "Manejo Laravel, Next.js, PostgreSQL, Tailwind y APIs REST, y he integrado modelos de IA en aplicativos empresariales para clasificación, procesamiento y análisis de documentos.",
      p3: "Me importa la calidad del software, la estabilidad operativa y la mejora continua de la experiencia del usuario.",
      stats: [
        { num: "~3+", lbl: "AÑOS CONSTRUYENDO" },
        { num: "10+", lbl: "PLATAFORMAS" },
        { num: "2025", lbl: "ING. SISTEMAS" },
      ],
      info: [
        { k: "UBICACIÓN", v: "Cartagena, CO" },
        { k: "EMAIL",     v: "carlos.barreraacuna@gmail.com" },
        { k: "TELÉFONO", v: "+57 301 350 2893" },
        { k: "ESTADO",   v: "Disponible" },
      ],
    },
    skills: [
      { t: "Desarrollo Full Stack", d: "Aplicaciones web end-to-end con Laravel + Next.js / React, Node.js + NestJS, APIs REST seguras y bases PostgreSQL optimizadas.", items: ["Laravel","Next.js","Node.js","NestJS"] },
      { t: "Implementación UI / UX", d: "Interfaces modernas, accesibles y responsivas con Tailwind y librerías de componentes (ShadCN, Lucide).", items: ["Tailwind CSS","ShadCN UI","Responsive","A11y"] },
      { t: "Soporte y Operación TI", d: "Soporte técnico a usuarios, administración de accesos, escalamiento de incidentes y monitoreo de sistemas.", items: ["Help Desk","M365","Diagnóstico","Documentación"] },
      { t: "Integraciones e IA", d: "Gmail / Google Calendar API, OAuth 2.0, Webhooks e integración de modelos de IA para clasificación y análisis documental.", items: ["OAuth 2.0","Gmail API","Calendar API","Flujos IA"] },
    ],
    career: [
      { role: "Desarrollador Full Stack / Soporte TI", org: "FUNDATICS — Fundación para las Tecnologías de la Información", period: "Feb 2025 — Feb 2026",
        bullets: ["Construí un sistema de gestión documental, un Help Desk y portales administrativos con Laravel + Next.js.", "Desarrollé servicios backend con Node.js y NestJS para integraciones y APIs REST institucionales.", "Integré Gmail y Google Calendar para flujos de tickets y agenda institucional.", "Implementé autenticación, roles y permisos en todas las plataformas."] },
      { role: "Desarrollador Full Stack", org: "Fundación Universitaria Tecnológico Comfenalco", period: "Feb 2023 — Nov 2024",
        bullets: ["Sistema de Atención Psicológica y Software para Prácticas Universitarias.", "Optimización de queries PostgreSQL y validaciones backend/frontend.", "Roles y permisos con Spatie para control de acceso por función."] },
      { role: "Auxiliar de Sistemas", org: "ETEC S.A — Soluciones de Ingeniería", period: "Jun 2022 — Ene 2023",
        bullets: ["Mantenimiento y actualización de equipos para rendimiento óptimo.", "Administración del dominio ETEC: usuarios, contraseñas y permisos.", "Soporte en Windows: incidentes, sistemas operativos y bases de datos."] },
    ],
    work: [
      { title: "Sistema de Expedientes Sancionatorios", where: "FUNDATICS", tags: ["NestJS","Next.js","PostgreSQL","Python"], text: "Plataforma para la gestión de procesos disciplinarios: expedientes, etapas, asignación de casos y seguimiento de vías vencidas.", image: "/sancionatorio.png" },
      { title: "Help Desk Institucional", where: "FUNDATICS", tags: ["Laravel","Next.js","PostgreSQL","OAuth 2.0","Gmail API","Google Calendar API","Spatie"], text: "Portal de mesa de ayuda con tickets, asignación, estados, y conexión bidireccional con Gmail y Google Calendar.", image: "/helpdesk.png" },
      { title: "Sistema de Gestión Documental", where: "FUNDATICS", tags: ["Laravel","React","PostgreSQL","AI","OAuth 2.0"], text: "Plataforma para clasificación, procesamiento y análisis de documentos, con integración de modelos de IA.", image: "/gd.png" },
      { title: "Sistema de Atención Psicológica", where: "Tecnológico Comfenalco", tags: ["Laravel","Tailwind","PostgreSQL","Spatie"], text: "Plataforma para gestionar atención psicológica universitaria, con validaciones robustas y control por roles.", image: "/sap.png" },
    ],
    stack: {
      groups: [
        { head: "LENGUAJES",     items: ["PHP","JavaScript","TypeScript","SQL"] },
        { head: "FRAMEWORKS",    items: ["Laravel","Next.js","React","Tailwind CSS","Node.js","NestJS"] },
        { head: "DATOS",         items: ["PostgreSQL","REST APIs","OAuth 2.0","Webhooks"] },
        { head: "INTEGRACIONES", items: ["Gmail API","Google Calendar","ShadCN UI","Lucide React"] },
        { head: "HERRAMIENTAS",  items: ["Git","GitHub","GitLab","Postman","Axios"] },
        { head: "OPERACIONES",   items: ["Microsoft 365","Help Desk","Gestión Accesos","Monitoreo"] },
      ],
      eduHead: "EDUCACIÓN Y CERTIFICACIONES",
      edu: [
        { b: "Ingeniería de Sistemas",                      s: "Tecnológico Comfenalco · 2025" },
        { b: "Tecnólogo en Desarrollo de Software",         s: "Tecnológico Comfenalco · 2022" },
        { b: "Microsoft 365 — Servicios y Productividad",   s: "SENA · 2022" },
        { b: "Bases de Datos · Sistemas de Gestión",        s: "SENA · 2022" },
        { b: "Curso Profesional de Git y GitHub",           s: "Platzi · 2022" },
        { b: "Introducción al Desarrollo Front-End",        s: "Coursera · 2025" },
      ],
    },
    contact: {
      phone: "TELÉFONO", based: "UBICACIÓN", hours: "HORARIO",
      basedValue: "Cartagena de Indias, Colombia",
      hoursValue: "GMT-5 · Lun — Vie",
      copyright: "© 2026 Carlos Barrera Acuña",
      built: "Diseñado & construido · Cartagena",
    },
  },

  en: {
    nav: { about: "About", skills: "Skills", career: "Career", work: "Work", stack: "Stack", contact: "Contact" },
    hero: {
      hello: "Hello! I'm",
      tagline: "A Full Stack",
      taglineAccent: "DEVELOPER",
      taglineMain: "ENGINEER",
      local: "LOCAL", focus: "FOCUS",
      localValue: "Cartagena, CO",
      focusValue: "Web · APIs · Cloud",
      available: "Available · 2026",
      timezone: "CTG · GMT-5",
      experience: "~3 yrs shipping",
    },
    foot: { open: "Open to new collaborations", scroll: "Scroll to explore" },
    sections: {
      about:   { kicker: "ABOUT",       title: "Behind the keyboard" },
      skills:  { kicker: "WHAT I DO",   title: "Capabilities" },
      career:  { kicker: "CAREER",      title: "Where I've shipped" },
      work:    { kicker: "WORK",        title: "Selected projects" },
      stack:   { kicker: "TECH STACK",  title: "The tools I reach for" },
      contact: { kicker: "CONTACT",     title: "Let's build something" },
    },
    about: {
      lead: "Systems Engineer with solid full-stack development and IT support experience. I work on maintaining, evolving, and improving enterprise platforms — combining code, architecture, and day-to-day operations.",
      p2: "I work with Laravel, Next.js, PostgreSQL, Tailwind, and REST APIs, and have integrated AI models into enterprise apps for document classification, processing, and analysis.",
      p3: "I care about software quality, operational stability, and continuous improvement of the user experience.",
      stats: [
        { num: "~3+", lbl: "YEARS BUILDING" },
        { num: "10+", lbl: "PLATFORMS BUILT" },
        { num: "2025", lbl: "SYSTEMS ENG." },
      ],
      info: [
        { k: "BASED IN", v: "Cartagena, CO" },
        { k: "EMAIL",    v: "carlos.barreraacuna@gmail.com" },
        { k: "PHONE",    v: "+57 301 350 2893" },
        { k: "STATUS",   v: "Available" },
      ],
    },
    skills: [
      { t: "Full Stack Development", d: "End-to-end web apps with Laravel + Next.js / React, Node.js + NestJS, secure REST APIs, and optimized PostgreSQL backends.", items: ["Laravel","Next.js","Node.js","NestJS"] },
      { t: "UI / UX Implementation", d: "Modern, accessible, responsive interfaces with Tailwind and component libraries (ShadCN, Lucide).", items: ["Tailwind CSS","ShadCN UI","Responsive","A11y"] },
      { t: "IT Support & Operations", d: "User support, access management, incident escalation, and systems monitoring.", items: ["Help Desk","M365","Diagnosis","Documentation"] },
      { t: "Integrations & AI", d: "Gmail / Google Calendar API, OAuth 2.0, webhooks, and AI-model integration for document classification and analysis.", items: ["OAuth 2.0","Gmail API","Calendar API","AI Workflows"] },
    ],
    career: [
      { role: "Full Stack Developer / IT Support", org: "FUNDATICS — Foundation for Information Technologies", period: "Feb 2025 — Feb 2026",
        bullets: ["Built a document management system, a Help Desk, and admin portals with Laravel + Next.js.", "Developed backend services with Node.js and NestJS for integrations and institutional REST APIs.", "Integrated Gmail and Google Calendar for ticket flows and institutional scheduling.", "Implemented authentication, roles, and permissions across platforms."] },
      { role: "Full Stack Developer", org: "Tecnológico Comfenalco University Foundation", period: "Feb 2023 — Nov 2024",
        bullets: ["Psychological Care System and University Practices Software.", "PostgreSQL query optimization and full-stack validations.", "Roles and permissions via Spatie for function-based access control."] },
      { role: "Systems Assistant", org: "ETEC S.A — Engineering Solutions", period: "Jun 2022 — Jan 2023",
        bullets: ["Equipment maintenance and updates for optimal performance.", "ETEC domain administration: users, passwords, and permissions.", "Windows support: incidents, operating systems, and databases."] },
    ],
    work: [
      { title: "Disciplinary Case Management System", where: "FUNDATICS", tags: ["NestJS","Next.js","PostgreSQL","Python"], text: "Platform for managing disciplinary processes: case files, stages, case assignment, and deadline tracking.", image: "/sancionatorio.png" },
      { title: "Institutional Help Desk", where: "FUNDATICS", tags: ["Laravel","Next.js","PostgreSQL","OAuth 2.0","Gmail API","Google Calendar API","Spatie"], text: "Help-desk portal with tickets, assignment, statuses, and bidirectional connection with Gmail and Google Calendar.", image: "/helpdesk.png" },
      { title: "Document Management System", where: "FUNDATICS", tags: ["Laravel","React","PostgreSQL","AI","OAuth 2.0"], text: "Platform for document classification, processing, and analysis, with integrated AI models.", image: "/gd.png" },
      { title: "Psychological Care System", where: "Tecnológico Comfenalco", tags: ["Laravel","Tailwind","PostgreSQL","Spatie"], text: "Platform to manage university psychological care, with robust validations and role-based access.", image: "/sap.png" },
    ],
    stack: {
      groups: [
        { head: "LANGUAGES",     items: ["PHP","JavaScript","TypeScript","SQL"] },
        { head: "FRAMEWORKS",    items: ["Laravel","Next.js","React","Tailwind CSS","Node.js","NestJS"] },
        { head: "DATA",          items: ["PostgreSQL","REST APIs","OAuth 2.0","Webhooks"] },
        { head: "INTEGRATIONS",  items: ["Gmail API","Google Calendar","ShadCN UI","Lucide React"] },
        { head: "TOOLS",         items: ["Git","GitHub","GitLab","Postman","Axios"] },
        { head: "OPERATIONS",    items: ["Microsoft 365","Help Desk","Access Mgmt","Monitoring"] },
      ],
      eduHead: "EDUCATION & CERTIFICATIONS",
      edu: [
        { b: "Systems Engineering",                        s: "Tecnológico Comfenalco · 2025" },
        { b: "Software Development Technologist",          s: "Tecnológico Comfenalco · 2022" },
        { b: "Microsoft 365 — Services & Productivity",   s: "SENA · 2022" },
        { b: "Databases · Management Systems",             s: "SENA · 2022" },
        { b: "Professional Git & GitHub Course",           s: "Platzi · 2022" },
        { b: "Intro to Front-End Development",             s: "Coursera · 2025" },
      ],
    },
    contact: {
      phone: "PHONE", based: "BASED", hours: "HOURS",
      basedValue: "Cartagena de Indias, Colombia",
      hoursValue: "GMT-5 · Mon — Fri",
      copyright: "© 2026 Carlos Barrera Acuña",
      built: "Designed & built · Cartagena",
    },
  },
};

const I18nContext = createContext({ lang: "es", t: TRANSLATIONS.es, setLang: () => {} });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cb-lang");
      if (saved && TRANSLATIONS[saved]) setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("cb-lang", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: TRANSLATIONS[lang] }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export function LangSwitch({ accent, isDark }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={[
      "interactive relative flex items-center rounded-full p-0.5 text-[11px] font-mono tracking-widest border",
      isDark
        ? "border-white/10 bg-white/5"
        : "border-[rgba(27,34,64,0.18)] bg-[rgba(27,34,64,0.04)]",
    ].join(" ")} role="group" aria-label="Language">
      {/* Sliding thumb */}
      <span
        className="lang-thumb absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full pointer-events-none z-0"
        style={{
          background: accent,
          transform: lang === "en" ? "translateX(calc(100% + 4px))" : "translateX(2px)",
        }}
      />
      {["es", "en"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={[
            "relative z-10 px-3 py-1 rounded-full transition-colors duration-200",
            lang === l
              ? "text-white font-semibold"
              : isDark ? "text-white/50 hover:text-white/80" : "text-[rgba(27,34,64,0.5)] hover:text-[rgba(27,34,64,0.8)]",
          ].join(" ")}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
