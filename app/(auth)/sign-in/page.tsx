"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"
import SignInForm from "./components/signin-form"
import { motion } from "framer-motion"

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
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
    >
      <Card className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >
        <CardHeader className="space-y-1">
          <div className="flex flex-col gap-2 justify-center items-center">
            <img className="w-[100px] h-[100px] rounded-full" src="/logo.png" alt="logo" />
          </div>


          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        </motion.div>
        <CardContent className="space-y-4">
          <SignInForm />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
            >
              <div className="relative mb-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </motion.div>
        </CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >          
          <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-purple-500 hover:text-purple-600 underline underline-offset-4">
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
export default SignIn;
