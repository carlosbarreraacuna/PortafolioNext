"use client"

import {motion} from "framer-motion"

const portafolio = () => {
    return (
        <motion.div className="h-full" 
        initial={{ y: "-200vh" }} 
        animate={{ y: "0%" }} 
        transition={{ duration: 1 }}>
            
           Portafolio
        </motion.div>
    )
}

export default portafolio 