"use client"
import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import SignInForm from "./signin-form";
import { motion } from "framer-motion";
import Logo from "@/components/header/logo";


const SignIn = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
        },
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <motion.div
                className="w-full max-w-md"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Card className="w-full max-w-md gap-3 bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 border border-cyan-700/20 shadow-2xl backdrop-blur-md text-slate-200">
                <Logo />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                    className="w-full"
                >
                    <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-cyan-400">
                        Sign in
                    </CardTitle>
                    <CardDescription className="text-center text-slate-400">
                        Enter your email and password to access your account
                    </CardDescription>
                    </CardHeader>
                </motion.div>

                <CardContent className="space-y-4">
                    <SignInForm />

                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                    <div className="relative mb-2">
                        <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-700" />
                        </div>
                    </div>
                    </motion.div>
                </CardContent>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                    className="w-full"
                >
                    <CardFooter className="flex justify-center">
                    <div className="text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link
                        href="/sign-up"
                        className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                        >
                        Sign up
                        </Link>
                    </div>
                    </CardFooter>
                </motion.div>
                </Card>
            </motion.div>
        </div>
    )
}

export default SignIn
