"use client";

import Lottie from "lottie-react";
import Animation from "../../app/contacto/Animation.json";
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
    <div className="w-full h-full lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
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
                    Nombres <span class="text-red-500">&#42;</span>
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
                    Apellidos <span class="text-red-500">&#42;</span>
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
                    Correo electronico <span class="text-red-500">&#42;</span>
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
                    Telefono <span class="text-red-500">&#42;</span>
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
                    Mensaje <span class="text-red-500">&#42;</span>
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
                <button class="mr-2 py-2 px-4 md:py-4 md:px-6 bg-indigo-600 flex items-center gap-2 hover:scale-95 transition-all">
                  <span class="text-xl text-white">Enviar</span>
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
                  <span className="font-semibold text-green-600 ">
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
      <div className="flex items-center justify-center p-6 lg:p-10 dark:bg-gray-800">
      <Lottie  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center" animationData={Animation} />
        
      </div>
        </div>
      </div>
    </div>
  );
};

export default prueba;
