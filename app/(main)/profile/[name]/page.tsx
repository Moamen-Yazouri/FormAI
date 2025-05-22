"use client" 
import {useContext} from "react"
import {AuthContext} from "@/providers/auth/authProvider"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import LoadingSpinner from "../../form-generator/components/loading-spinner"
import ProfileHeader from "../components/profile-header"
import PersonalInfoForm from "../components/personal-info-form"
import AccountSettingsForm from "../components/account-settings/account-settings-form"
import SecuritySettings from "../components/security-settings"

export default function ProfilePage() {
    const {user, isLoading} = useContext(AuthContext);

    if (!isLoading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                <LoadingSpinner/>
            </div>
        )
    }

    return (
        <div className="container max-w-5xl py-6 md:py-10 px-4 md:px-6">
            <h1 className="text-2xl font-bold text-purple-900 mb-6">Profile Settings</h1>

            <ProfileHeader user={
                user !
            }/>

            <Tabs defaultValue="personal" className="mt-8">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                    <PersonalInfoForm user={
                        user !
                    }/>
                </TabsContent>

                <TabsContent value="account" className="space-y-4">
                    <AccountSettingsForm/>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                    <SecuritySettings user={
                        user !
                    }/>
                </TabsContent>

            </Tabs>
        </div>
    )
}
