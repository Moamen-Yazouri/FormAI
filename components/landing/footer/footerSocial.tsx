import {motion} from "framer-motion";
import React from "react";
import { socialLinks, socialVariants } from "./constants";



const FooterSocial = () => (
    <div className="flex gap-3 pt-2 md:pt-0 md:ml-4">
        {
        socialLinks.map(({
            name,
            icon: Icon,
            href,
            color,
            delay
        }) => (
            <motion.a key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={
                    socialVariants(delay)
                }
                initial="hidden"
                whileInView="visible"
                viewport={
                    {once: true}
                }
                className={
                    `w-9 h-9 rounded-full border border-cyan-700/30 flex items-center justify-center text-slate-300 ${color} hover:border-cyan-500/40 hover:scale-110 transition-all duration-300`
                }
                aria-label={name}>
                <Icon className="h-4 w-4"/>
            </motion.a>
        ))
    } </div>
);

export const MemoizedFooterSocial = React.memo(FooterSocial);
