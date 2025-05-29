"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import useDashboard from "../hooks/useDahboard"
import type {
  IFormTable,
  IFormCreationData,
  IFormResponseData,
  IUserData,
  IUsersActivityData,
  IActiveUsers,
} from "@/@types"
import FormsTable from "@/components/forms-table/formsTable"
import AllTabs from "../components/allTabs"
import { TABS } from "../constants/constants"
import TabHeader from "../components/tabHeader"
import AllCharts from "../components/allCharts"
import AllCards from "../components/allStates"
import DashboardHeader from "../components/dashboardHeader"
import UsersTable from "@/components/user-table/userTable"

interface IProps {
    usersData: IUserData[]
    formsData: IFormTable[]
    userActivityData: IUsersActivityData[]
    formCreationData: IFormCreationData[]
    formResponsesData: IFormResponseData[]
    activeUsers: IActiveUsers[]
}

const AdminDashboard = (props: IProps) => {
    const { usersData, formsData, userActivityData, formCreationData, formResponsesData, activeUsers } = props

    const { stateCardsData, slicedUsers, slicedForms } = useDashboard({ usersData, formsData })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-900 text-slate-200 pb-20 pt-0 w-full">
        <DashboardHeader />

        <div className="container mx-auto px-4 py-8">
            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
            <AllTabs tabs={TABS} />

            <TabsContent value="overview" className="space-y-6">
                <AllCards cards={stateCardsData} />
                <AllCharts
                formResponsesData={formResponsesData}
                formCreationData={formCreationData}
                userActivityData={userActivityData}
                activeUsersData={activeUsers}
                />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
                <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm text-[#93c1ff]">
                <TabHeader title="User Management" description="View and manage all users on the platform" />
                <CardContent>
                    <UsersTable users={slicedUsers} isSummary={true} />
                </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="forms" className="space-y-6">
                <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm text-[#93c1ff]">
                <TabHeader title="Form Analytics" description="View and analyze all forms on the platform" />
                <CardContent>
                    <FormsTable forms={slicedForms} role="admin" isSummary={true} name="admin" />
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
        </div>
        </div>
    )
}

export default AdminDashboard
