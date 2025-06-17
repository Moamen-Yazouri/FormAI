"use client" 
import React, {useContext} from "react";
import {motion} from "framer-motion";
import {ArrowRight} from "lucide-react";
import {AuthContext} from "@/providers/auth/authProvider";
import {useRouter} from "next/navigation";

const ctaVariants = {
    container: {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8
            }
        }
    },
    button: {
        hover: {
            scale: 1.05
        },
        tap: {
            scale: 0.95
        }
    }
}
const MemoizedAboutActions = () => {
const {user} = useContext(AuthContext)
const router = useRouter()

const handleStart = () => {
    if (user) {
        router.push("/form-generator")
    } else {
        router.push("/sign-in")
    }
}

return (
    <motion.div variants={
            ctaVariants.container
        }
        initial="hidden"
        whileInView="visible"
        viewport={
            {
                once: true
            }
        }
        className="text-center">
        <motion.button variants={
                ctaVariants.button
            }
            whileHover="hover"
            whileTap="tap"
            onClick={handleStart}
            className="group bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-4 rounded-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <span className="relative z-10 flex items-center">
                Join Our Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"/>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
    </motion.div>
)}
export default React.memo(MemoizedAboutActions);
