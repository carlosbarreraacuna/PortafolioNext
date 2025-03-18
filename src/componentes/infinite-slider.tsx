"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CompactSkillsSlider() {
  // Lista de habilidades con íconos
  const skills = [
    { src: "/habilidades/html-5.svg", alt: "HTML" },
    { src: "/habilidades/css-3.svg", alt: "CSS" },
    { src: "/habilidades/javascript.svg", alt: "JavaScript" },
    { src: "/habilidades/typescript.svg", alt: "TypeScript" },
    { src: "/habilidades/react.svg", alt: "React JS" },
    { src: "/habilidades/next-js.svg", alt: "Next.js" },
    { src: "/habilidades/php.svg", alt: "PHP" },
    { src: "/habilidades/codeigneiter3.svg", alt: "CodeIgniter" },
    { src: "/habilidades/laravel.svg", alt: "Laravel" },
    { src: "/habilidades/postgresql.svg", alt: "PostgreSQL" },
  ]

  // Duplicamos las habilidades para crear un efecto de bucle continuo
  const duplicatedSkills = [...skills, ...skills]

  return (
    <div className="relative w-full overflow-hidden py-2">
      <div className="relative flex items-center">
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "1rem", whiteSpace: "nowrap" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 15,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.map((skill, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <div className="bg-white/80 p-2 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-110">
                <Image
                  src={skill.src || "/placeholder.svg"}
                  alt={skill.alt}
                  width={30}
                  height={30}
                  className="object-contain w-[30px] h-[30px] min-w-[30px] min-h-[30px]"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

