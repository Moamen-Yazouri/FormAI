"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LoadingSpinner from "../../form-generator/components/loading-spinner"


interface PersonalInfoFormProps {
    user: {
        name: string
        email: string
        role: string
    }
}

export default function PersonalInfoForm({ user }: PersonalInfoFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: user.name || "",
        role: user.role || "",
    })

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, name: e.target.value })
    }

    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, role: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Here you would update the user's profile in your backend
        console.log("Updated profile:", formData)

        setIsLoading(false)

        // Using Sonner toast
        toast.success("Profile updated", {
        description: "Your personal information has been updated successfully.",
        })
    }

    const handleCancel = () => {
        // Reset form to initial values
        setFormData({
        name: user.name || "",
        role: user.role || "",
        })
    }

    return (
        <Card className="border-purple-200 shadow-sm">
        <CardHeader>
            <CardTitle className="text-purple-900">Personal Information</CardTitle>
            <CardDescription>Update your name and role on the platform.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-purple-900">
                Full Name
                </label>
                <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleNameChange}
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-purple-900">
                Role
                </label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger id="role" className="border-purple-200 focus:ring-purple-400">
                    <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                Your role determines what permissions you have in the system.
                </p>
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
