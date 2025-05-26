"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import PasswordUpdate from "./components/password-update"
import { Suspense } from "react"
import FullPageLoader from "../profileLoader"

export default function SecuritySettings() {



    return (
        <Card className="border-purple-200 shadow-sm">
            <CardHeader>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <CardTitle className="text-purple-900">Security Settings</CardTitle>
                    <CardDescription>Update your password and manage your account security.</CardDescription>
                </motion.div>
            </CardHeader>
            <Suspense fallback= {<FullPageLoader />}>
                <PasswordUpdate/>
            </Suspense>
        </Card>
    )
}
