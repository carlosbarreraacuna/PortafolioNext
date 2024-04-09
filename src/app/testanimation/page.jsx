"use client"

import { motion } from "framer-motion";

const Testpage = () => {

    const variants = {
        variant1: {
            x: 400, 
            y: 300, 
            opacity: 0.5, 
            transition:{
                duration:3
            }
        },
        variant2: {
            x: 100, y: -300, rotation: 90
        }
    }




    return (
        <div className="flex items-center justify-center h-full">
            <motion.div className="bg-red-400 rounded w-96 h-96 "
                // initial={{ x: -100 }}
                variants={variants}
                animate="variant1"
                transition={{ delay: 2, duration: 4 }}
            ></motion.div>
        </div>
    )
}

export default Testpage 