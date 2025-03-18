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
        <div className="flex flex-col lg:flex-row items-center justify-between w-full h-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          {/* TEXT CONTAINER */}
          <div className="flex flex-col items-center lg:items-start justify-center gap-3 lg:gap-4 w-full lg:w-1/2 h-full pt-4 lg:pt-0">
            {/* TITULO */}
            <h1 className="text-xl font-bold text-black md:text-2xl text-center lg:text-left w-full">
              <AnimationText />
            </h1>
            <h1 className="text-lg md:text-xl text-black text-center lg:text-left w-full">
              Ingeniero de sistemas - Desarrollador FrontEnd
            </h1>

            {/* DESCRIPCION */}
            <p className="text-black text-sm md:text-base lg:text-lg max-w-md text-center lg:text-left">
            Ingeniero de Sistemas apasionado por el desarrollo frontend y backend, con experiencia en la creación de interfaces de usuario intuitivas y de alto rendimiento utilizando React JS y Next JS. Mi objetivo es aplicar mis habilidades en proyectos innovadores y desafiantes, contribuyendo al éxito de equipos de alto rendimiento. 
            </p>

            {/* BOTONES */}
            <div className="flex w-full justify-center lg:justify-start gap-3 md:gap-4 mt-2">
              <a href="/Experiencia" className="cursor-pointer inline-block text-white font-bold relative text-xs sm:text-sm md:text-[14px] px-3 sm:px-4 py-2 text-center bg-gradient-to-r from-blue-400 from-10% via-blue-500 via-30% to-blue-600 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-blue-400 before:from-10% before:via-blue-500 before:via-30% before:to-blue-600 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-blue-700 focus:ring-blue-700/50">
                Experiencia
              </a>
              <button className="cursor-pointer inline-block text-white font-bold relative text-xs sm:text-sm md:text-[14px] px-3 sm:px-4 py-2 text-center bg-gradient-to-r from-red-400 from-10% via-red-500 via-30% to-red-600 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-red-400 before:from-10% before:via-red-500 before:via-30% before:to-red-600 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-red-700 focus:ring-red-700/50">
                Contactame
              </button>
            </div>

            {/* Infinite Slider Section */}
            <div className="w-full mt-3 md:mt-4">
              <CompactSkillsSlider />
            </div>
          </div>

          {/* IMAGE CONTAINER */}
          <div className="flex items-center justify-center w-full lg:w-1/2 h-full py-4 lg:py-0 mt-4 lg:mt-0">
            <div className="bg-transparent border-2 rounded-full w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[360px] xl:h-[360px] relative">
              <Image
                src="/azul.png"
                alt="Profile Image"
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 280px, (max-width: 1280px) 320px, 360px"
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

