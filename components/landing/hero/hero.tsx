"use client" 
import {useContext, useEffect, useState} from "react"
import {ArrowRight, Sparkles, Zap, Bot} from "lucide-react"
import {motion} from "framer-motion"
import {FormDataFlow} from "../hero/form-data-flow"
import {FloatingFormElements} from "../hero/floating-form-elements"
import {ContainerTextFlip} from "@/components/ui/container-text-flip"
import Image from "next/image"
import { AuthContext } from "@/providers/auth/authProvider"
import { useRouter } from "next/navigation"

export default function EnhancedHero() {
    const [hasMounted, setHasMounted] = useState(false);
    const {user} = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        setHasMounted(true)
    }, []);


    const handleStart = () => {
        if(user) {
            router.push("/form-generator")
        } 
        else {
            router.push("/sign-in")
        }
    }
    return (
        <div className="bg-slate-950 relative overflow-hidden pt-20 pb-10">
            
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-blue-900/50 to-sky-900/60 -z-10"></div>
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"/>
                <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-full blur-3xl -z-10"/>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse [animation-delay:1s] -z-10"/>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-blue-600/25 to-cyan-600/25 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse [animation-delay:2s] -z-10"/>
            </div>

            
            {
            hasMounted && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <FormDataFlow className="w-full h-full"/>
                    <FloatingFormElements/>
                </div>
            )
        }

        
            <section className="relative py-8 md:py-12 w-full z-10">
                <div className="relative w-full max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div initial={
                                {
                                    opacity: 0,
                                    x: -50
                                }
                            }
                            animate={
                                {
                                    opacity: 1,
                                    x: 0
                                }
                            }
                            transition={
                                {
                                    duration: 0.8
                                }
                            }
                            className="flex-1 text-center lg:text-left">
                            <motion.div initial={
                                    {
                                        opacity: 0,
                                        x: 100
                                    }
                                }
                                animate={
                                    {
                                        opacity: 1,
                                        x: 0
                                    }
                                }
                                transition={
                                    {
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }
                                }
                                className="inline-flex items-center rounded-full border border-cyan-700/30 bg-slate-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6 shadow-lg">
                                <span className="bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-full px-3 py-0.5 text-xs font-semibold mr-2 shadow-md">
                                    <Sparkles className="inline w-3 h-3 mr-1"/>
                                    NEW
                                </span>
                                <span className="text-sm text-slate-300">AI-powered form intelligence</span>
                                <ArrowRight className="ml-1 h-3.5 w-3.5 text-cyan-400"/>
                            </motion.div>

                            <motion.h1 initial={
                                    {
                                        opacity: 0,
                                        y: 30
                                    }
                                }
                                animate={
                                    {
                                        opacity: 1,
                                        y: 0
                                    }
                                }
                                transition={
                                    {
                                        duration: 0.8,
                                        delay: 0.3
                                    }
                                }
                                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl mb-6 text-white">
                                <ContainerTextFlip words={
                                        ["Generate Forms", "Deploy Forms", "Answer Forms"]
                                    }
                                    className="text-white"/>
                                <br className="hidden sm:inline"/>
                                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent animate-gradient-x">
                                    powered by AI
                                </span>
                            </motion.h1>

                            <motion.p initial={
                                    {
                                        opacity: 0,
                                        x: 100
                                    }
                                }
                                animate={
                                    {
                                        opacity: 1,
                                        x: 0
                                    }
                                }
                                transition={
                                    {
                                        duration: 0.6,
                                        delay: 0.2,
                                        ease: "easeInOut"
                                    }
                                }
                                className="max-w-[42rem] text-slate-300 sm:text-xl mb-8 leading-relaxed">
                                Build, deploy, and analyze forms with the help of artificial intelligence. Transform user interactions
                                                into actionable insights with real-time data flow visualization.
                            </motion.p>

                            <motion.div initial={
                                    {
                                        opacity: 0,
                                        y: 20
                                    }
                                }
                                animate={
                                    {
                                        opacity: 1,
                                        y: 0
                                    }
                                }
                                transition={
                                    {
                                        duration: 0.6,
                                        delay: 0.7
                                    }
                                }
                                className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 w-full max-w-md mx-auto lg:mx-0">
                                <button 
                                    className="group bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-3 rounded-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto relative overflow-hidden"
                                    onClick={handleStart}
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        <Bot className="mr-2 h-4 w-4"/>
                                        Start Building
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>

                                <button className="group border border-cyan-700/30 text-slate-300 hover:bg-cyan-900/20 hover:text-white hover:border-cyan-600 px-8 py-3 rounded-lg font-medium w-full sm:w-auto transition-all duration-300 backdrop-blur-sm">
                                    <span className="flex items-center justify-center">
                                        <Zap className="mr-2 h-4 w-4 group-hover:text-cyan-400 transition-colors"/>
                                        Watch Demo
                                    </span>
                                </button>
                            </motion.div>

                            <motion.div initial={
                                    {
                                        opacity: 0,
                                        y: 20
                                    }
                                }
                                animate={
                                    {
                                        opacity: 1,
                                        y: 0
                                    }
                                }
                                transition={
                                    {
                                        duration: 0.6,
                                        delay: 0.9
                                    }
                                }
                                className="flex items-center justify-center lg:justify-start gap-8 mt-12 text-sm text-slate-400">
                            </motion.div>
                        </motion.div>

                        <motion.div initial={
                                {
                                    opacity: 0,
                                    x: 50
                                }
                            }
                            animate={
                                {
                                    opacity: 1,
                                    x: 0
                                }
                            }
                            transition={
                                {
                                    duration: 0.8,
                                    delay: 0.4
                                }
                            }
                            className="flex-1 relative w-full group flex items-center justify-center">
                            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-900/20 via-blue-900/20 to-sky-900/20 rounded-3xl blur-3xl animate-pulse"></div>

                            <div className="relative w-fit rounded-xl border border-cyan-700/30 shadow-[0_0_50px_-12px] shadow-cyan-700/30 transition-all duration-500 group-hover:shadow-[0_0_80px_-6px] group-hover:shadow-sky-700/40 group-hover:border-cyan-600/50">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-800/5 to-sky-800/5 rounded-xl"></div>
                                <Image src="/hero.png" alt="Hero Section" className="rounded-xl ring-1 ring-cyan-700/20 relative z-10 object-cover"
                                    width={600}
                                    height={400}
                                    loading="lazy"
                                />

                                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-700/20 z-20">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-slate-300">AI Processing</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-700/20 z-20">
                                    <div className="text-xs text-slate-300">
                                        <div className="text-cyan-400 font-semibold">+127% conversion</div>
                                        <div>vs traditional forms</div>
                                    </div>
                                </div>

                                <div className="absolute top-1/2 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-700/20 z-20">
                                    <div className="flex items-center gap-1">
                                        <div className="w-1 h-3 bg-cyan-400 rounded"></div>
                                        <div className="w-1 h-2 bg-sky-400 rounded"></div>
                                        <div className="w-1 h-4 bg-cyan-500 rounded"></div>
                                        <span className="text-xs text-slate-300 ml-1">Live Data</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
