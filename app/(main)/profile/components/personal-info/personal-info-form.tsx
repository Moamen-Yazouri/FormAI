"use client"

import { motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PersonalForm from "./personalForm"

export default function PersonalInfo() {
  return (
    <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 border border-cyan-700/20 shadow-2xl backdrop-blur-md pb-0">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <CardTitle className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Personal Information
            </CardTitle>
            <CardDescription className="text-slate-400">
              Update your personal information and account preferences.
            </CardDescription>
          </div>
        </motion.div>
      </CardHeader>
      <PersonalForm />
    </Card>
  )
}
