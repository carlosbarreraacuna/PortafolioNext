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
              Desarrollador de software: FrontEnd - Backend
            </span>

            {/* BIOGRAPHY SIGN SVG*/}
            <div className="self-end">
              <img src="/Carlos_Barrera_firma.png" alt="" />

              {/* <svg
                                width="185"
                                height="77"
                                viewBox="0 0 370 114"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M66 2C66 29.4851 68.6687 64.5118 49.3333 87.4444C42.4997 95.5495 35.7683 97.6796 26.2222 101C20.002 103.164 8.87322 103.873 4 99C-0.260934 94.7391 2.94804 88.1756 8.22222 86.2222C13.7053 84.1915 17.942 84 23.7778 84C33.359 84 41.3193 83.5602 50.2222 87C56.6125 89.469 63.5773 91.9131 69.5555 95.5C75.4778 99.0533 87.1838 104.357 93.5 99.4444C96.1292 97.3995 96.2752 92.5118 96.9444 89.5C97.9646 84.9092 92.6432 83.2024 89 83C84.472 82.7484 82.3397 81.8856 82 88C81.8025 91.5554 83.5627 94.4193 86 97C88.9648 100.139 92.0717 100.96 96 98.7778C99.3106 96.9386 98 90.7299 98 87.5C98 85.0327 98.4365 83.1348 99.2222 80.7778C100.357 77.3743 99.2311 78.4486 101.5 77.9444C105.352 77.0886 108 76.4766 108 81.5C108 85.6646 109 89.3473 109 93.5C109 100.142 108.863 95.0454 110.5 91.4444C112.765 86.4616 116.631 81.205 121.5 78.5C127.057 75.4129 126 82.1509 126 85.5C126 92.5532 124.42 102 134 102C142.932 102 153 102.569 153 91.2222C153 87.1735 153.772 81.3206 148 81C141.934 80.663 142.107 81.8068 139.5 86.5C134.378 95.7204 137.972 105 149.5 105C153.589 105 153.996 99.8977 155.5 96.8889C157.902 92.0843 161 85.4067 161 80C161 74.0547 158.407 82.7413 157.222 84.2222C155.194 86.7574 155 92.5718 155 95.7778C155 99.9302 153.8 104.999 158 107.222C161.954 109.316 164.884 106.382 167.778 103.778C171.15 100.743 175.896 99.1107 180 97C186.143 93.8409 191.659 91.4099 198.222 89.2222C206.505 86.4614 214.839 87 223.5 87C230.613 87 231.628 104 222.5 104C216.954 104 199.251 107.814 207 95.2222C211.456 87.9805 214.484 80.6007 220 73.7778C229.781 61.6805 242.696 50.8197 256.222 43C264.769 38.0591 274.192 34.6264 283 30.2222C286.55 28.4473 280.07 32.3343 278.5 33.5556C271.707 38.8391 266.609 45.3914 260.556 51.4444C255.356 56.6444 250.682 61.459 246.5 67.5C242.917 72.6757 239.364 77.3825 236.556 83C233.829 88.4524 231.82 94.3142 228.556 99.4444C226.693 102.371 225.518 107.823 222.5 109.5C214.795 113.78 217.517 100.438 218.056 95.0556C218.678 88.8318 227.982 85.7572 233.056 88.6111C239.614 92.3003 245.506 97.7883 252 101.778C254.886 103.551 259.46 107 263 107C271.267 107 273.32 81.9392 268.778 77.2222C264.112 72.3774 261.206 80.5039 261 84C260.576 91.2135 257.836 96.9269 264.778 102C272.242 107.454 285.041 112.276 292.111 104.833C298.002 98.6323 304.301 90.8902 308.556 83.4444C310.355 80.295 310.132 84.6251 309.444 86C305.387 94.1158 303 102.264 303 111.5C303 116.021 337.534 99.1863 340.5 98C347.33 95.2679 355.47 93.8299 361.778 90C363.935 88.6902 365.473 88 368 88"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            </svg> */}
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
                  • Lenguajes utilizados (PHP) – Framework ( Codeigneiter 3){" "}
                  <br /> • Desarrollo del software SAP (Sistema de atención
                  psicológica) <br /> • Manejo de control de versiones Git,
                  Gitlab.{" "}
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
                  • Mantenimiento de equipos de cómputo <br />
                  • Protocolo de usuarios de red y manejo de contraseñas en el
                  dominio ETEC. <br />
                  • Permisos de usuarios en los recursos compartidos en el
                  sistema de la compañía. <br />
                  • Configuración de la cuenta de correo en el dominio ETEC y
                  políticas de uso de esta. <br />• Actualizar y formatear
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
                  Auxiliar de recursos educativos{" "}
                </div>
                {/* JOB DESC */}
                <div className="p-3 text-sm italic">
                  • Brindar soporte a salas de sistemas. <br /> 
                  • Realizar el respectivo
                  soporte y reporte de computadores que requieren de
                  mantenimiento Requerimientos de software, reporte de
                  computadores dañados y Reportes mensuales del estado de equipos en salas de sistemas. <br />
                  
                </div>
                {/* JOB DATE */}
                <div className="p-3 text-sm font-semibold text-red-400">
                  Feb 2022 - Jun 2022{" "}
                </div>
                {/* JOB COMPANY */}
                <div className="p-1 text-sm font-semibold bg-white rounded w-fit">
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
