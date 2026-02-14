"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const Experience = () => {
  const containerRef = useRef()
  const experienceRef = useRef()
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" })

  const experienceData = [
    {
      id: 1,
      position: "Desarrollador Full Stack / Soporte TI",
      company: "FUNDATICS",
      period: "2025 – 2026",
      description: "Desarrollo y mantenimiento de sistemas de gestión documental, portales administrativos y mesa de ayuda (Help Desk), integrando APIs REST, control de accesos y soporte técnico continuo.",
      technologies: ["Next.js", "Laravel", "PostgreSQL", "Tailwind CSS", "API REST"],
      isCurrent: true
    },
    {
      id: 2,
      position: "Desarrollador Full Stack",
      company: "Fundación Universitaria Tecnológico Comfenalco",
      period: "2023 – 2024",
      description: "Desarrollo de aplicaciones web institucionales, optimización de rendimiento en PostgreSQL, implementación de roles y permisos, y mejora de la experiencia de usuario con interfaces modernas.",
      technologies: ["React", "Laravel", "PostgreSQL", "Tailwind CSS", "JWT"]
    },
    {
      id: 3,
      position: "Auxiliar de Sistemas",
      company: "ETEC S.A. Soluciones de Ingeniería",
      period: "2022 – 2023",
      description: "Soporte técnico a usuarios, administración de accesos, mantenimiento de equipos y resolución de incidentes en sistemas operativos y aplicaciones corporativas.",
      technologies: ["Windows Server", "Active Directory", "SQL Server", "Soporte Técnico"]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const timelineVariants = {
    hidden: { 
      scaleX: 0,
      originX: 0
    },
    visible: {
      scaleX: 1,
      originX: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  }

  return (
    <motion.div
      className="min-h-[80vh]"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <div className="container mx-auto px-4 py-8 pt-40">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Experiencia Profesional
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Mi trayectoria como desarrollador Full Stack
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pb-8" ref={experienceRef}>
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            {/* Línea horizontal principal */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-1 bg-blue-400 transform -translate-y-1/2"
              variants={timelineVariants}
              initial="hidden"
              animate={isExperienceRefInView ? "visible" : "hidden"}
            />

            {/* Cards del timeline */}
            <motion.div
              className="relative flex justify-between items-center"
              variants={containerVariants}
              initial="hidden"
              animate={isExperienceRefInView ? "visible" : "hidden"}
            >
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="flex flex-col items-center w-1/3"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Punto del timeline */}
                  <div className="relative mb-4">
                    <div className={`w-4 h-4 ${exp.isCurrent ? 'bg-blue-500 ring-4 ring-blue-100' : 'bg-blue-400'} rounded-full ring-4 ring-white shadow-lg z-10`} />
                    {exp.isCurrent && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-md whitespace-nowrap">
                          Más reciente
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card de experiencia */}
                  <div className={`bg-white rounded-xl shadow-lg p-5 ${exp.isCurrent ? 'w-80 border-blue-200 border-2' : 'w-72 border-gray-100'} hover:shadow-xl transition-all duration-300`}>
                    {/* Header */}
                    <div className="mb-3">
                      <h3 className={`font-bold text-gray-900 mb-1 ${exp.isCurrent ? 'text-lg' : 'text-base'}`}>
                          {exp.position}
                        </h3>
                      <div className="flex items-center gap-2 text-blue-600 font-semibold mb-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.period}
                      </div>
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-700 text-xs mb-3 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Tecnologías */}
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile/Tablet - Scroll Horizontal */}
          <div className="lg:hidden">
            <motion.div
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              variants={containerVariants}
              initial="hidden"
              animate={isExperienceRefInView ? "visible" : "hidden"}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="flex-none w-80 snap-center"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Card de experiencia mobile */}
                  <div className={`bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 ${exp.isCurrent ? 'border-blue-200 border-2' : 'border-gray-100'} h-full`}>
                    {/* Timeline indicator */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className={`w-3 h-3 ${exp.isCurrent ? 'bg-blue-500 ring-2 ring-blue-100' : 'bg-blue-400'} rounded-full ring-2 ring-white shadow-md`} />
                        {exp.isCurrent && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-md whitespace-nowrap">
                              Más reciente
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={`h-1 flex-1 ${exp.isCurrent ? 'bg-blue-500' : 'bg-blue-400'}`} />
                    </div>

                    {/* Header */}
                    <div className="mb-3">
                      <h3 className={`font-bold text-gray-900 mb-1 ${exp.isCurrent ? 'text-lg' : 'text-base'}`}>
                          {exp.position}
                        </h3>
                      <div className="flex items-center gap-2 text-blue-600 font-semibold mb-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.period}
                      </div>
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-700 text-xs mb-3 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Tecnologías */}
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  )
}

export default Experience
