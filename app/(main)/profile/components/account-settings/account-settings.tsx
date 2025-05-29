"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AccountSettingsForm from "./accountSettingsForm"
import { motion } from "framer-motion"

export default function AccountSettings() {
    return (
        <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 border border-cyan-700/20 shadow-2xl backdrop-blur-md pb-0">
        <CardHeader>
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            >
            <CardTitle className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Account Settings
            </CardTitle>
            <CardDescription className="text-slate-300">
                Update your name and email address.
            </CardDescription>
            </motion.div>
        </CardHeader>

        <AccountSettingsForm />
        </Card>
    )
}
