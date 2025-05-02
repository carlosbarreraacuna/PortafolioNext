"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const About = () => {
  const containerRef = useRef()
  const skillRef = useRef()
  const experienceRef = useRef()
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" })
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" })

  return (
    <motion.div
      className="min-h-screen"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* CONTAINER */}
      <div className="flex flex-col" ref={containerRef}>
        {/* BIOGRAFIA Y HABILIDADES */}
        {/* <div className="flex flex-col p-4 text-black sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:justify-between"> */}
            {/* BIOGRAFIA CONTAINER */}
            {/* <div className="flex flex-col mb-6 lg:mb-0 lg:w-3/5">
              <h1 className="text-2xl font-bold mb-2">BIOGRAFIA</h1>
              <p className="text-sm lg:text-base mb-2">
                Soy una persona completamente enfocada al área de sistemas de información y el área de desarrollo de
                software dedicado a el aprendizaje de manera autodidacta adquiriendo conocimientos mediante recursos
                tecnológicos, teniendo en cuenta una identidad asertiva, disciplinada, responsable y con sentido de
                pertenencia. Estando siempre a la vanguardia de las tendencias en el campo tecnológico y laboral
                otorgando innovación y creatividad a lo proyectado a empresas, ayudando a la resolución de los problemas
                al interior de ella.
              </p>
              <span className="italic text-sm mb-1">Desarrollador de software: FrontEnd - Backend</span>
              <div className="self-end">
                <img src="/Carlos_Barrera_firma.png" alt="Firma" className="h-8" />
              </div>
            </div> */}

            {/* SKILLS CONTAINER */}
            {/* <div className="flex flex-col lg:w-2/5" ref={skillRef}>
              <motion.h1
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                className="text-xl font-bold mb-2"
              >
                HABILIDADES
              </motion.h1>
              <motion.div
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                className="grid grid-cols-5 gap-2"
              >
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/html-5.svg" alt="HTML" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/css-3.svg" alt="CSS" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/javascript.svg" alt="JAVASCRIPT" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/typescript.svg" alt="TYPESCRIPT" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/react.svg" alt="REACT JS" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/next-js.svg" alt="NEXT JS" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/php.svg" alt="PHP" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/codeigneiter3.svg" alt="CODEIGNEITER" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/laravel.svg" alt="LARAVEL" className="w-8 h-8" />
                </div>
                <div className="transition duration-75 ease-in-out hover:scale-110">
                  <img src="/habilidades/postgresql.svg" alt="POSTGRESQL" className="w-8 h-8" />
                </div>
              </motion.div>
            </div> */}
          {/* </div>
        </div> */}

        {/* EXPERIENCIA - HOJA DE RUTA */}
        <div className="p-6 flex flex-col flex-1">
        <motion.div
  className="container mx-auto p-4 text-center"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="font-bold text-6xl font-display">Experiencia</h2>
  <p className="text-xl mt-2 text-slate-500">Sobre la experiencia laboral</p>
