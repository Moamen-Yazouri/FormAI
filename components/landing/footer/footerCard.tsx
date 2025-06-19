import {motion} from "framer-motion";
import {
    cardContainerVariants, 
    cardTitleVariants, 
    cardTextVariants
} from "./constants";
import React from "react";

const FooterCard = () => (
    <motion.div variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={
            {once: true}
        }
        className="relative mx-auto max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-sky-900/20 rounded-xl blur-xl -z-10"/>
        <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-700/30 rounded-xl p-6 text-center shadow-[0_0_40px_-15px_rgba(6,182,212,0.15)]">
            <motion.h3 variants={cardTitleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={
                    {once: true}
                }
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent mb-1">
                Created by Moamen Al-Yazouri
            </motion.h3>
            <motion.div variants={cardTextVariants}
                initial="hidden"
                whileInView="visible"
                viewport={
                    {once: true}
                }
                className="text-base text-slate-400 flex items-center justify-center gap-2"/>
        </div>
    </motion.div>
);

export const MemoizedFooterCard = React.memo(FooterCard);
