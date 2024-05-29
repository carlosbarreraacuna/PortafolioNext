"use client"
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import NavLink from "./navLink";
import {motion} from "framer-motion";


{/* LINKS PARA ACCEDER A LOS DIFERENTES APARTADOS DE LA LISTA DEL MENU */ }
const links = [
  { url: "/", title: "Inicio" },
  { url: "/Biografia", title: "Biografia" },
  { url: "/portafolio", title: "Portafolio" },
  { url: "/contacto", title: "Contacto" },
];

const Navbar = () => {

  {/* OPEN COMIENZA EN FALSE Y SET OPEN AL SER ACCIONADO ACCIONA EL BOTON PARA DESPLEGAR EL MENU RESPONSIVE AL SER ACCIONADO */ }
  const [open, setOpen] = useState(false);

   {/* TOP VARIANTS PARA HACER EL ICONO DE CERRAR NAVBAR AL MOMENTO EN EL QUE ESTA RESPONSIVE */ }
  const topVariatns={
    closed:{
      rotate:0,
    },
    opened:{
      rotate:45,
      backgroundColor:"rgb(255,255,255)"
    }
  }

  const centerVariatns={
    closed:{
      opacity:1,
    },
    opened:{
      opacity:0,
     
    }
  }

  const bottomVariatns={
    closed:{
      rotate:0,
    },
    opened:{
      rotate:-45,
      backgroundColor:"rgb(255,255,255)"
    }
  }

  {/* Animaciones para la lista del navbar responsive (Animaciones laterales) */}
  const listVariatns={
    closed:{
      x: "100vw", 
    },
    opened:{
      x: 0,
      transition: {
        when:"beforeChildren",
        staggerChildren:0.2,
      }
    }
  }
  
  {/* Animacion para la lista del navbar responsive (listado de opciones) */}
  const listItemVariants={
    closed:{
      x: -10, 
      opacity:0,
    },
    opened:{
      x: 0,
      opacity:1,
    }
  }


  return (
    <div className="flex items-center justify-between h-full px-4 text-xl sm:px-8 md:px-12 lg:px-20 xl:px-48">
      <div className="xl:flex xl:justify-center xl:w-1/3">
        <Link href="/">
          <div className="flex items-center justify-center p-1 text-sm font-semibold bg-black rounded-md">
            <span className="mr-1 text-white">Carlos</span>
            <span className="flex items-center justify-center w-16 text-black bg-white rounded h-7">Barrera</span>
          </div>
        </Link>
      </div>
      {/* HIDDEN PARA OCULTAR EL MENU DE NAVEGACION AL MOMENTO EN EL QUE ESTE SEA RESPONSIVE */}
      <div className="hidden gap-4 text-black md:flex ">
        {/* LINKS PARA ACCEDER AL MENU DE NAVEGACION EN EL MOMENTO EN QUE ESTA EN PANTALLA COMPLETA */}
        {links.map(link => (
          <NavLink link={link} key={link.title}/>
          // <Link href={link.url} key={link.title}>{link.title}</Link>
        ))}
      </div>
      {/* LOGO */}
       {/* LINKS ICONOS */}
      <div className="justify-end hidden w-1/3 gap-4 just md:flex">        
        <Link href="https://github.com/carlosbarreraacuna">
        <Image src="/github.png" alt="" width={24} height={24}/> 
        </Link>
        <Link href="https://www.linkedin.com/in/carlosbarrera2/">
        <Image src="/linkedin.png" alt="" width={24} height={24}/> 
        </Link>
        <Link href="https://www.instagram.com/karliii05/">
        <Image src="/instagram.png" alt="" width={24} height={24}/> 
        </Link>
        
      </div>
      <div className="md:hidden">
        {/* BOTON MENU RESPONSIVE */}
        <button className="relative z-50 flex flex-col justify-between w-10 h-8"
          onClick={(() => setOpen(prev => !prev))}>   {/* CONTROLA EL COMPORTAMIENTO DEL BOTON AL SER ACCIONADO */}
          <motion.div variants={topVariatns}  animate={open ? "opened" : "closed"} className="w-10 h-1 origin-left bg-black rounded" ></motion.div>
          <motion.div variants={centerVariatns} animate={open ? "opened" : "closed"} className="w-10 h-1 bg-black rounded" ></motion.div>
          <motion.div variants={bottomVariatns} animate={open ? "opened" : "closed"} className="w-10 h-1 origin-left bg-black rounded" ></motion.div>
        </button>
        {/* LISTA DEL MENU */}
        {open && (

          <motion.div variants={listVariatns} initial="closed" animate="opened" className="absolute top-0 left-0 z-40 flex flex-col items-center justify-center w-screen h-screen gap-8 text-4xl text-white bg-black">
            {/* LINKS PARA ACCEDER AL MENU DE NAVEGACION EN EL MOMENTO EN QUE ESTA RESPONSIVE */}
            {links.map(link => (
              <motion.div variants={listItemVariants} className="" key={link.title}>
              <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Navbar;
