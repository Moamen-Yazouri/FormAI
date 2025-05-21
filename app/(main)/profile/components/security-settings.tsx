"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Shield } from "lucide-react"
import { toast } from "sonner"
import LoadingSpinner from "../../form-generator/components/loading-spinner"

const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, { message: "Current password is required." }),
        newPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ["confirmPassword"],
    })

type PasswordValues = z.infer<typeof passwordSchema>

interface SecuritySettingsProps {
    user: {
        name: string
        email: string
        role: string
    }
}

export default function SecuritySettings({ user }: SecuritySettingsProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const form = useForm<PasswordValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        },
    })

    async function onSubmit(data: PasswordValues) {
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Here you would update the user's password in your backend
        console.log("Password change requested:", data)

        setIsLoading(false)
        toast.success("Password updated",{
        description: "Your password has been updated successfully.",
        })

        form.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        })
    }

    return (
        <Card className="border-purple-200 shadow-sm">
        <CardHeader>
            <CardTitle className="text-purple-900">Security Settings</CardTitle>
            <CardDescription>Update your password and manage your account security.</CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
                <div className="flex items-center p-4 rounded-lg bg-purple-50 border border-purple-100 mb-6">
                <Shield className="h-5 w-5 text-purple-600 mr-3" />
                <p className="text-sm text-purple-700">
                    We recommend using a strong, unique password that you don't use for other accounts.
                </p>
                </div>

                <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <div className="relative">
                        <FormControl>
                        <Input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                            {...field}
                        />
                        </FormControl>
                        <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <div className="relative">
                        <FormControl>
                        <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter your new password"
                            {...field}
                        />
                        </FormControl>
                        <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                    </div>
                    <FormDescription>
                        Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <div className="relative">
                        <FormControl>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your new password"
                            {...field}
                        />
                        </FormControl>
                        <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
            <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                <Button variant="outline" type="button" onClick={() => form.reset()} disabled={isLoading}>
                Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                {isLoading ? <LoadingSpinner className="mr-2" /> : null}
                Update Password
                </Button>
            </CardFooter>
            </form>
        </Form>
        </Card>
    )
}
