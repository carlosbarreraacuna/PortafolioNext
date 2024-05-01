"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const text = "Hola";

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
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col h-full px-4 lg:flex-row sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER */}
        <div className="flex items-center justify-center text-6xl text-black h-1/2 lg:h-full lg:w-1/2">
          <div>
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}
            😊
          </div>
        </div>
        {/* FORM CONTAINER */}
        <form
          onSubmit={sendEmail}
          ref={form}
          className="flex flex-col justify-center h-full gap-8 p-8 text-xl text-black sm:p-16 md:p-20 lg:p-24 lg:h-full lg:w-1/2 bg-red-50 rounded-xl"
          //className="flex flex-col justify-center gap-8 p-24 text-xl text-black sm:h-full h-1/2 lg:h-full lg:w-1/2 bg-red-50 rounded-xl"
        >
          <span>Mensaje</span>
          <textarea
            rows={6}
            className="bg-transparent border-b-2 outline-none resize-none border-b-black"
            name="user_message"
          placeholder="Escribe un mensaje aqui"/>
          <span>Correo electronico</span>
          <input
            name="user_email"
            type="text"
            className="bg-transparent border-b-2 outline-none border-b-black"
          />
          
          <button className="p-4 font-semibold text-gray-600 bg-purple-200 rounded">
            Enviar
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
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;