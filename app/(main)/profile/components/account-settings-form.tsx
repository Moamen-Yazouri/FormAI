"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import LoadingSpinner from "../../form-generator/components/loading-spinner"

interface AccountSettingsFormProps {
    user: {
        name: string
        email: string
        role: string
        language?: string
        timezone?: string
        twoFactorEnabled?: boolean
    }
}

export default function AccountSettingsForm({ user }: AccountSettingsFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [showEmailChangeAlert, setShowEmailChangeAlert] = useState(false)

    const [formData, setFormData] = useState({
        email: user.email || "",
        language: user.language || "en",
        timezone: user.timezone || "UTC",
        twoFactorEnabled: user.twoFactorEnabled || false,
    })

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value
        setFormData({ ...formData, email: newEmail })

        // Show alert when email is changed
        if (newEmail !== user.email && !showEmailChangeAlert) {
        setShowEmailChangeAlert(true)
        } else if (newEmail === user.email && showEmailChangeAlert) {
        setShowEmailChangeAlert(false)
        }
    }

    const handleLanguageChange = (value: string) => {
        setFormData({ ...formData, language: value })
    }

    const handleTimezoneChange = (value: string) => {
        setFormData({ ...formData, timezone: value })
    }

    const handleTwoFactorChange = (checked: boolean) => {
        setFormData({ ...formData, twoFactorEnabled: checked })
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
        description: "Your account settings have been updated successfully.",
        });
    }

    const handleCancel = () => {
        // Reset form to initial values
        setFormData({
        email: user.email || "",
        language: user.language || "en",
        timezone: user.timezone || "UTC",
        twoFactorEnabled: user.twoFactorEnabled || false,
        })
        setShowEmailChangeAlert(false)
    }

    return (
        <Card className="border-purple-200 shadow-sm">
        <CardHeader>
            <CardTitle className="text-purple-900">Account Settings</CardTitle>
            <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-purple-900">
                Email Address
                </label>
                <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleEmailChange}
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                required
                />
            </div>

            {showEmailChangeAlert && (
                <Alert variant="destructive" className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Email verification required</AlertTitle>
                <AlertDescription>
                    If you change your email address, you'll need to verify the new email before the change takes effect.
                </AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <label htmlFor="language" className="text-sm font-medium text-purple-900">
                    Language
                </label>
                <Select value={formData.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language" className="border-purple-200 focus:ring-purple-400">
                    <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    </SelectContent>
                </Select>
                </div>

                <div className="space-y-2">
                <label htmlFor="timezone" className="text-sm font-medium text-purple-900">
                    Timezone
                </label>
                <Select value={formData.timezone} onValueChange={handleTimezoneChange}>
                    <SelectTrigger id="timezone" className="border-purple-200 focus:ring-purple-400">
                    <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                    <SelectItem value="CST">Central Time (CST)</SelectItem>
                    <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                    <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                    <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="CET">Central European Time (CET)</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                <label htmlFor="twoFactor" className="text-base font-medium text-purple-900">
                    Two-Factor Authentication
                </label>
                <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by requiring a verification code.
                </p>
                </div>
                <Switch id="twoFactor" checked={formData.twoFactorEnabled} onCheckedChange={handleTwoFactorChange} />
            </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
            <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="border-purple-200 hover:bg-purple-50"
            >
                Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                {isLoading ? <LoadingSpinner className="mr-2" /> : null}
                Save Changes
            </Button>
            </CardFooter>
        </form>
        </Card>
    )
    }
