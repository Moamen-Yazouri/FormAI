"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react"
import { toast } from "sonner"
import LoadingSpinner from "../../form-generator/components/loading-spinner"

interface NotificationSettingsProps {
    user: {
        name: string
        email: string
        role: string
        notificationSettings?: {
            emailNotifications?: boolean
            pushNotifications?: boolean
            smsNotifications?: boolean
            marketingEmails?: boolean
            notificationFrequency?: "immediate" | "daily" | "weekly"
        }
    }
}

export default function NotificationSettings({ user }: NotificationSettingsProps) {
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        emailNotifications: user.notificationSettings?.emailNotifications ?? true,
        pushNotifications: user.notificationSettings?.pushNotifications ?? true,
        smsNotifications: user.notificationSettings?.smsNotifications ?? false,
        marketingEmails: user.notificationSettings?.marketingEmails ?? false,
        notificationFrequency: user.notificationSettings?.notificationFrequency ?? "immediate",
    })

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }))
    }

    const handleFrequencyChange = (value: string) => {

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Here you would update the user's notification settings in your backend
        console.log("Updated notification settings:", formData)

        setIsLoading(false)
        toast.success("Notification settings updated",{
        description: "Your notification preferences have been updated successfully.",
        })
    }

    const handleCancel = () => {
        // Reset form to initial values
            setFormData({
            emailNotifications: user.notificationSettings?.emailNotifications ?? true,
            pushNotifications: user.notificationSettings?.pushNotifications ?? true,
            smsNotifications: user.notificationSettings?.smsNotifications ?? false,
            marketingEmails: user.notificationSettings?.marketingEmails ?? false,
            notificationFrequency: user.notificationSettings?.notificationFrequency ?? "immediate",
            })
    }

    return (
        <Card className="border-purple-200 shadow-sm">
        <CardHeader>
            <CardTitle className="text-purple-900">Notification Settings</CardTitle>
            <CardDescription>Manage how and when you receive notifications.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-purple-900">Notification Channels</h3>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <div className="space-y-0.5">
                    <label htmlFor="emailNotifications" className="text-base font-medium">
                        Email Notifications
                    </label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                    </div>
                </div>
                <Switch
                    id="emailNotifications"
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-purple-600" />
                    <div className="space-y-0.5">
                    <label htmlFor="pushNotifications" className="text-base font-medium">
                        Push Notifications
                    </label>
                    <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser or mobile app.
                    </p>
                    </div>
                </div>
                <Switch
                    id="pushNotifications"
                    checked={formData.pushNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("pushNotifications", checked)}
                />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-purple-600" />
                    <div className="space-y-0.5">
                    <label htmlFor="smsNotifications" className="text-base font-medium">
                        SMS Notifications
                    </label>
                    <p className="text-sm text-muted-foreground">Receive notifications via text message.</p>
                    </div>
                </div>
                <Switch
                    id="smsNotifications"
                    checked={formData.smsNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
                />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    <div className="space-y-0.5">
                    <label htmlFor="marketingEmails" className="text-base font-medium">
                        Marketing Emails
                    </label>
                    <p className="text-sm text-muted-foreground">Receive emails about new features, tips, and updates.</p>
                    </div>
                </div>
                <Switch
                    id="marketingEmails"
                    checked={formData.marketingEmails}
                    onCheckedChange={(checked) => handleSwitchChange("marketingEmails", checked)}
                />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-medium text-purple-900">Notification Frequency</h3>

                <RadioGroup
                value={formData.notificationFrequency}
                onValueChange={handleFrequencyChange}
                className="flex flex-col space-y-1"
                >
                <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <label htmlFor="immediate" className="font-normal">
                    Immediate - Send notifications as events happen
                    </label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="daily" id="daily" />
                    <label htmlFor="daily" className="font-normal">
                    Daily Digest - Send a summary once per day
                    </label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <label htmlFor="weekly" className="font-normal">
                    Weekly Digest - Send a summary once per week
                    </label>
                </div>
                </RadioGroup>
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
                {isLoading ? <LoadingSpinner  className="mr-2" /> : null}
                Save Preferences
            </Button>
            </CardFooter>
        </form>
        </Card>
    )
}
