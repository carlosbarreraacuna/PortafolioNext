import Image from "next/image";
// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-between min-h-screen p-24">
//       Hello world
//     </main>
//   );
// }

const Home = () => {
  return <div className="flex flex-col h-full px-4 text-xl lg:flex-row sm:px-8 md:px-12 lg:px-20 xl:px-48">
  {/* IMAGE CONTAINER */ }
  <div className="relative h-1/2 lg:h-full lg:w-1/2">
    <Image src="/perfil.png" alt="" fill className="object-contain"/>
  </div>
  {/* TEXT CONTAINER */ }
  <div className="flex flex-col items-center justify-center gap-8 lg:h-full lg:w-1/2 h-1/2">
    {/* TITULO */ }
    <hi className="text-4xl font-bold text-black md:text-6xl">DESARROLLADOR DE SOFTWARE</hi>
    {/* DESCRIPCION */ }
    <p className="text-black md:text-xl">Lorem Ipsum es simpleto. Lol texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona</p>
     {/* BOTONES */ }
    <div className="flex w-full gap-4">
      <button className="p-4 text-white bg-black rounded-lg ring-1 ring-black">Conoceme</button>
      <button className="p-4 text-black rounded-lg ring-1 ring-black">Contactame</button>
    </div>
  </div>
  </div>
}

export default Home ; 


