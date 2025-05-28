"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfoForm from "../components/personal-info/personal-info-form"
import AccountSettings from "../components/account-settings/account-settings"
import SecuritySettings from "../components/security/security-settings"
import ProfileHeader from "../components/profile-header"
import FullPageLoader from "../components/profileLoader"
import { Suspense } from "react"

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 relative overflow-hidden w-full">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-indigo-900/15 to-purple-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-purple-600/10 to-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-indigo-600/8 to-violet-600/8 rounded-full blur-2xl transform -translate-x-24 -translate-y-24"></div>

        <div className="relative container max-w-5xl py-8 md:py-12 px-4 md:px-6 w-full">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent mb-6">
            Profile Settings
            </h1>

            <Suspense fallback={<FullPageLoader />}>
            <ProfileHeader />
            </Suspense>

            <Tabs defaultValue="personal" className="mt-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8 bg-gradient-to-r from-slate-800/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 backdrop-blur-sm shadow-lg">
                <TabsTrigger
                value="personal"
                className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600/70 data-[state=active]:to-indigo-600/70 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-violet-800/30 hover:text-violet-200 transition-all duration-200"
                >
                Personal Info
                </TabsTrigger>
                <TabsTrigger
                value="account"
                className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600/70 data-[state=active]:to-indigo-600/70 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-violet-800/30 hover:text-violet-200 transition-all duration-200"
                >
                Account
                </TabsTrigger>
                <TabsTrigger
                value="security"
                className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600/70 data-[state=active]:to-indigo-600/70 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-violet-800/30 hover:text-violet-200 transition-all duration-200"
                >
                Security
                </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
                <div className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 rounded-lg backdrop-blur-sm shadow-xl">
                <PersonalInfoForm />
                </div>
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
                <div className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 rounded-lg backdrop-blur-sm shadow-xl">
                <AccountSettings />
                </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
                <div className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 rounded-lg backdrop-blur-sm shadow-xl">
                <SecuritySettings />
                </div>
            </TabsContent>
            </Tabs>
        </div>
        </div>
    )
}
