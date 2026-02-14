"use client";

import { AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionProvider = ({ children }) => {

    const pathName = usePathname()
    return (
        <AnimatePresence mode="wait">

            <div key={pathName} className="w-screen h-screen"> {/* Sin fondo */}
                <motion.div className="fixed w-screen h-screen bg-black rounded-b-[100px] z-40"
                    animate={{ height: "0vh" }}
                    exit={{ height: "140vh" }}
                    transition={{ duration: 0.5, ease: "easeOut" }} />

                <motion.div className="fixed top-0 bottom-0 left-0 right-0 z-50 hidden m-auto text-white cursor-default text-8xl w-fit h-fit md:block lg:block xl:block"
                    initial={{ opacity:1 }}
                    animate={{ opacity:0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}>{pathName.substring(1)}</motion.div> 

                <motion.div className="fixed w-screen h-screen bg-black rounded-t-[100px] bottom-0 z-40"
                    initial={{ height: "140vh" }}
                    animate={{ height: "0vh", transition: { delay: 0.5 } }} />

                <div className="fixed top-0 left-0 right-0 z-50 h-24">
                    <Navbar />
                </div>
                <div className="h-screen">{children}</div>
            </div>
        </AnimatePresence>
    )
}

export default TransitionProvider 