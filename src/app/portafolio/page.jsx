const portafolio = () => {
  return (
    <div>
      <div class="flex items-center justify-center lg:h-full text-black">
        <div class="container mt-16 mx-auto p-4">
        <h2 class="font-bold text-center text-6xl  font-display">
        Proyectos
      </h2>
      <p class="text-center mt-4 mb-4 font-medium text-slate-500">Aquí podrás encontrar una selección de mis mejores trabajos y proyectos.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
            
            <div class="bg-white rounded-lg border p-4">
              <img
                src="/sap.png"
                alt="sap"
                class="w-full h-48 rounded-md object-cover"
              />
              <div class="px-1 py-4">
                <div class="font-bold text-xl mb-2">Sistema de atencion psicologica
                <span class="ml-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">PHP</span>
                <span class="ml-2 inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">Codeigneiter 3</span>
                <span class="ml-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">PostgreSQL</span>
                <span class="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Javascript</span>
                </div>
                <p class="text-gray-700 text-base">
                Desarrollado con PHP y el framework CodeIgniter 3 este sistema agiliza la gestión de consultorios y el seguimiento de pacientes. Facilita la programación de citas, el registro de historiales clínicos detallados y la generación de informes personalizados. Mejorando la experiencia de atención y el seguimiento del progreso terapéutico.
                </p>
              </div>
              <div class="px-1 py-4">
                <a href="/contacto" class="text-blue-500 hover:underline">
                  Mas informacion
                </a>
              </div>
            </div>
            <div class="bg-white rounded-lg border p-4">
              <img
                src="/image.png"
                alt="Placeholder Image"
                class="w-full h-48 rounded-md object-cover"
              />
              <div class="px-1 py-4">
                <div class="font-bold text-xl mb-2">Ecommerce - TesloShop
                <span class="ml-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">En desarrollo</span>
                <span class="ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Next JS</span>
                <span class="ml-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Zustand</span>
                <span class="ml-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">Prisma</span>

                </div>

                <p class="text-gray-700 text-base">
                E-commerce, actualmente en desarrollo con la tecnología Next.js, se perfila como una plataforma innovadora y ágil para la compra en línea. Con un enfoque en la experiencia del usuario, creando un espacio intuitivo y visualmente atractivo donde los clientes podrán descubrir y adquirir productos de manera sencilla y segura.
                </p>
              </div>
              <div class="px-1 py-4">
                <a href="/contacto" class="text-blue-500 hover:underline mr-2">
                  Mas informacion 
                </a>
                <a href="https://github.com/carlosbarreraacuna/Ecommerce" class="text-blue-500 hover:underline">
                  Git hub 
                </a>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default portafolio;
