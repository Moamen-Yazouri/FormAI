
"use client"

import { Suspense, useContext, useState } from "react"
import { AuthContext } from "@/providers/auth/authProvider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader } from "lucide-react"
import PersonalInfoForm from "../components/personal-info/personal-info-form"
import AccountSettings from "../components/account-settings/account-settings"
import SecuritySettings from "../components/security/security-settings"
import ProfileHeader from "../components/profile-header"
import FullPageLoader from "../components/profileLoader"


export default function ProfilePage() {
    



    return (
        <div className="container max-w-5xl py-6 md:py-10 px-4 md:px-6">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">Profile Settings</h1>

        {/* <ProfileHeader  /> */}

        <Tabs defaultValue="personal" className="mt-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
                    <PersonalInfoForm />
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
                    <AccountSettings />
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
                <SecuritySettings />
            </TabsContent>
        </Tabs>
        </div>
    )
}
