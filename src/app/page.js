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
          <h1 className="text-4xl font-bold text-black sm:pt-10 md:text-6xl">
            Hola, mi nombre es Carlos Barrera
          </h1>
          <h1 className="text-xl text-black sm:text-xl md:text-xl">
            <AnimationText/>
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
              className="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
            >
              Conoceme
            </button>
            <button
              href="/contacto"
              className="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
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
