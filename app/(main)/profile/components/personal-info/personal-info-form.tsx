"use client" 
import type React from "react"

import {use, useState} from "react"
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




export default function PersonalInfoForm() {
    

    return (
        <Card className="border-purple-200 shadow-sm">
            <CardHeader>
                <CardTitle className="text-purple-900">Personal Information</CardTitle>
                <CardDescription>Update your name and role on the platform.</CardDescription>
            </CardHeader>
            {/* <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-purple-900">
                            Full Name
                        </label>
                        <Input id="name" placeholder="John Doe"
                            value={
                                formData.name
                            }
                            onChange={handleNameChange}
                            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            required/>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium text-purple-900">
                            Role
                        </label>
                        <Select value={
                                formData.role
                            }
                            onValueChange={handleRoleChange}>
                            <SelectTrigger id="role" className="border-purple-200 focus:ring-purple-400">
                                <SelectValue placeholder="Select role"/>
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
                    <Button type="button" variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="border-purple-200 hover:bg-purple-50">
                        Cancel
                    </Button>
                    <Button type="submit"
                        disabled={isLoading}
                        className="bg-purple-600 hover:bg-purple-700">
                        {
                        isLoading ? <LoadingSpinner className="mr-2"/> : null
                    }
                        Save Changes
                    </Button>
                </CardFooter>
            </form> */}
        </Card>
    )
}
