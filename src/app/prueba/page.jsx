"use client";

import Lottie from "lottie-react";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const prueba = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        () => {
          setError(true);
        }
      );
  };
  return (
    <div class=" flex justify-center h-full items-top sm:items-center sm:pt-0">
      <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div class="h-full mt-8 overflow-hidden">
          <div class="h-full grid grid-cols-1 md:grid-cols-2">
            {/* contenedor de el formulario */}
            <form onSubmit={sendEmail} ref={form} className="text-black">
              {/* form top part containing mail icon and heading  */}
              <div class="flex flex-col md:flex-row justify-around items-start md:items-center pt-8 p-4">
                {/* heading  */}
                <h2 class="text-2xl md:text-3xl font-semibold">
                  ENVIA TU MENSAJE
                </h2>

                {/* mail svg icon  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-mail-forward "
                  width="33"
                  height="33"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="black"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
                  <path d="M3 6l9 6l9 -6" />
                  <path d="M15 18h6" />
                  <path d="M18 15l3 3l-3 3" />
                </svg>
              </div>

              {/* bottom form with input fields  */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 px-4 md:py-12 md:px-8 text-sm">
                {/* name input  */}
                <div class="flex flex-col gap-1">
                  <label class="font-semibold">
                    Name <span class="text-red-500">&#42;</span>
                  </label>
                  <input
                    class="border-[1px] p-2 rounded-md"
                    placeholder="Nombres"
                    required
                    name="name"
                    type="text"
                  />
                </div>
                {/* name2 input  */}
                <div class="flex flex-col gap-1">
                  <label class="font-semibold">
                    Name <span class="text-red-500">&#42;</span>
                  </label>
                  <input
                    class="border-[1px] p-2 rounded-md"
                    placeholder="Apellidos"
                    required
                    name="name2"
                    type="text"
                  />
                </div>

                {/* email input  */}
                <div class="flex flex-col gap-1">
                  <label class="font-semibold">
                    Email <span class="text-red-500">&#42;</span>
                  </label>
                  <input
                    class="border-[1px] p-2 rounded-md"
                    placeholder="Correo electronico"
                    required
                    name="user_email"
                    type="email"
                  />
                </div>

                {/* phone number input  */}
                <div class="flex flex-col gap-1">
                  <label class="font-semibold">
                    Phone <span class="text-red-500">&#42;</span>
                  </label>
                  <input
                    class="border-[1px] p-2 rounded-md"
                    placeholder="Numero de telefono"
                    required
                    name="phone"
                    type="tel"
                  />
                </div>

                

                {/* message input  */}
                <div class="flex flex-col gap-1 md:col-span-2">
                  <label class="font-semibold">
                    Message <span class="text-red-500">&#42;</span>
                  </label>
                  <textarea
                    class="border-[1px] p-2 rounded-md"
                    placeholder="Mensaje"
                    required
                    name="user_message"
                    type="text"
                  />
                </div>
              </div>
              {/* submit button div  */}
              <div class="flex items-center justify-center md:justify-end py-4 px-8">
                {/* submit button  */}
                <button class="py-2 px-4 md:py-4 md:px-6 bg-indigo-600 flex items-center gap-2 hover:scale-95 transition-all">
                  <span class="text-xl text-white">Submit</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-telegram"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#fff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                  </svg>
                </button>
                {success && (
                  <span className="font-semibold text-green-600">
                    ¡Tu mensaje ha sido enviado exitosamente!
                  </span>
                )}
                {error && (
                  <span className="font-semibold text-red-600">
                    ¡Algo salió mal!
                  </span>
                )}
              </div>
            </form>
            {/* contenedor de la imagen */}
            <div class="p-6 mr-2 sm:rounded-lg">
              <div class="flex items-center">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="h-full">
    //   <div className="flex flex-col h-full px-4 lg:flex-row sm:px-8 md:px-12 lg:px-20 xl:px-48">
    //       {/* CONTAINER */}
    //     <div className="flex flex-col items-center justify-center text-6xl text-black h-1/2 lg:h-full lg:w-1/2">
    //       {/* FORM CONTAINER */}
    //       <div className="flex flex-col justify-center w-full h-full text-lg text-black sm:p-16 lg:h-full ">
    //       <div className="flex flex-col items-center justify-center">
    //           <div className="flex justify-center">
    //             <h1 className="text-5xl font-bold text-black uppercase">
    //               CONTACTAME
    //             </h1>
    //           </div>
    //           <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
    //             <input
    //               className="w-full p-3 mt-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:shadow-outline"
    //               type="text"
    //               placeholder="Primer nombre*"
    //             />
    //             <input
    //               className="w-full p-3 mt-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:shadow-outline"
    //               type="text"
    //               placeholder="Segundo nombre*"
    //             />
    //             <input
    //               className="w-full p-3 mt-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:shadow-outline"
    //               type="email"
    //               placeholder="Correo electronico*"
    //             />
    //             <input
    //               className="w-full p-3 mt-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:shadow-outline"
    //               type="number"
    //               placeholder="Numero de telefono*"
    //             />
    //           </div>
    //           <div className="my-4">
    //             <textarea
    //               placeholder="Mensaje*"
    //               class="w-full h-32 flex flex-col justify-start items-start bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
    //             ></textarea>
    //           </div>
    //         </div>
    //       </div>
    //           <div className="flex items-center justify-center w-1/2 my-2 lg:w-1/4">
    //             <button
    //               class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full
    //                   focus:outline-none focus:shadow-outline"
    //             >
    //               Enviar mensaje
    //             </button>
    //           </div>

    //     </div>
    //       {/* IMAGE CONTAINER */}
    //       <div className="flex items-center justify-center w-full md:w-1/2">
    //         <Lottie animationData={Animation} />
    //       </div>
    //   </div>
    // </div>

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
