"use client"
import { motion } from "framer-motion"

const About = () => {
    return (
        <motion.div className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}>

            {/* {CONTAINER} */}
            <div className="">

                {/* {TEXT CONTAINER} */}
                <div className="flex flex-col gap-24 p-4 text-black sm:p-8 md:p-12 md:gap-32 lg:p-20 lg:gap-48 xl:p-48 xl:gap-64">
                    {/* BIOGRAFIA CONTAINER */}
                    <div className="flex flex-col justify-center gap-12">
                        <h1 className="text-2xl font-bold ">BIOGRAFIA</h1>
                        <p className="text-lg">
                            Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Ducimus optio doloribus
                            voluptas! Illo tenetur nesciunt aliquid aliquam
                            dolorum architecto quos!
                        </p>
                        <span className="italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, at?</span>
                        <div className=""></div>
                        {/* AQUI AGREGAR SVG FALTANTE */}
                    </div>
                    {/* SKILLS CONTAINER */}
                    <div className="flex flex-col justify-center gap-12">
                        {/* SKILLS title */}
                        <h1 className="text-2xl font-bold">SKILLS</h1>
                        {/* SKILLS LIST */}
                        <div className="flex flex-wrap gap-4">
                            <div className="text-2xl font-bold">
                                <div className="p-2 text-sm text-white bg-black rounded cursor-pointer hover:text-black hover:bg-white">HTML</div>
                            </div>
                            <div className="text-2xl font-bold">
                                <div className="p-2 text-sm text-white bg-black rounded cursor-pointer hover:text-black hover:bg-white">CSS</div>
                            </div>
                            <div className="text-2xl font-bold">
                                <div className="p-2 text-sm text-white bg-black rounded cursor-pointer hover:text-black hover:bg-white">Javascript</div>
                            </div>
                            <div className="text-2xl font-bold">
                                <div className="p-2 text-sm text-white bg-black rounded cursor-pointer hover:text-black hover:bg-white">REACT JS</div>
                            </div>
                            <div className="text-2xl font-bold">
                                <div className="p-2 text-sm text-white bg-black rounded cursor-pointer hover:text-black hover:bg-white">NEXT JS</div>
                            </div>
                            <div className="text-2xl font-bold">
                                <div className="p-2 text-sm text-white bg-black rounded cursor-pointer hover:text-black hover:bg-white">PHP</div>
                            </div>
                            <div className="text-2xl font-bold">
                                <div className="p-2 text-sm text-white bg-black rounded cursor-pointer hover:text-black hover:bg-white">CODEIGNEITER 3</div>
                            </div>
                            <div className="text-2xl font-bold">
                                <div className="p-2 text-sm text-white bg-black rounded cursor-pointer hover:text-black hover:bg-white">LARAVEL</div>
                            </div>
                        </div>
                    {/* SKILLS SCROLL */}
                    <div className="">SKILLS SCROLL</div>
                    {/* EXPERIENCIA CONTAINER */}
                    <div className="">EXPERIENCIA</div>
                {/* SVG CONTAINER */}
                <div className="hidden"></div>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default About