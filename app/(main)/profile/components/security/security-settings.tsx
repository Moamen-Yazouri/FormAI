"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import PasswordUpdate from "./components/password-update"

export default function SecuritySettings() {
    return (
        <Card className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 shadow-xl backdrop-blur-sm gap-0 pb-0">
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
