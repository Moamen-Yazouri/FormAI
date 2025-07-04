"use client"
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import SignUpForm from "./signup-form";
import Logo from "@/components/header/logo";

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
