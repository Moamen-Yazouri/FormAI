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

export default function AccountSettingsForm() {
    const [isLoading, setIsLoading] = useState(false);
    const {user} = use(AuthContext);
    const [showEmailChangeAlert, setShowEmailChangeAlert] = useState(false)

    const [formData, setFormData] = useState({
        name: user!.name || "",
        email: user!.email || "",
    })

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Here you would update the user's account settings in your backend
        console.log("Updated account settings:", formData)

        setIsLoading(false)
        toast.success("Account settings updated", {
        description: "Your name and email have been updated successfully.",
        })
    }

    const handleCancel = () => {
        setShowEmailChangeAlert(false)
    }

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
