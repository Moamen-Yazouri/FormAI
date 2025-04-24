"use client" 
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import useDashboard from "../hooks/useDahboard"
import { IDashboardForm, IFormCreationData, IFormResponseData, IUserData, IUsersActivityData } from "@/@types"
import UsersTable from "./tables/usersTable"
import FormsTable from "./tables/formsTable"
import SearchBar from "../components/searchBar"
import AllTabs from "../components/allTabs"
import { TABS } from "../constants/constants"
import TabHeader from "../components/tabHeader"
import AllCharts from "../components/allCharts"
import { useMemo } from "react"
import AllCards from "../components/allStates"
import DashboardHeader from "../components/dashboardHeader"
import { getActivesFirst } from "../utils/sortArray"
interface IProps {
    usersData: IUserData[],
    formsData: IDashboardForm[],
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
    const userData = getActivesFirst(usersData);
    const {
        filteredUsers,
        filteredForms,
        totalUsers,
        searchUsers,
        searchForms,
        activeUsers,
        totalForms,
        totalResponses,
        setSearchUsers,
        setSearchForms,
    } = useDashboard({userData, formsData});

    const stateCardsData = useMemo(() => [
        {
            stateTitle: "Total Users",
            stateValue: totalUsers,
            statePercentage: 10,
        },
        {
            stateTitle: "Active Users",
            stateValue: activeUsers,
            statePercentage: 10,
        },
        {
            stateTitle: "Total Forms",
            stateValue: totalForms,
            statePercentage: 15,
        },
        {
            stateTitle: "Form Responses",
            stateValue: totalResponses,
            statePercentage: 3,
        },
    ], [totalUsers, activeUsers, totalForms, totalResponses]);
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

                                <SearchBar
                                    placeholder="Search users..."
                                    setSearch={setSearchUsers}
                                    search={searchUsers}
                                />

                                <UsersTable filteredUsers={filteredUsers}/>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="forms" className="space-y-6">
                        <Card>
                            <TabHeader title={"Form Analytics"} description={"View and analyze all forms on the platform"}/>
                            <CardContent>
                                <SearchBar
                                    placeholder="Search forms..."
                                    setSearch={setSearchForms}
                                    search={searchForms}
                                />
                                <FormsTable filteredForms={filteredForms} />                            
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AdminDashboard;