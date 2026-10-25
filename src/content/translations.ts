// Contenido del portafolio. No hay API ni BD en este proyecto: este archivo es la unica fuente de datos
// y las secciones solo leen de aqui. Regla de redaccion: sin guiones largos, un separador por linea.

export type Lang = "es" | "en";

// Texto con resaltados: cada tramo es texto plano o [texto, color del marcador].
export type Mark = "a" | "b" | "c";
export type Rich = Array<string | [string, Mark]>;

const es = {
  nav: { about: "Sobre mí", skills: "Servicios", work: "Proyectos", career: "Trayectoria", stack: "Stack", contact: "Contacto", cta: "Hablemos" },
  hero: {
    name: "Carlos Barrera",
    nameTop: "Carlos",
    nameBottom: "Barrera",
    role: "Desarrollador Full Stack en Cartagena",
    cta: "Ver proyectos",
    hint: "Mueve el cursor para llamarme",
    hintTouch: "Tócame para saludarte",
    messages: {
      left: "¿Hay alguien a la izquierda?",
      right: "¿Hay alguien a la derecha?",
      hey: "¡Hey, eres tú!",
      hi: "¡Holaaa!",
      check: "Mira mi portafolio",
    },
    photoAlt: "Personaje 3D de Carlos Barrera trabajando en su laptop con audífonos; saluda al visitante y señala el portafolio",
  },
  about: {
    head: ["Detrás del", "teclado"],
    story: [
      "Soy Carlos Barrera, ",
      ["Ingeniero de Sistemas", "a"],
      " en ",
      ["Cartagena de Indias", "b"],
      ". Desde 2022 diseño, construyo y mantengo plataformas web empresariales: gestión documental, mesas de ayuda, expedientes sancionatorios y sistemas universitarios que personas reales usan todos los días. Trabajo de punta a punta con ",
      ["Laravel, Next.js y PostgreSQL", "c"],
      ", servicios en Node.js y NestJS, APIs REST seguras, OAuth 2.0 e integraciones con Gmail y Google Calendar. He llevado ",
      ["modelos de IA", "b"],
      " a aplicativos institucionales para clasificar, procesar y analizar documentos. Antes de escribir código hice soporte técnico y administré dominios, y se nota: me importa que el software sea estable, que los roles y permisos estén bien pensados y que quien lo usa no tenga que llamar a nadie. ",
      ["Más de 3 años", "c"],
      " y ",
      ["más de 10 plataformas", "b"],
      " después, sigo buscando el siguiente problema.",
    ] as Rich,
    close: "Cuéntame el tuyo.",
  },
  pictures: {
    arch: { alt: "Carlos en 3D dibujando en una pizarra de vidrio la arquitectura de un sistema: API, Auth, PostgreSQL, Queue y Next.js", caption: "Primero el diagrama: API, autenticación, base de datos y colas antes de la primera línea de código." },
    desk: { alt: "Carlos en 3D trabajando en dos monitores, uno con código y otro con un panel administrativo con tablas y gráficos", caption: "Después, el panel que usa el equipo todos los días." },
    wave: { alt: "Carlos en 3D saludando con una mano y una taza de café en la otra" },
  },
  services: {
    head: ["Software que sostiene", "la operación"],
    text: "Cuatro frentes que cubro solo o junto a tu equipo, desde el modelo de datos hasta el soporte al usuario final. Lo que entrego queda documentado y listo para crecer.",
    cta: "Cuéntame tu proyecto",
    stats: [
      { num: "3+", lbl: "años construyendo plataformas empresariales" },
      { num: "10+", lbl: "plataformas entregadas, de la base de datos a la interfaz" },
    ],
    rows: [
      { t: "Desarrollo full stack", d: "Aplicaciones web de punta a punta: Laravel o NestJS en el backend, Next.js o React en el frontend y PostgreSQL bien indexado.", items: ["Laravel", "Next.js", "NestJS"] },
      { t: "Interfaces y experiencia", d: "Pantallas claras, accesibles y responsivas para gente que trabaja en ellas ocho horas al día.", items: ["Tailwind CSS", "ShadCN UI", "Accesibilidad"] },
      { t: "Integraciones e IA", d: "Gmail y Google Calendar, OAuth 2.0, webhooks y modelos de IA que clasifican y analizan documentos.", items: ["OAuth 2.0", "Gmail API", "Flujos IA"] },
      { t: "Soporte y operación TI", d: "Soporte a usuarios, gestión de accesos, escalamiento de incidentes y monitoreo para que todo siga en pie.", items: ["Help Desk", "Microsoft 365", "Monitoreo"] },
    ],
  },
  work: {
    head: ["Proyectos", "seleccionados"],
    items: [
      { name: "Expedientes sancionatorios", kind: "NestJS, Next.js", title: "Sistema de Expedientes Sancionatorios", where: "FUNDATICS", year: "2025", tags: ["NestJS", "Next.js", "PostgreSQL", "Python"], text: "Gestión de procesos disciplinarios: expedientes, etapas, asignación de casos y seguimiento de plazos vencidos.", image: "/sancionatorio.png", w: 1918, h: 855, alt: "Captura del sistema de expedientes sancionatorios" },
      { name: "Help Desk institucional", kind: "Laravel, Gmail API", title: "Help Desk Institucional", where: "FUNDATICS", year: "2025", tags: ["Laravel", "Next.js", "PostgreSQL", "OAuth 2.0", "Gmail API"], text: "Mesa de ayuda con tickets, asignación y estados, conectada en ambos sentidos con Gmail y Google Calendar.", image: "/helpdesk.png", w: 1918, h: 757, alt: "Captura del portal Help Desk institucional" },
      { name: "Gestión documental", kind: "Laravel, IA", title: "Sistema de Gestión Documental", where: "FUNDATICS", year: "2025", tags: ["Laravel", "React", "PostgreSQL", "IA"], text: "Clasificación, procesamiento y análisis de documentos con modelos de IA integrados al flujo de trabajo.", image: "/gd.png", w: 1883, h: 885, alt: "Captura del sistema de gestión documental" },
      { name: "Atención psicológica", kind: "Laravel, Tailwind", title: "Sistema de Atención Psicológica", where: "Tecnológico Comfenalco", year: "2024", tags: ["Laravel", "Tailwind", "PostgreSQL", "Spatie"], text: "Atención psicológica universitaria con validaciones robustas y acceso controlado por roles.", image: "/sap.png", w: 1868, h: 626, alt: "Captura del sistema de atención psicológica" },
    ],
  },
  career: {
    head: ["Dónde he", "trabajado"],
    jobs: [
      { role: "Desarrollador Full Stack y Soporte TI", org: "FUNDATICS", period: "2025 a 2026",
        bullets: ["Sistema de gestión documental, Help Desk y portales administrativos con Laravel y Next.js.", "Servicios backend en Node.js y NestJS para integraciones y APIs REST institucionales.", "Gmail y Google Calendar integrados a tickets y agenda; roles y permisos en todas las plataformas."] },
      { role: "Desarrollador Full Stack", org: "Tecnológico Comfenalco", period: "2023 a 2024",
        bullets: ["Sistema de Atención Psicológica y Software para Prácticas Universitarias.", "Optimización de consultas PostgreSQL y validaciones en backend y frontend.", "Roles y permisos con Spatie para controlar el acceso por función."] },
      { role: "Auxiliar de Sistemas", org: "ETEC S.A.", period: "2022 a 2023",
        bullets: ["Mantenimiento y actualización de equipos.", "Administración del dominio: usuarios, contraseñas y permisos.", "Soporte en Windows, sistemas operativos y bases de datos."] },
    ],
    eduHead: "Formación",
    edu: [
      { b: "Ingeniería de Sistemas", s: "Tecnológico Comfenalco", y: "2025" },
      { b: "Introducción al Desarrollo Front-End", s: "Coursera", y: "2025" },
      { b: "Tecnólogo en Desarrollo de Software", s: "Tecnológico Comfenalco", y: "2022" },
      { b: "Microsoft 365: Servicios y Productividad", s: "SENA", y: "2022" },
      { b: "Bases de datos y sistemas de gestión", s: "SENA", y: "2022" },
      { b: "Curso Profesional de Git y GitHub", s: "Platzi", y: "2022" },
    ],
  },
  stack: {
    head: ["Con qué", "construyo"],
    text: "Lo que uso a diario en producción, y lo que mantiene todo funcionando alrededor.",
    tools: ["PHP", "JavaScript", "TypeScript", "SQL", "Laravel", "Next.js", "React", "Node.js", "NestJS", "Tailwind CSS", "PostgreSQL", "REST APIs", "OAuth 2.0", "Webhooks", "Gmail API", "Google Calendar", "Git", "GitHub", "GitLab", "Postman", "Microsoft 365"],
  },
  contact: {
    head: "Construyamos algo",
    lead: "Cuéntame qué necesitas construir, mantener o mejorar.",
    formHead: "O escríbeme aquí",
    phone: "Teléfono",
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
  },
  footer: { reach: "Contacto directo", sections: "Secciones", social: "Redes", legal: "© 2026 Carlos Barrera Acuña", top: "Volver arriba" },
  ui: { skip: "Saltar al contenido", menu: "Abrir menú", close: "Cerrar menú", toLight: "Cambiar a modo claro", toDark: "Cambiar a modo oscuro", language: "Idioma" },
};

