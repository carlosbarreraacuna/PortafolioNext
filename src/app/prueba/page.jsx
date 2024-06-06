"use client";

import Image from "next/image";


const Prueba = () => {
  return (

    <div className="h-full">
      {/* {CONTAINER} */}
      <div className="h-full overflow-scroll lg:flex">
        {/* {TEXT CONTAINER} */}
        <div className="flex flex-col gap-24 p-4 text-black sm:p-8 md:p-12 lg:p-20 xl:p-48 md:gap-32 lg:gap-48 xl:gap-64 lg:w-2/3 lg:pr-0 xl:w-1/2">
          {/* BIOGRAFIA CONTAINER */}
          <div className="flex flex-col justify-center gap-12">
            {/* BIOGRAFIA title */}
            <h1 className="text-2xl font-bold ">Hola, me llamo Carlos Alberto Barrera Acuña</h1>
            {/* BIOGRAFIA desc */}
            <p className="text-lg">
              Soy Engineering Manager con sólida formación técnica y habilidades de comunicación.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Desarrolador</button>
              <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Proyectos</button>
              <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Contactame</button>

            </div>
            {/* BIOGRAFIA quote */}
            <span className="italic">
              Desarrollador de software: FrontEnd - Backend
            </span>
          </div>
        </div>
        <div className="sticky top-0 z-30 w-full lg:w-1/3 xl:w-1/2">
          <div className="flex items-center justify-center h-5/6">
            <Image
              alt="Carlos Alberto Barrera Acuña"
              className="object-cover h-80 w-80"
              height="300"
              src="/azul.png"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width="300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prueba;
