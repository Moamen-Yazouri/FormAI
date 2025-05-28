"use client"
import type React from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AccountSettingsForm from "./accountSettingsForm"
import { motion } from "framer-motion"
import { Suspense } from "react"
import FullPageLoader from "../profileLoader"

export default function AccountSettings() {

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="border-purple-200 shadow-sm pb-0 gap-0">
                <CardHeader>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <CardTitle className="text-purple-900">Account Settings</CardTitle>
                        <CardDescription>Update your name and email address.</CardDescription>
                    </motion.div>
                </CardHeader>
                    <AccountSettingsForm/>
            </Card>
        </motion.div>
    )
}
