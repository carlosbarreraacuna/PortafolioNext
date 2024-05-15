"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import developerAnimation from "../../app/Biografia/Developer.json";

const About = () => {
  const containerRef = useRef();

  //Movimientos para el titulo y la lista de habilidades
  const skillRef = useRef();
  // const isSkillRefInView = useInView(skillRef, {once:true});
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  //Movimientos para el titulo y la experiencia
  const experienceRef = useRef();
  // const isSkillRefInView = useInView(skillRef, {once:true});
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* {CONTAINER} */}
      <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
        {/* {TEXT CONTAINER} */}
        <div className="flex flex-col gap-24 p-4 text-black sm:p-8 md:p-12 lg:p-20 xl:p-48 md:gap-32 lg:gap-48 xl:gap-64 lg:w-2/3 lg:pr-0 xl:w-1/2">
          {/* BIOGRAFIA CONTAINER */}
          <div className="flex flex-col justify-center gap-12">
            {/* BIOGRAFIA title */}
            <h1 className="text-2xl font-bold ">BIOGRAFIA</h1>
            {/* BIOGRAFIA desc */}
            <p className="text-lg">
              Soy una persona completamente enfocada al área de sistemas de
              información y el área de desarrollo de software dedicado a el
              aprendizaje de manera autodidacta adquiriendo conocimientos
              mediante recursos tecnológicos, teniendo en cuenta una identidad
              asertiva, disciplinada, responsable y con sentido de pertenencia.
              Estando siempre a la vanguardia de las tendencias en el campo
              tecnológico y laboral otorgando innovación y creatividad a lo
              proyectado a empresas, ayudando a la resolución de los problemas
              al interior de ella.
            </p>
            {/* BIOGRAFIA quote */}
            <span className="italic">
              Desarrollador de software, FrontEnd - Backend
            </span>

            {/* BIOGRAPHY SIGN SVG*/}
            <div className="self-end">
              <img src="/Carlos_Barrera_firma.png" alt="" />
            </div>
            {/* BIOGRAPHY SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* SKILLS CONTAINER */}
          <div className="flex flex-col justify-center gap-12" ref={skillRef}>
            {/* SKILLS title */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              //transition={{ delay: 0.2 }}
              className="text-2xl font-bold"
            >
              HABILIDADES
            </motion.h1>
            {/* SKILLS LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex flex-wrap gap-4"
            >
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/html-5.svg" alt="HTML" />
              </div>
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/css-3.svg" alt="CSS" />
              </div>
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/javascript.svg" alt="JAVASCRIPT" />
              </div>
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/typescript.svg" alt="TYPESCRIPT" />
              </div>
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/react.svg" alt="REACT JS" />
              </div>
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/next-js.svg" alt="NEXT JS" />
              </div>

              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/php.svg" alt="PHP" />
              </div>
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/codeigneiter3.svg" alt="CODEIGNEITER" />
              </div>
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/laravel.svg" alt="LARAVEL" />
              </div>
              <div className="transition duration-75 ease-in-out delay-150 hover:translate-y-1 hover:scale-125">
                <img src="/habilidades/postgresql.svg" alt="POSTGRESQL" />
              </div>
            </motion.div>
            {/* SKILL SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col justify-center gap-12 pb-48"
            ref={experienceRef}
          >
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold"
            >
              EXPERIENCIA
            </motion.h1>
            {/* EXPERIENCE LIST ITEM */}
            <div className="flex justify-between h-48">
              {/* LEFT */}
              <div className="w-1/3 ">
                {/* JOB TITLE */}
                <div className="p-3 font-semibold text-black bg-white rounded-b-lg rounded-s-lg">
                  Developer Web
                </div>
                {/* JOB DESC */}
                <div className="p-3 text-sm italic text-black">
                  • Lenguajes utilizados (PHP) – Framework (
                  Codeigneiter 3)<br></br> • Desarrollo del software SAP
                  (Sistema de atención psicológica)<br></br> • Manejo de control
                  de versiones Git, Gitlab.{" "}
                </div>
                {/* JOB DATE */}
                <div className="p-3 text-sm font-semibold text-red-400">
                  2023 - Actualidad
                </div>
                {/* JOB COMPANY */}
                <div className="p-1 text-sm font-semibold text-black bg-white rounded w-fit">
                  Tecnologico Comfenalco
                </div>
              </div>
              {/* CENTER */}
              <div className="flex justify-center w-1/6">
                {/* LINE */}
                <div className="relative w-1 h-full bg-gray-600 rounded">
                  {/* LINE CIRCLE */}
                  <div className="absolute w-5 h-5 bg-white rounded-full ring-4 ring-red-400 -left-2"></div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="w-1/3 "></div>
            </div>
            {/* EXPERIENCE LIST ITEM */}
            <div className="flex justify-between h-48">
              {/* LEFT */}
              <div className="w-1/3 "></div>
              {/* CENTER */}
              <div className="flex justify-center w-1/6">
                {/* LINE */}
                <div className="relative w-1 h-full bg-gray-600 rounded">
                  {/* LINE CIRCLE */}
                  <div className="absolute w-5 h-5 bg-white rounded-full ring-4 ring-red-400 -left-2"></div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="w-1/3 ">
                {/* JOB TITLE */}
                <div className="p-3 font-semibold bg-white rounded-b-lg rounded-s-lg">
                  Auxiliar de sistemas
                </div>
                {/* JOB DESC */}
                <div className="p-3 text-sm italic">
                  • Mantenimiento de equipos de cómputo <br></br> • Protocolo de
                  usuarios de red y manejo de contraseñas en el dominio ETEC. •
                  Configuración de la cuenta de correo en el dominio ETEC y
                  políticas de uso de esta.<br></br> • Manejo de Microsoft
                  office 365 empresarial.<br></br> • Actualizar y formatear
                  equipos de cómputo.
                </div>
                {/* JOB DATE */}
                <div className="p-3 text-sm font-semibold text-red-400">
                  Jun 2022 - Dic 2022{" "}
                </div>
                {/* JOB COMPANY */}
                <div className="p-1 text-sm font-semibold bg-white rounded w-fit">
                  ETEC INTERNATIONAL
                </div>
              </div>
            </div>
            {/* EXPERIENCE LIST ITEM */}
            <div className="flex justify-between h-48">
              {/* LEFT */}
              <div className="w-1/3 ">
                {/* JOB TITLE */}
                <div className="p-3 font-semibold bg-white rounded-b-lg rounded-s-lg">
                  Auxiliar recursos educativos{" "}
                </div>
                {/* JOB DESC */}
                <div className="p-3 text-sm italic">
                  • Brindar soporte a salas de sistemas <br></br> • Realizar el respectivo
                  soporte y reporte de computadores que requieren de
                  mantenimiento y Requerimientos de software <br></br> Reporte de
                  computadores dañados y solucion de cada uno de los equipos.{" "}
                </div>
                {/* JOB DATE */}
                <div className="p-3 text-sm font-semibold text-red-400">
                  Feb 2022 - Jun 2022{" "}
                </div>
                {/* JOB COMPANY */}
                <div className="p-1 text-sm font-semibold bg-white rounded w-fit">
                  Tecnolofico Comfenalco
                </div>
              </div>
              {/* CENTER */}
              <div className="flex justify-center w-1/6">
                {/* LINE */}
                <div className="relative w-1 h-full bg-gray-600 rounded">
                  {/* LINE CIRCLE */}
                  <div className="absolute w-5 h-5 bg-white rounded-full ring-4 ring-red-400 -left-2"></div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="w-1/3 "></div>
            </div>
          </div>
        </div>

        {/* <div className="sticky top-0 z-30 hidden w-1/3 lg:block xl:w-1/2" ref={mountRef}>
                    <img src="/foto.png" alt="Descripción de la imagen" />
                </div> */}
        <div className="sticky top-0 z-30 hidden w-1/3 lg:block xl:w-1/2">
          <Lottie animationData={developerAnimation} />
        </div>
      </div>
    </motion.div>
  );
};

export default About;
