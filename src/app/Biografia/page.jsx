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
      className="h-full overflow-hidden" // Fijamos altura a la pantalla y evitamos scroll
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* CONTAINER */}
      <div className="h-full flex flex-col lg:flex-row" ref={containerRef}>
        
          <div className="flex flex-col p-4 text-black sm:p-6 md:p-8 lg:p-6 xl:p-8 lg:w-1/2 h-full overflow-hidden">
            <div className="flex flex-col h-full">
              {/* BIOGRAFIA CONTAINER */}
              <div className="flex flex-col mb-4">
                <h1 className="text-2xl font-bold mb-2">BIOGRAFIA</h1>
                <p className="text-sm lg:text-base mb-2 line-clamp-6 lg:line-clamp-none">
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
              </div>

              {/* SKILLS CONTAINER */}
              <div className="flex flex-col" ref={skillRef}>
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
              </div>
            </div>
          </div>
        <div className="w-full lg:w-1/2 h-full p-4 sm:p-6 md:p-8 lg:p-6 xl:p-8 flex flex-col">
          <motion.h1
            initial={{ x: "-300px" }}
            animate={isExperienceRefInView ? { x: "0" } : {}}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-4"
            ref={experienceRef}
          >
            EXPERIENCIA
          </motion.h1>

          {/* Esta es la única sección con scroll */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {/* EXPERIENCE TIMELINE */}
            <div className="relative pl-8 border-l-2 border-gray-600">
              {/* EXPERIENCE ITEM 1 */}
              <div className="mb-8 relative">
                {/* <div className="absolute w-4 h-4 bg-white rounded-full ring-4 ring-red-400 -left-[1.1rem] top-1"></div> */}
                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-red-400">
                  <div className="font-semibold text-lg">Desarrollador Full-Stack</div>
                  <div className="text-sm font-semibold text-red-400 mb-1">2023 - 2025</div>
                  <div className="text-sm font-semibold mb-1">Tecnologico Comfenalco</div>
                  <div className="text-xs">
                    • Diseñé una interfaz moderna y accesible con Tailwind CSS, optimizando la usabilidady mejorando la experiencia del usuario final.
                    <br />• Implementé validaciones tanto en el backend como en el frontend para garantizar laintegridad de la información y prevenir errores en el ingreso de datos.
                    <br />• Optimicé el rendimiento del Sistema de Atención Psicológica y el Software paraPrácticas Universitarias mediante la implementación de consultas eficientes enPostgreSQL, asegurando una respuesta rápida y una mejor gestión de datos.
                    <br />• Fortalecí la seguridad y administración del acceso en ambos sistemas al configurarroles y permisos con Spatie, garantizando un control adecuado de usuarios según susfunciones.
                  </div>
                </div>
              </div>

              {/* EXPERIENCE ITEM 2 */}
              <div className="mb-8 relative">
                {/* <div className="absolute w-4 h-4 bg-white rounded-full ring-4 ring-red-400 -left-[1.1rem] top-1"></div> */}
                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-red-400">
                  <div className="font-semibold text-lg">Auxiliar de sistemas</div>
                  <div className="text-sm font-semibold text-red-400 mb-1">Jun 2022 - Dic 2022</div>
                  <div className="text-sm font-semibold mb-1">ETEC INTERNATIONAL</div>
                  <div className="text-xs">
                    • Mantenimiento de equipos de cómputo
                    <br />• Protocolo de usuarios de red y manejo de contraseñas en el dominio ETEC
                    <br />• Permisos de usuarios en los recursos compartidos en el sistema de la compañía
                    <br />• Configuración de la cuenta de correo en el dominio ETEC y políticas de uso
                    <br />• Actualizar y formatear equipos de cómputo
                  </div>
                </div>
              </div>

              {/* EXPERIENCE ITEM 3 */}
              <div className="relative">
                {/* <div className="absolute w-4 h-4 bg-white rounded-full ring-4 ring-red-400 -left-[1.1rem] top-1"></div> */}
                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-red-400">
                  <div className="font-semibold text-lg">Auxiliar de recursos educativos</div>
                  <div className="text-sm font-semibold text-red-400 mb-1">Feb 2022 - Jun 2022</div>
                  <div className="text-sm font-semibold mb-1">Tecnologico Comfenalco</div>
                  <div className="text-xs">
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
    </motion.div>
  )
}

export default About

