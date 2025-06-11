"use client"

import {  Linkedin, Github, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Logo from "../header/logo"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: "https://www.linkedin.com/in/moamen-al-yazouri-80742433a/",
            color: "hover:text-blue-400",
            delay: 0.1,
        },
        {
            name: "GitHub",
            icon: Github,
            href: "https://github.com/Moamen-Yazouri",
            color: "hover:text-slate-300",
            delay: 0.2,
        },
        {
            name: "Email",
            icon: Mail,
            href: "mailto:moaamen@gmail.com",
            color: "hover:text-cyan-400",
            delay: 0.3,
        },
    ]

    return (
        <footer className="w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-950 to-cyan-950 -z-10" />
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 rounded-full blur-2xl -z-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-600/10 to-blue-600/10 rounded-full blur-2xl -z-10" />

            <div className="w-full max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2"
                >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Logo size={45}/>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                    FormAI
                    </span>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="flex gap-6 text-xs text-slate-400">
                    {"Terms,Privacy,Contact".split(',').map((item) => (
                        <Link
                        key={item}
                        href="#"
                        className="hover:text-cyan-300 hover:underline transition-all duration-200"
                        >
                        {item}
                        </Link>
                    ))}
                    </div>

                    <div className="flex gap-3 pt-2 md:pt-0 md:ml-4">
                    {socialLinks.map((link) => {
                        const Icon = link.icon
                        return (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: link.delay }}
                            className={`w-9 h-9 rounded-full border border-cyan-700/30 flex items-center justify-center text-slate-300 ${link.color} hover:border-cyan-500/40 hover:scale-110 transition-all duration-300`}
                            aria-label={link.name}
                        >
                            <Icon className="h-4 w-4" />
                        </motion.a>
                        )
                    })}
                    </div>
                </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative mx-auto max-w-2xl"
                >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-sky-900/20 rounded-xl blur-xl -z-10" />
                <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-700/30 rounded-xl p-6 text-center shadow-[0_0_40px_-15px_rgba(6,182,212,0.15)]">
                    <motion.h3
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2}}
                        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent mb-1"
                    >
                        Created by Moamen Al-Yazouri
                    </motion.h3>
                    <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-base text-slate-400 flex items-center justify-center gap-2"
                    >
                    </motion.div>
                </div>
                </motion.div>

                <div className="mt-10 text-center text-xs text-slate-500">
                © {currentYear} FormAI. All rights reserved.
                </div>
            </div>
        </footer>
    )
    }
