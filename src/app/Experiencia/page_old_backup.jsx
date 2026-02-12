"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const About = () => {
  const containerRef = useRef()
  const experienceRef = useRef()
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" })

  const experienceData = [
    {
      id: 1,
      position: "Desarrollador Full Stack / Soporte TI",
      company: "Fundación para las Tecnologías de la Información y la Comunicación – FUNDATICS",
      period: "Febrero de 2025 – Febrero de 2026",
      location: "Barranquilla, Colombia",
      type: "Tiempo Completo",
      description: "Participé en el diseño, desarrollo y mantenimiento de soluciones web institucionales, incluyendo un sistema de gestión documental, un portal de mesa de ayuda (Help Desk) y portales administrativos, utilizando un enfoque full stack.",
      achievements: [
        "Desarrollé y mantuve aplicaciones web utilizando Laravel (API REST) en el backend y Next.js / React en el frontend, garantizando rendimiento, seguridad y escalabilidad.",
        "Implementé módulos de gestión documental, manejo de expedientes, carga y visualización de documentos, control de estados y trazabilidad de la información.",
        "Desarrollé un portal de mesa de ayuda para la gestión de tickets, incluyendo creación, asignación, seguimiento y control de solicitudes.",
        "Diseñé e implementé interfaces modernas y responsivas aplicando principios de UX/UI con Tailwind CSS.",
        "Gestioné la autenticación, autorización y control de accesos, incluyendo manejo de usuarios, roles y permisos.",
        "Participé en el levantamiento de requerimientos con las diferentes áreas, traduciendo necesidades funcionales en soluciones técnicas.",
        "Implementé mejoras continuas para optimizar flujos de trabajo, tiempos de respuesta y procesos internos.",
        "Apoyé procesos de modernización tecnológica, contribuyendo a la evolución de los sistemas institucionales."
      ],
      technologies: ["Laravel", "Next.js", "React", "PostgreSQL", "Tailwind CSS", "API REST", "JWT", "Docker"],
      color: "blue"
    },
    {
      id: 2,
      position: "Desarrollador Full Stack",
      company: "Fundación Universitaria Tecnológico Comfenalco",
      period: "Febrero de 2023 – Noviembre de 2024",
      location: "Barranquilla, Colombia",
      type: "Tiempo Completo",
      description: "Diseñé interfaces modernas y accesibles utilizando Tailwind CSS, mejorando la usabilidad y la experiencia del usuario final.",
      achievements: [
        "Implementé validaciones en backend y frontend para garantizar la integridad de la información y prevenir errores en el ingreso de datos.",
        "Optimicé el rendimiento del Sistema de Atención Psicológica y del Software para Prácticas Universitarias mediante consultas eficientes en PostgreSQL.",
        "Fortalecí la seguridad y la administración de accesos configurando roles y permisos con Spatie."
      ],
      technologies: ["Laravel", "React", "PostgreSQL", "Tailwind CSS", "Spatie", "JWT"],
      color: "green"
    },
    {
      id: 3,
      position: "Auxiliar de Sistemas",
      company: "ETEC S.A. – Soluciones de Ingeniería",
      period: "Junio de 2022 – Enero de 2023",
      location: "Barranquilla, Colombia",
      type: "Tiempo Completo",
      description: "Garanticé el correcto funcionamiento de los sistemas mediante el mantenimiento y actualización de equipos de cómputo.",
      achievements: [
        "Administré usuarios y contraseñas, gestionando permisos y control de accesos dentro de la organización.",
        "Brindé soporte técnico en aplicaciones y sistemas operativos Windows, resolviendo incidencias y asegurando la continuidad operativa.",
        "Atendí solicitudes, incidentes y cambios relacionados con sistemas operativos y bases de datos, mejorando la estabilidad y la experiencia del usuario."
      ],
      technologies: ["Windows Server", "Active Directory", "SQL Server", "Redes", "Soporte Técnico"],
      color: "purple"
    }
  ]

  return (
    <motion.div
      className="min-h-screen"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* CONTAINER */}
      <div className="flex flex-col" ref={containerRef}>
        {/* EXPERIENCIA - HOJA DE RUTA */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col flex-1">
          <motion.div
            className="container mx-auto p-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            
          </motion.div>

          {/* Contenedor de experiencia */}
          <div className="max-w-6xl mx-auto mt-8 sm:mt-12">
            <div className="flex flex-col space-y-8 sm:space-y-12" ref={experienceRef}>
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="relative"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isExperienceRefInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Timeline Desktop */}
                  <div className="hidden lg:block">
                    <div className="flex items-start">
                      {/* Contenido Izquierda/Derecha */}
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
                        {/* Card de Experiencia */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 sm:p-6 border-l-4 border-blue-500 hover:shadow-3xl hover:scale-105 transition-all duration-500 transform">
                          {/* Header */}
                          <div className="mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                              {exp.position}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <span className="text-base font-semibold text-blue-600">
                                {exp.company}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {exp.period}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {exp.location}
                            </div>
                          </div>

                          {/* Descripción */}
                          <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                            {exp.description}
                          </p>

                          {/* Logros */}
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Logros Principales:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.slice(0, 3).map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                  <span className="text-blue-500 mt-0.5">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tecnologías */}
                          <div className="flex flex-wrap gap-1">
                            {exp.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Línea Central */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full ring-4 ring-white shadow-2xl z-10 animate-pulse"></div>
                        {index < experienceData.length - 1 && (
                          <div className="w-1 bg-gradient-to-b from-blue-300 to-purple-400 h-full mt-3"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile/Tablet Layout */}
                  <div className="lg:hidden">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-3 sm:p-4 border-l-4 border-blue-500 hover:shadow-3xl transition-all duration-500">
                      {/* Header */}
                      <div className="mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                          {exp.position}
                        </h3>
                        <div className="space-y-1">
                          <span className="text-sm font-semibold text-blue-600 block">
                            {exp.company}
                          </span>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-gray-700 mb-3 text-xs leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Logros */}
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-900 mb-1 text-xs">Logros Principales:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.slice(0, 2).map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tecnologías */}
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isExperienceRefInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl border border-blue-100">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                ¿Interesado en trabajar juntos?
              </h3>
              <p className="text-gray-700 text-base mb-6 max-w-2xl mx-auto">
                Si buscas un desarrollador Full Stack con experiencia en proyectos reales y compromiso con la calidad, 
                me encantaría conversar sobre cómo puedo aportar valor a tu equipo.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Contactar Ahora
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
