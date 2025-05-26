"use client"

import type React from "react"

import { use, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Check, X } from "lucide-react"
import { AuthContext } from "@/providers/auth/authProvider"
import FullPageLoader from "./profileLoader"


export default function ProfileHeader() {
    const {user} = use(AuthContext);
    const [isUploading, setIsUploading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    
    if(!user) throw new Error("User not found");
    
    const getInitials = (name: string) => {
        return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
        setIsUploading(true)
        const reader = new FileReader()
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string)
            setIsUploading(false)
            setIsEditing(true)
        }
        reader.readAsDataURL(file)
        }
    }

    const handleSaveAvatar = () => {

        setIsEditing(false)

    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setAvatarPreview(null)
    }

    return (
        <Card className="border-purple-200 shadow-sm">
        <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-purple-200">
                {isUploading ? (
                    <div className="flex items-center justify-center w-full h-full bg-purple-100">
                    <FullPageLoader />
                    </div>
                ) : (
                    <>
                    <AvatarImage src={avatarPreview || "/placeholder.svg?height=96&width=96"} />
                    <AvatarFallback className="bg-purple-200 text-purple-900 text-xl">
                        {getInitials(user?.name || "Moamen Yazouri")}
                    </AvatarFallback>
                    </>
                )}
                </Avatar>

                {!isEditing ? (
                <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
                >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload avatar</span>
                    <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
                ) : (
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                    <Button
                    size="icon"
                    variant="default"
                    className="h-7 w-7 bg-green-600 hover:bg-green-700"
                    onClick={handleSaveAvatar}
                    >
                    <Check className="h-3.5 w-3.5" />
                    <span className="sr-only">Save</span>
                    </Button>
                    <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={handleCancelEdit}
                    >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Cancel</span>
                    </Button>
                </div>
                )}
            </div>

            <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-purple-900">{user.name}</h2>
                <p className="text-purple-600">{user.email}</p>
                <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {user.role}
                </span>
                </div>
            </div>
            </div>
        </CardContent>
        </Card>
    )
}
