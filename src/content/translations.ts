// Contenido del portafolio. No hay API ni BD en este proyecto: este archivo es la unica fuente de datos
// y las secciones solo leen de aqui. Regla de redaccion: sin guiones largos, un separador por linea.

export type Lang = "es" | "en";

const es = {
  nav: { about: "Sobre mí", skills: "Servicios", career: "Trayectoria", work: "Proyectos", stack: "Stack", contact: "Contacto" },
  hero: {
    greeting: "Soy",
    name: "Carlos Barrera",
    role: "Desarrollador Full Stack",
    hint: "Mueve el cursor para llamarme",
    hintTouch: "Tócame para saludarte",
    messages: {
      left: "¿Hay alguien a la izquierda?",
      right: "¿Hay alguien a la derecha?",
      hey: "¡Hey, eres tú!",
      hi: "¡Holaaa!",
      check: "Mira mi portafolio",
    },
    photoAlt: "Ilustración de Carlos Barrera trabajando en su laptop con audífonos; saluda al visitante y señala el portafolio",
  },
  sections: {
    about: "Detrás del teclado",
    skills: "Lo que hago",
    career: "Dónde he trabajado",
    work: "Proyectos seleccionados",
    stack: "Herramientas que uso",
    contact: "Construyamos algo",
  },
  about: {
    lead: "Ingeniero de Sistemas con experiencia sólida en desarrollo full stack y soporte técnico. Mantengo, evoluciono y mejoro plataformas empresariales, combinando código, arquitectura y la administración del día a día.",
    p2: "Manejo Laravel, Next.js, PostgreSQL, Tailwind y APIs REST, y he integrado modelos de IA en aplicativos empresariales para clasificación, procesamiento y análisis de documentos.",
    p3: "Me importa la calidad del software, la estabilidad operativa y la mejora continua de la experiencia del usuario.",
    stats: [
      { num: "3+", lbl: "años construyendo" },
      { num: "10+", lbl: "plataformas" },
      { num: "2025", lbl: "Ingeniería de Sistemas" },
    ],
  },
  skills: [
    { t: "Desarrollo Full Stack", d: "Aplicaciones web de punta a punta con Laravel y Next.js o React, Node.js con NestJS, APIs REST seguras y bases PostgreSQL optimizadas.", items: ["Laravel", "Next.js", "Node.js", "NestJS"] },
    { t: "Implementación UI y UX", d: "Interfaces modernas, accesibles y responsivas con Tailwind y librerías de componentes.", items: ["Tailwind CSS", "ShadCN UI", "Responsive", "A11y"] },
    { t: "Soporte y operación TI", d: "Soporte técnico a usuarios, administración de accesos, escalamiento de incidentes y monitoreo de sistemas.", items: ["Help Desk", "M365", "Diagnóstico", "Documentación"] },
    { t: "Integraciones e IA", d: "Gmail y Google Calendar API, OAuth 2.0, webhooks e integración de modelos de IA para clasificación y análisis documental.", items: ["OAuth 2.0", "Gmail API", "Calendar API", "Flujos IA"] },
  ],
  career: [
    { role: "Desarrollador Full Stack y Soporte TI", org: "FUNDATICS, Fundación para las Tecnologías de la Información", period: "Feb 2025 - Feb 2026",
      bullets: ["Construí un sistema de gestión documental, un Help Desk y portales administrativos con Laravel y Next.js.", "Desarrollé servicios backend con Node.js y NestJS para integraciones y APIs REST institucionales.", "Integré Gmail y Google Calendar para flujos de tickets y agenda institucional.", "Implementé autenticación, roles y permisos en todas las plataformas."] },
    { role: "Desarrollador Full Stack", org: "Fundación Universitaria Tecnológico Comfenalco", period: "Feb 2023 - Nov 2024",
      bullets: ["Sistema de Atención Psicológica y Software para Prácticas Universitarias.", "Optimización de queries PostgreSQL y validaciones en backend y frontend.", "Roles y permisos con Spatie para control de acceso por función."] },
    { role: "Auxiliar de Sistemas", org: "ETEC S.A, Soluciones de Ingeniería", period: "Jun 2022 - Ene 2023",
      bullets: ["Mantenimiento y actualización de equipos para rendimiento óptimo.", "Administración del dominio ETEC: usuarios, contraseñas y permisos.", "Soporte en Windows: incidentes, sistemas operativos y bases de datos."] },
  ],
  work: [
    { title: "Sistema de Expedientes Sancionatorios", where: "FUNDATICS", tags: ["NestJS", "Next.js", "PostgreSQL", "Python"], text: "Plataforma para la gestión de procesos disciplinarios: expedientes, etapas, asignación de casos y seguimiento de vías vencidas.", image: "/sancionatorio.png", w: 1918, h: 855, alt: "Captura del sistema de expedientes sancionatorios" },
    { title: "Help Desk Institucional", where: "FUNDATICS", tags: ["Laravel", "Next.js", "PostgreSQL", "OAuth 2.0", "Gmail API", "Spatie"], text: "Portal de mesa de ayuda con tickets, asignación, estados y conexión bidireccional con Gmail y Google Calendar.", image: "/helpdesk.png", w: 1918, h: 757, alt: "Captura del portal Help Desk institucional" },
    { title: "Sistema de Gestión Documental", where: "FUNDATICS", tags: ["Laravel", "React", "PostgreSQL", "IA", "OAuth 2.0"], text: "Plataforma para clasificación, procesamiento y análisis de documentos, con integración de modelos de IA.", image: "/gd.png", w: 1883, h: 885, alt: "Captura del sistema de gestión documental" },
    { title: "Sistema de Atención Psicológica", where: "Tecnológico Comfenalco", tags: ["Laravel", "Tailwind", "PostgreSQL", "Spatie"], text: "Plataforma para gestionar la atención psicológica universitaria, con validaciones robustas y control por roles.", image: "/sap.png", w: 1868, h: 626, alt: "Captura del sistema de atención psicológica" },
  ],
  stack: {
    groups: [
      { head: "Lenguajes", items: ["PHP", "JavaScript", "TypeScript", "SQL"] },
      { head: "Frameworks", items: ["Laravel", "Next.js", "React", "Tailwind CSS", "Node.js", "NestJS"] },
      { head: "Datos", items: ["PostgreSQL", "REST APIs", "OAuth 2.0", "Webhooks"] },
      { head: "Integraciones", items: ["Gmail API", "Google Calendar", "ShadCN UI"] },
      { head: "Herramientas", items: ["Git", "GitHub", "GitLab", "Postman", "Axios"] },
      { head: "Operaciones", items: ["Microsoft 365", "Help Desk", "Gestión de accesos", "Monitoreo"] },
    ],
    eduHead: "Educación y certificaciones",
    edu: [
      { b: "Ingeniería de Sistemas", s: "Tecnológico Comfenalco, 2025" },
      { b: "Tecnólogo en Desarrollo de Software", s: "Tecnológico Comfenalco, 2022" },
      { b: "Microsoft 365: Servicios y Productividad", s: "SENA, 2022" },
      { b: "Bases de datos y sistemas de gestión", s: "SENA, 2022" },
      { b: "Curso Profesional de Git y GitHub", s: "Platzi, 2022" },
      { b: "Introducción al Desarrollo Front-End", s: "Coursera, 2025" },
    ],
  },
  contact: {
    phone: "Teléfono", based: "Ubicación", hours: "Horario",
    basedValue: "Cartagena de Indias, Colombia",
    hoursValue: "GMT-5, lunes a viernes",
    form: {
      name: "Nombre", lastName: "Apellido", email: "Correo", phone: "Teléfono", message: "Mensaje",
      send: "Enviar mensaje", sending: "Enviando",
      success: "Mensaje enviado. Te respondo pronto.",
      error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      required: "Este campo es obligatorio.",
      invalidEmail: "Escribe un correo válido.",
    },
    copyright: "© 2026 Carlos Barrera Acuña",
  },
  story: [
    { alt: "Carlos sonriendo en una oficina de desarrollo con pizarras de arquitectura y equipo trabajando" },
    { alt: "Carlos señalando código en un monitor, con una taza de café sobre el escritorio" },
    { alt: "Carlos y dos compañeros revisando un diagrama de servicios en una pantalla" },
    { alt: "Carlos dibujando con un marcador un diagrama de arquitectura en una pizarra con notas adhesivas" },
  ],
  ui: { skip: "Saltar al contenido", menu: "Abrir menú", close: "Cerrar menú", toLight: "Cambiar a modo claro", toDark: "Cambiar a modo oscuro", language: "Idioma" },
};

