"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "../components/personal-info/personal-info-form";
import AccountSettings from "../components/account-settings/account-settings";
import SecuritySettings from "../components/security/security-settings";
import ProfileHeader from "../components/profile-header";


export default function ProfilePage() {
    return (
        <div className="min-h-screen p-6 pt-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 text-slate-200 relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/25 via-indigo-900/15 to-cyan-800/25" />
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-600/15 to-indigo-600/15 rounded-full blur-3xl" />
            <div className="absolute bottom-24 right-10 w-80 h-80 bg-gradient-to-bl from-cyan-500/15 to-blue-700/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-indigo-600/10 to-cyan-600/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />

            <div className="relative container max-w-5xl py-10 md:py-14 px-4 md:px-6 w-full z-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent mb-6">
                Profile Settings
                </h1>

                <ProfileHeader />

                <Tabs defaultValue="personal" className="mt-8">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8 bg-gradient-to-r from-blue-900/70 via-indigo-800/50 to-cyan-700/40 border border-cyan-600/30 backdrop-blur-sm shadow-xl ring-1 ring-cyan-500/10">
                    {["personal", "account", "security"].map((tab) => (
                    <TabsTrigger
                        key={tab}
                        value={tab}
                        className="text-slate-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/70 data-[state=active]:to-cyan-600/70 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-800/30 hover:text-cyan-200 transition-all duration-200"
                    >
                        {tab === "personal" ? "Personal Info" : tab[0].toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                    ))}
                </TabsList>

                {["personal", "account", "security"].map((tab) => (
                    <TabsContent key={tab} value={tab}>
                    <div className="rounded-lg bg-gradient-to-br from-blue-900/50 via-indigo-800/40 to-cyan-700/30 border border-cyan-600/20 backdrop-blur-md shadow-xl ring-1 ring-cyan-500/10">
                        {tab === "personal" && <PersonalInfoForm />}
                        {tab === "account" && <AccountSettings />}
                        {tab === "security" && <SecuritySettings />}
                    </div>
                    </TabsContent>
                ))}
                </Tabs>
            </div>
        </div>
    )
}