</motion.div>

          {/* Contenedor sin altura fija ni scroll */}
          <div className="pr-2">
            {/* EXPERIENCE ROADMAP */}
            <div className="flex flex-col">
              {/* EXPERIENCE ITEM 1 */}
              <div className="relative mb-8 lg:mb-12">
                <div className="flex flex-col lg:flex-row lg:items-start">
                  {/* Fecha y empresa - a la izquierda en desktop */}
                  <div className="lg:w-1/4 mb-2 lg:mb-0 lg:pr-6 lg:text-right">
                    <div className="text-sm font-semibold text-red-400">2023 - 2025</div>
                    <div className="text-sm font-semibold">Tecnologico Comfenalco</div>
                  </div>

                  {/* Línea central con punto */}
                  <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-16 relative">
                    <div className="w-4 h-4 bg-white rounded-full ring-4 ring-red-400 z-10"></div>
                    <div className="w-0.5 bg-gray-600 absolute top-4 bottom-0 z-0 h-[calc(100%+3rem)]"></div>
                  </div>

                  {/* Contenido - a la derecha en desktop */}
                  <div className="lg:w-3/4 lg:pl-6 bg-white/5 p-4 rounded-lg border-l-4 border-red-400 lg:border-l-0 lg:border-none lg:shadow-lg">
                    <div className="font-semibold text-lg">Desarrollador Full-Stack</div>
                    <div className="text-xs mt-2">
                      • Diseñé una interfaz moderna y accesible con Tailwind CSS, optimizando la usabilidad y mejorando
                      la experiencia del usuario final.
                      <br />• Implementé validaciones tanto en el backend como en el frontend para garantizar la
                      integridad de la información y prevenir errores en el ingreso de datos.
                      <br />• Optimicé el rendimiento del Sistema de Atención Psicológica y el Software para Prácticas
                      Universitarias mediante la implementación de consultas eficientes en PostgreSQL, asegurando una
                      respuesta rápida y una mejor gestión de datos.
                      <br />• Fortalecí la seguridad y administración del acceso en ambos sistemas al configurar roles y
                      permisos con Spatie, garantizando un control adecuado de usuarios según sus funciones.
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPERIENCE ITEM 2 */}
              <div className="relative mb-8 lg:mb-12">
                <div className="flex flex-col lg:flex-row lg:items-start">
                  {/* Fecha y empresa - a la izquierda en desktop */}
                  <div className="lg:w-1/4 mb-2 lg:mb-0 lg:pr-6 lg:text-right">
                    <div className="text-sm font-semibold text-red-400">Jun 2022 - Dic 2022</div>
                    <div className="text-sm font-semibold">ETEC INTERNATIONAL</div>
                  </div>

                  {/* Línea central con punto */}
                  <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-16 relative">
                    <div className="w-4 h-4 bg-white rounded-full ring-4 ring-red-400 z-10"></div>
                    <div className="w-0.5 bg-gray-600 absolute top-0 bottom-0 z-0 h-[calc(100%+3rem)]"></div>
                  </div>

                  {/* Contenido - a la derecha en desktop */}
                  <div className="lg:w-3/4 lg:pl-6 bg-white/5 p-4 rounded-lg border-l-4 border-red-400 lg:border-l-0 lg:border-none lg:shadow-lg">
                    <div className="font-semibold text-lg">Auxiliar de sistemas</div>
                    <div className="text-xs mt-2">
                      • Mantenimiento de equipos de cómputo
                      <br />• Protocolo de usuarios de red y manejo de contraseñas en el dominio ETEC
                      <br />• Permisos de usuarios en los recursos compartidos en el sistema de la compañía
                      <br />• Configuración de la cuenta de correo en el dominio ETEC y políticas de uso
                      <br />• Actualizar y formatear equipos de cómputo
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPERIENCE ITEM 3 */}
              <div className="relative">
                <div className="flex flex-col lg:flex-row lg:items-start">
                  {/* Fecha y empresa - a la izquierda en desktop */}
                  <div className="lg:w-1/4 mb-2 lg:mb-0 lg:pr-6 lg:text-right">
                    <div className="text-sm font-semibold text-red-400">Feb 2022 - Jun 2022</div>
                    <div className="text-sm font-semibold">Tecnologico Comfenalco</div>
                  </div>

                  {/* Línea central con punto */}
                  <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-16 relative">
                    <div className="w-4 h-4 bg-white rounded-full ring-4 ring-red-400 z-10"></div>
                    <div className="w-0.5 bg-gray-600 absolute top-0 z-0 h-24"></div>
                  </div>

                  {/* Contenido - a la derecha en desktop */}
                  <div className="lg:w-3/4 lg:pl-6 bg-white/5 p-4 rounded-lg border-l-4 border-red-400 lg:border-l-0 lg:border-none lg:shadow-lg">
                    <div className="font-semibold text-lg">Auxiliar de recursos educativos</div>
                    <div className="text-xs mt-2">
                      • Brindar soporte a salas de sistemas
                      <br />• Realizar el respectivo soporte y reporte de computadores que requieren de mantenimiento
                      <br />• Requerimientos de software, reporte de computadores dañados
                      <br />• Reportes mensuales del estado de equipos en salas de sistemas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
