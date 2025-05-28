"use client" 
import type React from "react"

import {Suspense, use, useState} from "react"
import {toast} from "sonner"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import LoadingSpinner from "../../../form-generator/components/loading-spinner"
import { AuthContext } from "@/providers/auth/authProvider"
import PersonalForm from "./personalForm"
import { motion } from "framer-motion"
import FullPageLoader from "../profileLoader"




export default function PersonalInfo() {
    

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="border-purple-200 shadow-sm pb-0 gap-0">
                <CardHeader >
                    <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    >
                    <div>
                        <CardTitle className="text-purple-900">Security Settings</CardTitle>
                        <CardDescription>Update your password and manage your account security.</CardDescription>
                    </div>
                    </motion.div>
                </CardHeader>
                    <PersonalForm/>
            </Card>
        </motion.div>
    )
}
