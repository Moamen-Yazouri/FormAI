"use client"
import type React from "react"

import { Suspense, use, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import PersonalForm from "./personalForm"
import { motion } from "framer-motion"

export default function PersonalInfo() {
  return (
    <Card className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 shadow-xl backdrop-blur-sm pb-0 gap-0">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <CardTitle className="bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
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
