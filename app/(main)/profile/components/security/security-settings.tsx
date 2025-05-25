"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Shield } from "lucide-react"
import { AuthContext } from "@/providers/auth/authProvider"
import { use } from "react"

export default function SecuritySettings() {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <Card className="border-purple-200 shadow-sm">
        <CardHeader>
            <CardTitle className="text-purple-900">Security Settings</CardTitle>
            <CardDescription>Update your password and manage your account security.</CardDescription>
        </CardHeader>
        <form>
            <CardContent className="space-y-6">
            <div className="flex items-center p-4 rounded-lg bg-purple-50 border border-purple-100 mb-6">
                <Shield className="h-5 w-5 text-purple-600 mr-3" />
                <p className="text-sm text-purple-700">
                We recommend using a strong, unique password that you don't use for other accounts.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-purple-900">Current Password</label>
                <div className="relative mt-1">
                <Input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password visibility</span>
                </Button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-purple-900">New Password</label>
                <div className="relative mt-1">
                <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password visibility</span>
                </Button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-purple-900">Confirm New Password</label>
                <div className="relative mt-1">
                <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password visibility</span>
                </Button>
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
            <Button type="reset" variant="outline">Cancel</Button>
            <Button type="submit" disabled className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Update Password
            </Button>
            </CardFooter>
        </form>
        </Card>
    )
}
