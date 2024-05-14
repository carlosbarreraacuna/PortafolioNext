const portafolio = () => {
  return (
    <div>
      <div class="flex items-center justify-center lg:h-screen text-black">
        <div class="container mx-auto p-4">
        <h2 class="font-bold text-center text-6xl  font-display">
        Proyectos
      </h2>
      <p class="text-center mt-4 font-medium text-slate-500">Whatsamaraaaaa</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
            
            <div class="bg-white rounded-lg border p-4">
              <img
                src="/sap.png"
                alt="sap"
                class="w-full h-48 rounded-md object-cover"
              />
              <div class="px-1 py-4">
                <div class="font-bold text-xl mb-2">Sistema de atencion psicologica</div>
                <p class="text-gray-700 text-base">
                  This is a simple blog card example using Tailwind CSS. You can
                  replace this text with your own blog content.
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
                <div class="font-bold text-xl mb-2">Ecommerce - TesloShop</div>
                <p class="text-gray-700 text-base">
                  This is a simple blog card example using Tailwind CSS. You can
                  replace this text with your own blog content.
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
