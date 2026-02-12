"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import AnimationText from "@/componentes/AnimationText"
import CompactSkillsSlider from "@/componentes/infinite-slider"

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ y: "-200vh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
        className="h-full flex items-center justify-center"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 gap-8 lg:gap-12 pt-32 sm:pt-40 lg:pt-48">
          {/* TEXT CONTAINER */}
          <div className="flex flex-col items-center lg:items-start justify-center gap-4 lg:gap-6 w-full lg:w-1/2 max-w-lg pt-8 sm:pt-12 md:pt-16 lg:pt-20">
            {/* TITULO */}
            <h1 className="text-xl sm:text-2xl font-bold text-black text-center lg:text-left w-full">
              <AnimationText />
            </h1>
            <h2 className="text-lg sm:text-xl text-black text-center lg:text-left w-full font-medium">
              Ingeniero de sistemas - Desarrollador Full Stack
            </h2>

            {/* DESCRIPCION */}
            <p className="text-gray-700 text-sm sm:text-base text-center lg:text-left leading-relaxed">
            Ingeniero de Sistemas con sólida experiencia en desarrollo de aplicaciones y soporte técnico. He trabajado en el mantenimiento, evolución y mejora de plataformas empresariales, combinando tareas de desarrollo, soporte a usuarios y administración de accesos.
            <br className="hidden sm:block" />
            Manejo tecnologías como Laravel, Next.js, PostgreSQL, Tailwind CSS y APIs REST, así como procesos de soporte técnico, documentación y control de versiones con Git.
            <br className="hidden sm:block" />
            Comprometido con la calidad del software, la estabilidad operativa y la mejora de la experiencia del usuario.
            </p>

            {/* BOTONES */}
            <div className="flex flex-col sm:flex-row w-full justify-center lg:justify-start gap-3 sm:gap-4 mt-4">
              <a href="/Experiencia" className="cursor-pointer inline-block text-white font-semibold text-sm sm:text-base px-6 py-3 text-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Experiencia
              </a>
              <button className="cursor-pointer inline-block text-white font-semibold text-sm sm:text-base px-6 py-3 text-center bg-gradient-to-r from-red-500 to-red-600 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contactame
              </button>
            </div>

            {/* Infinite Slider Section */}
            <div className="w-full mt-6">
              <CompactSkillsSlider />
            </div>
          </div>

          {/* IMAGE CONTAINER */}
          <div className="flex items-center justify-center w-full lg:w-1/2 h-full py-4 lg:py-0">
            <div className="bg-transparent border-4 border-white/20 backdrop-blur-sm rounded-full w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] xl:w-[520px] xl:h-[520px] relative shadow-2xl">
              <Image
                src="/azul.png"
                alt="Profile Image"
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 400px, (max-width: 1280px) 460px, 520px"
                priority
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Home

