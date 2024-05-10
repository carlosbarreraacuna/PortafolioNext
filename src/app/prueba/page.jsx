"use client";

import Lottie from "lottie-react";
import Animation from "../../app/prueba/Animation.json";

const prueba = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col h-full px-4 lg:flex-row sm:px-8 md:px-12 lg:px-20 xl:px-48">
          {/* CONTAINER */}
        <div className="flex items-center justify-center text-6xl text-black h-1/2 lg:h-full lg:w-1/2">
          {/* FORM CONTAINER */}
          <div className="flex flex-col justify-center w-full h-full text-lg text-black sm:p-16 lg:h-full bg-red-50 rounded-xl">
          <div class="">
              <div class="flex justify-center">
                <h1 class="font-bold uppercase text-5xl text-black">
                  CONTACTAME
                </h1>
              </div>
              <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <input
                  class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Primer nombre*"
                />
                <input
                  class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Segundo nombre*"
                />
                <input
                  class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Correo electronico*"
                />
                <input
                  class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder="Numero de telefono*"
                />
              </div>
              <div class="my-4">
                <textarea
                  placeholder="Mensaje*"
                  class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
              <div class="my-2 w-1/2 lg:w-1/4">
                <button
                  class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
                >
                  Enviar mensaje
                </button>
              </div>
            </div>
          </div>




          
        </div>
          {/* IMAGE CONTAINER */}
          <div className="flex items-center justify-center w-full md:w-1/2">
            <Lottie animationData={Animation} />
          </div>
      </div>
    </div>              



    // <div className="flex flex-col md:flex-row">
    //   <div class="flex justify-center items-center w-screen h-screen">
    //     <div class="h-screen container mx-auto my-4 px-4 lg:px-20">
    //       <div className="flex flex-col shadow-2xl md:flex-row rounded-2xl">
    //         {/* formulario */}
    //         <div class="w-full p-8 my-4 md:px-12 lg:w-1/2 lg:pl-20 lg:pr-40">
    //           <div class="flex justify-center">
    //             <h1 class="font-bold uppercase text-5xl text-black">
    //               CONTACTAME
    //             </h1>
    //           </div>
    //           <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
    //             <input
    //               class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //               type="text"
    //               placeholder="Primer nombre*"
    //             />
    //             <input
    //               class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //               type="text"
    //               placeholder="Segundo nombre*"
    //             />
    //             <input
    //               class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //               type="email"
    //               placeholder="Correo electronico*"
    //             />
    //             <input
    //               class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //               type="number"
    //               placeholder="Numero de telefono*"
    //             />
    //           </div>
    //           <div class="my-4">
    //             <textarea
    //               placeholder="Mensaje*"
    //               class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //             ></textarea>
    //           </div>
    //           <div class="my-2 w-1/2 lg:w-1/4">
    //             <button
    //               class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
    //                   focus:outline-none focus:shadow-outline"
    //             >
    //               Enviar mensaje
    //             </button>
    //           </div>
    //         </div>
    //       <div className="flex items-center justify-center w-full md:w-1/2">
    //         <Lottie animationData={Animation} />
    //       </div>
    //       </div>

          // {/* <div
// 				class="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
// 				<div class="flex flex-col text-white">
// 					<h1 class="font-bold uppercase text-4xl my-4">Drop in our office</h1>
// 					<p class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
// 						tincidunt arcu diam,
// 						eu feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed, scelerisque ex.
// 					</p>

// 					<div class="flex my-4 w-2/3 lg:w-1/2">
// 						<div class="flex flex-col">
// 							<i class="fas fa-map-marker-alt pt-2 pr-2" />
//             </div>
//             <div class="flex flex-col">
//               <h2 class="text-2xl">Main Office</h2>
//               <p class="text-gray-400">5555 Tailwind RD, Pleasant Grove, UT 73533</p>
//             </div>
//           </div>
          
//           <div class="flex my-4 w-2/3 lg:w-1/2">
//             <div class="flex flex-col">
//               <i class="fas fa-phone-alt pt-2 pr-2" />
//             </div>
//             <div class="flex flex-col">
//               <h2 class="text-2xl">Call Us</h2>
//               <p class="text-gray-400">Tel: xxx-xxx-xxx</p>
//               <p class="text-gray-400">Fax: xxx-xxx-xxx</p>
//             </div>
//           </div>
          
//           <div class="flex my-4 w-2/3 lg:w-1/2">
//             <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer" class="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
//               <i class="fab fa-facebook-f text-blue-900" />
//             </a>
//             <a href="https://www.linkedin.com/company/enlighteneering-inc-" target="_blank" rel="noreferrer" class="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
//               <i class="fab fa-linkedin-in text-blue-900" />
//             </a>
//           </div>
//         </div>
//       </div> */}
//         </div>
//       </div>
//     </div>
  );
 };

export default prueba;