export type Dict = typeof es;

const en: Dict = {
  nav: { about: "About", skills: "Services", career: "Career", work: "Work", stack: "Stack", contact: "Contact" },
  hero: {
    greeting: "I'm",
    name: "Carlos Barrera",
    role: "Full Stack Developer",
    hint: "Move cursor to call me!",
    hintTouch: "Tap me to say hi",
    messages: {
      left: "Anyone here on the left?",
      right: "Anyone here on the right?",
      hey: "Hey, it's you!",
      hi: "Hiiii!",
      check: "Check out the portfolio",
    },
    photoAlt: "Illustration of Carlos Barrera working on his laptop with headphones; he waves at the visitor and points to the portfolio",
  },
  sections: {
    about: "Behind the keyboard",
    skills: "What I do",
    career: "Where I've worked",
    work: "Selected projects",
    stack: "Tools I use",
    contact: "Let's build something",
  },
  about: {
    lead: "Systems Engineer with solid full-stack development and IT support experience. I maintain, evolve and improve enterprise platforms, combining code, architecture and day-to-day operations.",
    p2: "I work with Laravel, Next.js, PostgreSQL, Tailwind and REST APIs, and have integrated AI models into enterprise apps for document classification, processing and analysis.",
    p3: "I care about software quality, operational stability and continuous improvement of the user experience.",
    stats: [
      { num: "3+", lbl: "years building" },
      { num: "10+", lbl: "platforms built" },
      { num: "2025", lbl: "Systems Engineering" },
    ],
  },
  skills: [
    { t: "Full Stack Development", d: "End-to-end web apps with Laravel and Next.js or React, Node.js with NestJS, secure REST APIs and optimized PostgreSQL backends.", items: ["Laravel", "Next.js", "Node.js", "NestJS"] },
    { t: "UI and UX Implementation", d: "Modern, accessible, responsive interfaces with Tailwind and component libraries.", items: ["Tailwind CSS", "ShadCN UI", "Responsive", "A11y"] },
    { t: "IT Support and Operations", d: "User support, access management, incident escalation and systems monitoring.", items: ["Help Desk", "M365", "Diagnosis", "Documentation"] },
    { t: "Integrations and AI", d: "Gmail and Google Calendar API, OAuth 2.0, webhooks and AI-model integration for document classification and analysis.", items: ["OAuth 2.0", "Gmail API", "Calendar API", "AI workflows"] },
  ],
  career: [
    { role: "Full Stack Developer and IT Support", org: "FUNDATICS, Foundation for Information Technologies", period: "Feb 2025 - Feb 2026",
      bullets: ["Built a document management system, a Help Desk and admin portals with Laravel and Next.js.", "Developed backend services with Node.js and NestJS for integrations and institutional REST APIs.", "Integrated Gmail and Google Calendar for ticket flows and institutional scheduling.", "Implemented authentication, roles and permissions across platforms."] },
    { role: "Full Stack Developer", org: "Tecnológico Comfenalco University Foundation", period: "Feb 2023 - Nov 2024",
      bullets: ["Psychological Care System and University Practices Software.", "PostgreSQL query optimization and full-stack validations.", "Roles and permissions via Spatie for function-based access control."] },
    { role: "Systems Assistant", org: "ETEC S.A, Engineering Solutions", period: "Jun 2022 - Jan 2023",
      bullets: ["Equipment maintenance and updates for optimal performance.", "ETEC domain administration: users, passwords and permissions.", "Windows support: incidents, operating systems and databases."] },
  ],
  work: [
    { title: "Disciplinary Case Management System", where: "FUNDATICS", tags: ["NestJS", "Next.js", "PostgreSQL", "Python"], text: "Platform for managing disciplinary processes: case files, stages, case assignment and deadline tracking.", image: "/sancionatorio.png", w: 1918, h: 855, alt: "Screenshot of the disciplinary case management system" },
    { title: "Institutional Help Desk", where: "FUNDATICS", tags: ["Laravel", "Next.js", "PostgreSQL", "OAuth 2.0", "Gmail API", "Spatie"], text: "Help-desk portal with tickets, assignment, statuses and bidirectional connection with Gmail and Google Calendar.", image: "/helpdesk.png", w: 1918, h: 757, alt: "Screenshot of the institutional help desk portal" },
    { title: "Document Management System", where: "FUNDATICS", tags: ["Laravel", "React", "PostgreSQL", "AI", "OAuth 2.0"], text: "Platform for document classification, processing and analysis, with integrated AI models.", image: "/gd.png", w: 1883, h: 885, alt: "Screenshot of the document management system" },
    { title: "Psychological Care System", where: "Tecnológico Comfenalco", tags: ["Laravel", "Tailwind", "PostgreSQL", "Spatie"], text: "Platform to manage university psychological care, with robust validations and role-based access.", image: "/sap.png", w: 1868, h: 626, alt: "Screenshot of the psychological care system" },
  ],
  stack: {
    groups: [
      { head: "Languages", items: ["PHP", "JavaScript", "TypeScript", "SQL"] },
      { head: "Frameworks", items: ["Laravel", "Next.js", "React", "Tailwind CSS", "Node.js", "NestJS"] },
      { head: "Data", items: ["PostgreSQL", "REST APIs", "OAuth 2.0", "Webhooks"] },
      { head: "Integrations", items: ["Gmail API", "Google Calendar", "ShadCN UI"] },
      { head: "Tools", items: ["Git", "GitHub", "GitLab", "Postman", "Axios"] },
      { head: "Operations", items: ["Microsoft 365", "Help Desk", "Access management", "Monitoring"] },
    ],
    eduHead: "Education and certifications",
    edu: [
      { b: "Systems Engineering", s: "Tecnológico Comfenalco, 2025" },
      { b: "Software Development Technologist", s: "Tecnológico Comfenalco, 2022" },
      { b: "Microsoft 365: Services and Productivity", s: "SENA, 2022" },
      { b: "Databases and management systems", s: "SENA, 2022" },
      { b: "Professional Git and GitHub Course", s: "Platzi, 2022" },
      { b: "Intro to Front-End Development", s: "Coursera, 2025" },
    ],
  },
  contact: {
    phone: "Phone", based: "Based in", hours: "Hours",
    basedValue: "Cartagena de Indias, Colombia",
    hoursValue: "GMT-5, Monday to Friday",
    form: {
      name: "First name", lastName: "Last name", email: "Email", phone: "Phone", message: "Message",
      send: "Send message", sending: "Sending",
      success: "Message sent. I'll reply soon.",
      error: "The message could not be sent. Please try again.",
      required: "This field is required.",
      invalidEmail: "Enter a valid email.",
    },
    copyright: "© 2026 Carlos Barrera Acuña",
  },
  story: [
    { alt: "Carlos smiling in a development office with architecture whiteboards and a team at work" },
    { alt: "Carlos pointing at code on a monitor, with a coffee mug on the desk" },
    { alt: "Carlos and two teammates reviewing a services diagram on a screen" },
    { alt: "Carlos drawing a system architecture diagram with a marker on a whiteboard full of sticky notes" },
  ],
  ui: { skip: "Skip to content", menu: "Open menu", close: "Close menu", toLight: "Switch to light mode", toDark: "Switch to dark mode", language: "Language" },
};

export const TRANSLATIONS: Record<Lang, Dict> = { es, en };

// Datos de contacto y redes (los mismos que usaba la home anterior).
export const CONTACT = {
  email: "carlos.barreraacuna@gmail.com",
  phone: "+57 301 350 2893",
  phoneHref: "tel:+573013502893",
  linkedin: "https://linkedin.com/in/carlos-barrera-acuna",
  github: "https://github.com/cbarrerac",
  instagram: "https://instagram.com",
};
