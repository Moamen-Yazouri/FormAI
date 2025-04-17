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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 overflow-hidden">
            
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            className="w-full max-w-md"
            >
            <Card className="shadow-md gap-0 py-3">
            <Logo/>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                    className="w-full max-w-md"
                >
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-2xl font-bold">Create an account</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Enter your information to get started with FormAI
                        </p>
                    </div>
                </motion.div>
                <CardContent className="space-y-4 pt-3 ">
                    <SignUpForm />

                    <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">or continue with</span>
                    </div>
                    </div>

                    <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                    </Button>
                </CardContent>

                <CardFooter className="flex justify-center pt-1 pb-4">
                    <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="text-purple-500 hover:text-purple-600 underline underline-offset-4"
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
