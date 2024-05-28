"use client";

import Image from "next/image";

const prueba = () => {
  
  return (
    <div className="px-10 py-20 flex justify-center">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-24 max-w-6xl">
          <div className="text-black max-w-xl space-y-6">
            <h1 className="text-4xl font-bold">Hola, me llamo Jorge del Casar</h1>
            <p className="text-lg">
              Soy Engineering Manager con sólida formación técnica y habilidades de comunicación.
            </p>
            <div className="flex space-x-2">
              <button variant="secondary">Desarrollador</button>
              <button variant="secondary">Ponente</button>
              <button variant="secondary">Escritor</button>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden">
            <img
              alt="Jorge del Casar"
              className="h-80 w-80 object-cover"
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
      
  );
};

export default prueba;
