import Logo from "@/components/header/logo";
import {motion} from "framer-motion";
import { logoVariants } from "./constants";
import React from "react";


const FooterLogo = () => (
    <motion.div variants={logoVariants}
        initial="hidden"
        whileInView="visible"
        viewport={
            {once: true}
        }
        className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Logo size={45}/>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
            FormAI
        </span>
    </motion.div>
);

export const MemoizedFooterLogo = React.memo(FooterLogo);
