import {motion} from "framer-motion";
import Image from "next/image";
import React from "react";

const imagePanelVariants = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            delay: 0.2
        }
    }
}

const AboutImagePanel = () => {
    return (
        <motion.div variants={imagePanelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={
                {once: true}
            }
            className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-600/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl scale-110"></div>

                <div className="relative">
                    <Image src="/about-us.png" alt="FormAI Team"
                        width={600}
                        height={400}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"/>
                    <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-600/20">
                            <div className="text-cyan-400 font-bold text-lg">2025</div>
                            <div className="text-slate-300 text-sm">Founded</div>
                        </div>
                        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-600/20">
                            <div className="text-cyan-400 font-bold text-lg">25+</div>
                            <div className="text-slate-300 text-sm">Team Members</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const MemoizedAboutImagePanel = React.memo(AboutImagePanel)
export default MemoizedAboutImagePanel
