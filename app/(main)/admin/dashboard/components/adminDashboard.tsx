"use client" 
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import useDashboard from "../hooks/useDahboard"
import { IFormTable, IFormCreationData, IFormResponseData, IUserData, IUsersActivityData } from "@/@types"
import FormsTable from "@/components/forms-table/formsTable"
import SearchBar from "../components/searchBar"
import AllTabs from "../components/allTabs"
import { TABS } from "../constants/constants"
import TabHeader from "../components/tabHeader"
import AllCharts from "../components/allCharts"
import { useMemo } from "react"
import AllCards from "../components/allStates"
import DashboardHeader from "../components/dashboardHeader"
import { getActivesFirst } from "../utils/sortArray"
import UsersTable from "@/components/user-table/userTable"
import { generateStateCards } from "../utils/generateStateCards"
import { getSortedForms } from "../utils/sortByResponse"
interface IProps {
    usersData: IUserData[],
    formsData: IFormTable[],
    userActivityData: IUsersActivityData[],
    formCreationData: IFormCreationData[],
    formResponsesData: IFormResponseData[]
}

const AdminDashboard = (props: IProps) => {
    const {
        usersData,
        formsData,
        userActivityData,
        formCreationData,
        formResponsesData,
    } = props;
    const slicedUsers = getActivesFirst(usersData).slice(0, 5);
    const slicedForms = getSortedForms(formsData);
    const {
        totalUsers,
        activeUsers,
        totalForms,
        totalResponses,
    } = useDashboard({usersData, formsData});

    const stateCardsData = useMemo(() => generateStateCards(
            totalUsers,
            activeUsers,
            totalForms,
            totalResponses
        )
    , [usersData, formsData]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 pb-20 pt-0 md:pt-0 w-full">
            <DashboardHeader/>

            <div className="container mx-auto px-4 py-8">
                {/* Dashboard Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">

                    <AllTabs tabs={TABS}/>

                    <TabsContent value="overview" className="space-y-6">

                        <AllCards cards={stateCardsData} />

                        <AllCharts
                            formResponsesData={formResponsesData} 
                            formCreationData={formCreationData} 
                            userActivityData={userActivityData}
                        /> 

                    </TabsContent>

                    <TabsContent value="users" className="space-y-6">
                        <Card>
                            <TabHeader title={"User Management"} description={"View and manage all users on the platform"}/>
                            <CardContent>
                                <UsersTable users={slicedUsers} isSummary={true}/>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="forms" className="space-y-6">
                        <Card>
                            <TabHeader title={"Form Analytics"} description={"View and analyze all forms on the platform"}/>
                            <CardContent>
                                <FormsTable forms={slicedForms} role="admin" isSummary={true} name="admin"/>                            
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AdminDashboard;