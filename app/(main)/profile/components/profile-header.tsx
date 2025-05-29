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
    const { user, isLoading } = use(AuthContext)
    const [isUploading, setIsUploading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    if (isLoading) return <FullPageLoader />
    if (!user) return null

    const getInitials = (name: string) =>
        name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

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
        <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 border border-cyan-700/20 backdrop-blur-md shadow-2xl">
        <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-cyan-500/50 shadow-xl ring-2 ring-blue-500/20">
                {isUploading ? (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20">
                    <FullPageLoader />
                    </div>
                ) : (
                    <>
                    <AvatarImage src={avatarPreview || "/placeholder.svg?height=96&width=96"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xl font-bold">
                        {getInitials(user.name)}
                    </AvatarFallback>
                    </>
                )}
                </Avatar>

                {!isEditing ? (
                <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-1.5 rounded-full cursor-pointer hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
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
                    className="h-7 w-7 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border-0 shadow-lg"
                    onClick={handleSaveAvatar}
                    >
                    <Check className="h-3.5 w-3.5" />
                    <span className="sr-only">Save</span>
                    </Button>
                    <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 border-red-600/50 text-red-300 hover:bg-red-900/30 hover:text-red-200 hover:border-red-500/70 bg-slate-800/50"
                    onClick={handleCancelEdit}
                    >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Cancel</span>
                    </Button>
                </div>
                )}
            </div>

            <div className="text-center md:text-left">
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                {user.name}
                </h2>
                <p className="text-slate-400 mt-1">{user.email}</p>
                <div className="mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600/70 to-cyan-600/70 text-white border border-cyan-500/30 shadow-md">
                    {user.role}
                </span>
                </div>
            </div>
            </div>
        </CardContent>
        </Card>
    )
}
