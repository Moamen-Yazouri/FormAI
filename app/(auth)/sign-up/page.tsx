"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import SignUpForm from "./components/signup-form/signup-form"
import { motion } from "framer-motion"
import Logo from "@/components/logo/Logo"

export default function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 px-2 py-6 overflow-hidden">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
        >
            <Card className="w-full gap-0 py-2 px-4 border border-cyan-700/20 shadow-2xl backdrop-blur-md text-slate-200 bg-gradient-to-br from-blue-950/70 via-indigo-950/60 to-cyan-900/70">
            <Logo />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
            >
                <h2 className="text-xl font-bold text-cyan-400">Create an account</h2>
                <p className="mt-1 text-xs text-slate-400">
                Enter your information to get started with FormAI
                </p>
            </motion.div>

            <CardContent className="space-y-2 pt-2 pb-3">
                <SignUpForm />

                <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-slate-900 px-2 text-slate-500">
                    or continue with
                    </span>
                </div>
                </div>

                <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800/40 text-sm py-1.5"
                >
                <Github className="mr-2 h-4 w-4" />
                GitHub
                </Button>
            </CardContent>

            <CardFooter className="flex justify-center pt-1 pb-3">
                <div className="text-xs text-slate-400">
                Already have an account?{" "}
                <Link
                    href="/sign-in"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                >
                    Sign in
                </Link>
                </div>
            </CardFooter>
            </Card>
        </motion.div>
        </div>
    )
}
