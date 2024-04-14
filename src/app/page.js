"use client";

import Image from "next/image";
import { motion } from "framer-motion";
// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-between min-h-screen p-24">
//       Hello world
//     </main>
//   );
// }

const Home = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col h-full px-4 text-xl lg:flex-row sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/2 lg:h-full lg:w-1/2">
          <Image src="/perfil.png" alt="" fill className="object-contain" />
        </div>
        {/* TEXT CONTAINER */}
        <div className="flex flex-col items-center justify-center gap-8 lg:h-full lg:w-1/2 h-1/2">
          {/* TITULO */}
          <hi className="text-4xl font-bold text-black sm:pt-10 md:text-6xl">
            INGENIERO DE SISTEMAS
          </hi>
          {/* DESCRIPCION */}
          <p className="text-black md:text-xl">
            Soy un ingeniero de sistemas enfocado en el desarrollo de software,
            poseo amplia experiencia en el desarrollo de soluciones innovadoras
            orientadas a la eficiencia y usabilidad.
          </p>
          {/* BOTONES */}
          <div className="flex w-full gap-4">
            <a
              href="/Biografia"
              className="p-4 text-white bg-black rounded-lg ring-1 ring-black"
            >
              Conoceme
            </a>
            <a
              href="/contacto"
              className="p-4 text-black rounded-lg ring-1 ring-black"
            >
              Contactame
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
