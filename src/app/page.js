"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import  AnimationText  from "@/componentes/AnimationText";





const Home = () => {
  return (
    <motion.div
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col items-center justify-center h-full gap-4 px-24 text-xl lg:flex-row sm:px-8 md:px-12 lg:px-20 lg:py-20 xl:px-48">
        {/* TEXT CONTAINER */}
        <div className="flex flex-col items-start justify-center gap-8 lg:h-full lg:w-1/2 h-1/2">
          {/* TITULO */}
          <h1 className="text-xl font-bold text-black sm:pt-10 md:text-2xl">
          <AnimationText/>
          </h1>
          <h1 className="text-xl text-black sm:text-xl md:text-xl">
            Ingeniero de sistemas - Desarrollador FrontEnd
          </h1>
          
          {/* DESCRIPCION */}
          <p className="text-black md:text-xl">
            Soy un ingeniero de sistemas enfocado en el desarrollo de software,
            poseo amplia experiencia en el desarrollo de soluciones innovadoras
            orientadas a la eficiencia y usabilidad.
          </p>
          {/* BOTONES */}
          <div className="flex w-full gap-4">
            <button
              href="/Biografia"
              className="cursor-pointer inline-block text-white font-bold relative text-[14px] px-6 py-3 text-center bg-gradient-to-r from-blue-400 from-10% via-blue-500 via-30% to-blue-600 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-blue-400 before:from-10% before:via-blue-500 before:via-30% before:to-blue-600 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-blue-700 focus:ring-blue-700/50"
            >
              Conoceme
            </button>
            <button
              href="/contacto"
              className="cursor-pointer inline-block text-white font-bold relative text-[14px] px-6 py-3 text-center bg-gradient-to-r from-red-400 from-10% via-red-500 via-30% to-red-600 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-red-400 before:from-10% before:via-red-500 before:via-30% before:to-red-600 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-red-700 focus:ring-red-700/50"
            >
              Contactame
            </button>
          </div>
        </div>
        {/* IMAGE CONTAINER */}
        <div className="flex flex-col items-center justify-center mx-auto lg:h-full lg:w-1/2 h-1/2">
          <div className="bg-transparent border-2 rounded-full vbv"> 
            
          <Image className="rounded-full" src="/azul.png" 
          alt=""
          width={500}
          height={500} 
           />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
