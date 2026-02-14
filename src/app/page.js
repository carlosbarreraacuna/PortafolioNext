"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import AnimationText from "@/componentes/AnimationText"
import CompactSkillsSlider from "@/componentes/infinite-slider"

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Forzar reproducción automática
      video.muted = true
      video.play().catch(error => {
        console.log("Autoplay bloqueado")
      })
      setVideoLoaded(true) // Marcar como cargado para no mostrar botón
    }
  }, [])

  return (
    <>
      <motion.div
        initial={{ y: "-200vh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
        className="min-h-screen"
      >
        {/* HERO SECTION */}
        <section className="h-screen relative overflow-hidden pt-40">
          {/* Background Video */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-x-[-1]"
              preload="auto"
              controls={false}
            >
              <source src="/ia.mp4" type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
            
                        
            {/* Blur muy sutil y graduado */}
            <div className="absolute inset-0">
              {/* Gradiente muy suave - casi imperceptible */}
              <div className="absolute top-0 left-0 w-3/5 h-full backdrop-blur-[1px]">
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/5 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {/* Hero Content - Left Side */}
          <div className="relative z-30 h-full flex items-center">
            <div className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="flex flex-col items-start justify-center gap-6 lg:gap-8 max-w-2xl">
                {/* TITULO */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  <AnimationText />
                </h1>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-white font-medium">
                  Ingeniero de sistemas - Desarrollador Full Stack
                </h2>

                {/* DESCRIPCION */}
                <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Ingeniero de Sistemas con sólida experiencia en desarrollo de aplicaciones y soporte técnico. He trabajado en el mantenimiento, evolución y mejora de plataformas empresariales, combinando tareas de desarrollo, soporte a usuarios y administración de accesos.
                  <br className="hidden sm:block" />
                  Manejo tecnologías como Laravel, Next.js, PostgreSQL, Tailwind CSS y APIs REST, así como procesos de soporte técnico, documentación y control de versiones con Git.
                  <br className="hidden sm:block" />
                  Comprometido con la calidad del software, la estabilidad operativa y la mejora de la experiencia del usuario.
                </p>

                {/* BOTONES */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                  <a href="/Experiencia" className="cursor-pointer inline-block text-white font-semibold text-sm sm:text-base px-6 py-3 text-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Experiencia
                  </a>
                  <button className="cursor-pointer inline-block text-white font-semibold text-sm sm:text-base px-6 py-3 text-center bg-gradient-to-r from-red-500 to-red-600 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Contactame
                  </button>
                </div>

                {/* Infinite Slider Section */}
                <div className="w-full mt-8">
                  <CompactSkillsSlider />
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Home