export type Dict = typeof es;

const en: Dict = {
  nav: { about: "About", skills: "Services", work: "Work", career: "Career", stack: "Stack", contact: "Contact", cta: "Let's talk" },
  hero: {
    name: "Carlos Barrera",
    nameTop: "Carlos",
    nameBottom: "Barrera",
    role: "Full Stack Developer in Cartagena",
    cta: "View work",
    hint: "Move cursor to call me!",
    hintTouch: "Tap me to say hi",
    messages: {
      left: "Anyone here on the left?",
      right: "Anyone here on the right?",
      hey: "Hey, it's you!",
      hi: "Hiiii!",
      check: "Check out the portfolio",
    },
    photoAlt: "3D character of Carlos Barrera working on his laptop with headphones; he waves at the visitor and points to the portfolio",
  },
  about: {
    head: ["Behind the", "keyboard"],
    story: [
      "I'm Carlos Barrera, a ",
      ["Systems Engineer", "a"],
      " in ",
      ["Cartagena, Colombia", "b"],
      ". Since 2022 I have designed, built and maintained enterprise web platforms: document management, help desks, disciplinary case files and university systems that real people use every day. I work end to end with ",
      ["Laravel, Next.js and PostgreSQL", "c"],
      ", Node.js and NestJS services, secure REST APIs, OAuth 2.0 and Gmail and Google Calendar integrations. I have brought ",
      ["AI models", "b"],
      " into institutional apps to classify, process and analyse documents. Before writing code I did IT support and ran domains, and it shows: I care that software is stable, that roles and permissions are well thought out and that the people using it never need to call anyone. ",
      ["Over 3 years", "c"],
      " and ",
      ["more than 10 platforms", "b"],
      " later, I am still looking for the next problem.",
    ],
    close: "Tell me yours.",
  },
  pictures: {
    arch: { alt: "3D Carlos drawing a system architecture on a glass whiteboard: API, Auth, PostgreSQL, Queue and Next.js", caption: "The diagram comes first: API, authentication, database and queues before the first line of code." },
    desk: { alt: "3D Carlos working on two monitors, one with code and one with an admin dashboard of tables and charts", caption: "Then the dashboard the team uses every day." },
    wave: { alt: "3D Carlos waving with one hand and holding a coffee mug in the other" },
  },
  services: {
    head: ["Software that keeps", "the work running"],
    text: "Four fronts I cover alone or alongside your team, from the data model to end-user support. What I deliver is documented and ready to grow.",
    cta: "Tell me about your project",
    stats: [
      { num: "3+", lbl: "years building enterprise platforms" },
      { num: "10+", lbl: "platforms delivered, from database to interface" },
    ],
    rows: [
      { t: "Full stack development", d: "End-to-end web apps: Laravel or NestJS on the backend, Next.js or React on the frontend and well-indexed PostgreSQL.", items: ["Laravel", "Next.js", "NestJS"] },
      { t: "Interfaces and UX", d: "Clear, accessible, responsive screens for people who work in them eight hours a day.", items: ["Tailwind CSS", "ShadCN UI", "Accessibility"] },
      { t: "Integrations and AI", d: "Gmail and Google Calendar, OAuth 2.0, webhooks and AI models that classify and analyse documents.", items: ["OAuth 2.0", "Gmail API", "AI workflows"] },
      { t: "IT support and operations", d: "User support, access management, incident escalation and monitoring to keep everything up.", items: ["Help Desk", "Microsoft 365", "Monitoring"] },
    ],
  },
  work: {
    head: ["Selected", "work"],
    items: [
      { name: "Disciplinary case files", kind: "NestJS, Next.js", title: "Disciplinary Case Management System", where: "FUNDATICS", year: "2025", tags: ["NestJS", "Next.js", "PostgreSQL", "Python"], text: "Disciplinary process management: case files, stages, case assignment and overdue deadline tracking.", image: "/sancionatorio.png", w: 1918, h: 855, alt: "Screenshot of the disciplinary case management system" },
      { name: "Institutional help desk", kind: "Laravel, Gmail API", title: "Institutional Help Desk", where: "FUNDATICS", year: "2025", tags: ["Laravel", "Next.js", "PostgreSQL", "OAuth 2.0", "Gmail API"], text: "Help desk with tickets, assignment and statuses, connected both ways with Gmail and Google Calendar.", image: "/helpdesk.png", w: 1918, h: 757, alt: "Screenshot of the institutional help desk portal" },
      { name: "Document management", kind: "Laravel, AI", title: "Document Management System", where: "FUNDATICS", year: "2025", tags: ["Laravel", "React", "PostgreSQL", "AI"], text: "Document classification, processing and analysis with AI models built into the workflow.", image: "/gd.png", w: 1883, h: 885, alt: "Screenshot of the document management system" },
      { name: "Psychological care", kind: "Laravel, Tailwind", title: "Psychological Care System", where: "Tecnológico Comfenalco", year: "2024", tags: ["Laravel", "Tailwind", "PostgreSQL", "Spatie"], text: "University psychological care with robust validations and role-based access.", image: "/sap.png", w: 1868, h: 626, alt: "Screenshot of the psychological care system" },
    ],
  },
  career: {
    head: ["Where I've", "worked"],
    jobs: [
      { role: "Full Stack Developer and IT Support", org: "FUNDATICS", period: "2025 to 2026",
        bullets: ["Document management system, Help Desk and admin portals with Laravel and Next.js.", "Node.js and NestJS backend services for integrations and institutional REST APIs.", "Gmail and Google Calendar wired into tickets and scheduling; roles and permissions everywhere."] },
      { role: "Full Stack Developer", org: "Tecnológico Comfenalco", period: "2023 to 2024",
        bullets: ["Psychological Care System and University Practices Software.", "PostgreSQL query optimization and validations on backend and frontend.", "Roles and permissions with Spatie for function-based access."] },
      { role: "Systems Assistant", org: "ETEC S.A.", period: "2022 to 2023",
        bullets: ["Equipment maintenance and updates.", "Domain administration: users, passwords and permissions.", "Windows, operating system and database support."] },
    ],
    eduHead: "Education",
    edu: [
      { b: "Systems Engineering", s: "Tecnológico Comfenalco", y: "2025" },
      { b: "Intro to Front-End Development", s: "Coursera", y: "2025" },
      { b: "Software Development Technologist", s: "Tecnológico Comfenalco", y: "2022" },
      { b: "Microsoft 365: Services and Productivity", s: "SENA", y: "2022" },
      { b: "Databases and management systems", s: "SENA", y: "2022" },
      { b: "Professional Git and GitHub Course", s: "Platzi", y: "2022" },
    ],
  },
  stack: {
    head: ["What I", "build with"],
    text: "What I use in production every day, and what keeps everything running around it.",
    tools: ["PHP", "JavaScript", "TypeScript", "SQL", "Laravel", "Next.js", "React", "Node.js", "NestJS", "Tailwind CSS", "PostgreSQL", "REST APIs", "OAuth 2.0", "Webhooks", "Gmail API", "Google Calendar", "Git", "GitHub", "GitLab", "Postman", "Microsoft 365"],
  },
  contact: {
    head: "Let's build something",
    lead: "Tell me what you need to build, maintain or improve.",
    formHead: "Or write to me here",
    phone: "Phone",
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
  },
  footer: { reach: "Reach me", sections: "Sections", social: "Social", legal: "© 2026 Carlos Barrera Acuña", top: "Back to top" },
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

// Logos del stack disponibles en /public/habilidades (el resto de herramientas va solo como texto).
export const TOOL_LOGOS: Record<string, string> = {
  PHP: "php",
  JavaScript: "javascript",
  TypeScript: "typescript",
  Laravel: "laravel",
  "Next.js": "next-js",
  React: "react",
  PostgreSQL: "postgresql",
};
