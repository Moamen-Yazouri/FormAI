"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import PasswordUpdate from "./components/password-update"

export default function SecuritySettings() {
    return (
        <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 border border-cyan-700/20 shadow-2xl backdrop-blur-md pb-0">
        <CardHeader>
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            >
            <CardTitle className="bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Security Settings
            </CardTitle>
            <CardDescription className="text-slate-400">
                Update your password and manage your account security.
            </CardDescription>
            </motion.div>
        </CardHeader>
        <PasswordUpdate />
        </Card>
    )
}
