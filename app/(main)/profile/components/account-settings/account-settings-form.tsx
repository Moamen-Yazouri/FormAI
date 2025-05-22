"use client"
import type React from "react"
import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import LoadingSpinner from "../../../form-generator/components/loading-spinner"
import { IContextUser } from "@/@types"
import { AuthContext } from "@/providers/auth/authProvider"
import AccountSettingsForm from "./accountSettingsForm"

export default function AccountSettings() {

    return (
        <Card className="border-purple-200 shadow-sm">
            <CardHeader>
                <CardTitle className="text-purple-900">Account Settings</CardTitle>
                <CardDescription>Update your name and email address.</CardDescription>
            </CardHeader>
            <AccountSettingsForm/>
        </Card>
    )
}
