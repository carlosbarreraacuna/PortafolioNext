"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

const Portfolio = () => {
  const containerRef = useRef(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const projects = [
    {
      id: 1,
      title: "Sistema de atención psicológica",
      image: "/sap.png",
      description:
        "Desarrollado con PHP y el framework CodeIgniter 3 este sistema agiliza la gestión de consultorios y el seguimiento de pacientes. Facilita la programación de citas, el registro de historiales clínicos detallados y la generación de informes personalizados. Mejorando la experiencia de atención y el seguimiento del progreso terapéutico.",
      tags: [
        { name: "PHP", color: "blue" },
        { name: "Codeigneiter 3", color: "pink" },
        { name: "PostgreSQL", color: "purple" },
        { name: "Javascript", color: "yellow" },
      ],
      links: [{ name: "Más información", url: "/contacto" }],
    },
    {
      id: 2,
      title: "Ecommerce - TesloShop",
      image: "/image.png",
      description:
        "E-commerce, actualmente en desarrollo con la tecnología Next.js, se perfila como una plataforma innovadora y ágil para la compra en línea. Con un enfoque en la experiencia del usuario, creando un espacio intuitivo y visualmente atractivo donde los clientes podrán descubrir y adquirir productos de manera sencilla y segura.",
      tags: [
        { name: "En desarrollo", color: "green" },
        { name: "Next JS", color: "gray" },
        { name: "Zustand", color: "blue" },
        { name: "Prisma", color: "purple" },
      ],
      links: [
        { name: "Más información", url: "/contacto" },
        { name: "GitHub", url: "https://github.com/carlosbarreraacuna/Ecommerce" },
      ],
    },
    {
      id: 3,
      title: "App de Gestión de Tareas",
      image: "/Gestion.png",
      description:
        "Este aplicativo web, desarrollado con Next.js en el frontend y Django Rest Framework en el backend, permite la gestión eficiente de tareas a través de una API REST. Sus principales funcionalidades incluyen el registro y actualización de usuarios, la creación, actualización y asignación de tareas a diferentes usuarios. La interfaz ofrece una experiencia fluida y responsiva usando la libreria Shadcn, mientras que la API garantiza un manejo seguro y estructurado de los datos.",
      tags: [
        { name: "Next js", color: "gray" },
        { name: "Django Rest Framework", color: "green" },
        { name: "APIRESTFul", color: "purple" },
        { name: "TypeScript", color: "blue" },
      ],
      links: [
        { name: "Más información", url: "/contacto" },
        { name: "Despliegue", url: "https://users-front-three.vercel.app/" },
        { name: "GitHub", url: "https://github.com/carlosbarreraacuna" },
      ],
    },
    {
      id: 4,
      title: "Portal ciudadano PQRSD",
      image: "/PORTAL.png",
      description:
        "Este portal diseñado para gestionar peticiones, quejas y reclamos, solicitudes, denuncias (PQRSD), optimizando la comunicación entre usuarios y la entidad responsable. Desarrollado con Next.js (React) en el frontend para una interfaz dinámica y responsive, utiliza una API RESTful en Laravel (PHP) para procesar solicitudes y una base de datos PostgreSQL para almacenamiento seguro y escalable. El despliegue se realiza en Vercel (frontend) Sus funcionalidades clave incluyen registro intuitivo de PQRSD, notificaciones y un panel administrativo para métricas y reportes.",
      tags: [
        { name: "Next.js", color: "gray" },
        { name: "Laravel", color: "orange" },
        { name: "PostgreSQL", color: "blue" },
       
      ],
      links: [{ name: "Más información", url: "/contacto" }],
      links: [{ name: "Demo", url: "/https://portal-five-sepia.vercel.app/#inicio" }],
    },
    {
  id: 5,
  title: "Sistema de Gestión Documental",
  image: "/gd.png",
  description:
    "Sistema de Gestión Documental diseñado para la administración, organización y trazabilidad de documentos institucionales. Permite la radicación, clasificación por series y subseries documentales, control de versiones, gestión de expedientes, búsqueda avanzada y control de accesos por roles. Incluye auditoría de acciones, almacenamiento seguro y panel administrativo para la supervisión del ciclo de vida documental.",
  tags: [
    { name: "Next.js", color: "gray" },
    { name: "Laravel API", color: "orange" },
    { name: "PostgreSQL", color: "purple" },
    { name: "AWS", color: "orange" },
  ],
  links: [
    { name: "Más información", url: "/contacto" },
    { name: "Demo", url: "https://gestion-docs-front.vercel.app/" },
  ],
},

    {
  id: 6,
  title: "Software de Mesa de Ayuda (HelpDesk)",
  image: "/helpdesk.png",
  description:
    "Sistema de mesa de ayuda desarrollado con arquitectura moderna para la gestión integral de tickets de soporte. Permite la creación, seguimiento y administración de solicitudes, con control de estados, prioridades y SLA. Incluye autenticación segura, roles y permisos, notificaciones en tiempo real, integración con WhatsApp y un panel administrativo para supervisión y métricas.",
  tags: [
    { name: "Laravel API", color: "red" },
    { name: "Next.js", color: "blue" },
    { name: "PostgreSQL", color: "orange" },
    { name: "Tailwind CSS", color: "cyan" },
    { name: "ShadCN/UI", color: "gray" },
    { name: "WhatsApp Bot", color: "green" },
  ],
  links: [
    { name: "Más información", url: "/contacto" },
    { name: "Demo", url: "#" },
  ],
}

  ]

  const getTagColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-700 ring-blue-700/10",
      pink: "bg-pink-50 text-pink-700 ring-pink-700/10",
      purple: "bg-purple-50 text-purple-700 ring-purple-700/10",
      yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
      green: "bg-green-50 text-green-700 ring-green-600/20",
      gray: "bg-gray-50 text-gray-600 ring-gray-500/10",
      orange: "bg-orange-50 text-orange-700 ring-orange-600/20",
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div>
      <div className="flex items-center justify-center lg:h-full text-black">
        <div className="container mx-auto p-4 pt-40">
          <motion.h2
            className="font-bold text-center text-6xl font-display"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Proyectos
          </motion.h2>
          <motion.p
            className="text-center mt-4 mb-8 font-medium text-slate-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Aquí podrás encontrar una selección de mis mejores trabajos y proyectos.
          </motion.p>

          <motion.div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow"
                variants={item}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 rounded-md object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                />
                <div className="px-1 py-4">
                  <h3 className="font-bold text-xl mb-2">
                    {project.title}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getTagColorClasses(tag.color)}`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </h3>
                  <p className="text-gray-700 text-base">{project.description}</p>
                </div>
                <div className="px-1 py-2 flex gap-4">
                  {project.links.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      className="text-blue-500 hover:underline flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio

