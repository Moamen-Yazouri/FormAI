"use client" 
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { ActiveUsersCard } from "./components/overview/latestUsers"
import useDashboard from "./hooks/useDahboard"
import { IUserData } from "@/@types"
import UsersTable from "./components/users/usersTable"
import FormsTable from "./components/forms/formsTable"
import SearchBar from "./components/searchBar"
import StateCard from "./components/stateCard"
import UserActivityChart from "./components/overview/usersActivity"
import FormCreationTrend from "./components/formCreationTrend"
import FormsDistribution from "./components/overview/formsDistribution"
import AllTabs from "./components/allTabs"
import { TABS } from "./constants/constants"
import TabHeader from "./components/tabHeader"
interface IProps {
    totalUsers: number ,
    activeUsers: number,
    totalForms: number,
    totalResponses: number,
}
// Mock data for the dashboard
export const mockUserData: IUserData[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      role: "admin",
      forms: 12,
      lastActive: "2025-04-18",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "active",
      role: "creator",
      forms: 8,
      lastActive: "2025-04-17",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      status: "inactive",
      role: "user",
      forms: 3,
      lastActive: "2025-04-10",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      status: "active",
      role: "creator",
      forms: 15,
      lastActive: "2025-04-18",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael@example.com",
      status: "active",
      role: "user",
      forms: 6,
      lastActive: "2025-04-16",
    },
    {
      id: 6,
      name: "Sarah Brown",
      email: "sarah@example.com",
      status: "inactive",
      role: "user",
      forms: 0,
      lastActive: "2025-04-05",
    },
    {
      id: 7,
      name: "David Miller",
      email: "david@example.com",
      status: "active",
      role: "creator",
      forms: 9,
      lastActive: "2025-04-17",
    },
    {
      id: 8,
      name: "Lisa Garcia",
      email: "lisa@example.com",
      status: "active",
      role: "admin",
      forms: 4,
      lastActive: "2025-04-15",
    },
];

const mockFormData = [
    {
        id: 1,
        name: "Contact Form",
        creator: "John Doe",
        responses: 145,
        createdAt: "2025-04-10"
    },
    {
        id: 2,
        name: "Job Application",
        creator: "Emily Davis",
        responses: 78,
        createdAt: "2025-04-12"
    },
    {
        id: 3,
        name: "Customer Survey",
        creator: "Jane Smith",
        responses: 213,
        createdAt: "2025-04-08"
    },
    {
        id: 4,
        name: "Event Registration",
        creator: "Michael Wilson",
        responses: 56,
        createdAt: "2025-04-15"
    }, {
        id: 5,
        name: "Feedback Form",
        creator: "David Miller",
        responses: 92,
        createdAt: "2025-04-11"
    }, {
        id: 6,
        name: "Newsletter Signup",
        creator: "John Doe",
        responses: 187,
        createdAt: "2025-04-09"
    }, {
        id: 7,
        name: "Product Order",
        creator: "Emily Davis",
        responses: 124,
        createdAt: "2025-04-14"
    }, {
        id: 8,
        name: "Support Request",
        creator: "Lisa Garcia",
        responses: 67,
        createdAt: "2025-04-16"
    },
]

// Chart data
const userActivityData = [
    {
        name: "Mon",
        active: 120,
        new: 15
    },
    {
        name: "Tue",
        active: 132,
        new: 12
    },
    {
        name: "Wed",
        active: 141,
        new: 18
    },
    {
        name: "Thu",
        active: 158,
        new: 24
    }, {
        name: "Fri",
        active: 142,
        new: 16
    }, {
        name: "Sat",
        active: 90,
        new: 8
    }, {
        name: "Sun",
        active: 85,
        new: 7
    },
]

const formCreationData = [
    {
        name: "Jan",
        forms: 65
    },
    {
        name: "Feb",
        forms: 78
    },
    {
        name: "Mar",
        forms: 90
    },
    {
        name: "Apr",
        forms: 112
    }, {
        name: "May",
        forms: 130
    }, {
        name: "Jun",
        forms: 142
    }, {
        name: "Jul",
        forms: 151
    }, {
        name: "Aug",
        forms: 160
    }, {
        name: "Sep",
        forms: 175
    }, {
        name: "Oct",
        forms: 190
    }, {
        name: "Nov",
        forms: 205
    }, {
        name: "Dec",
        forms: 220
    },
]

const formResponsesData = [
    {
        name: "Contact Form",
        value: 145
    },
    {
        name: "Job Application",
        value: 78
    },
    {
        name: "Customer Survey",
        value: 213
    },
    {
        name: "Event Registration",
        value: 56
    }, {
        name: "Feedback Form",
        value: 92
    },
]

export default function AdminDashboard() {
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
    } = useDashboard({mockUserData, mockFormData})

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 pb-20 pt-0 md:pt-0 w-full">
            <header className="bg-white border-b border-purple-100 shadow-sm sticky top-0 z-10 mt-14 md:mt-0">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold text-purple-900">Admin Dashboard</h1>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Dashboard Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">

                    <AllTabs tabs={TABS}/>

                    <TabsContent value="overview" className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StateCard stateTitle={"Total Users"} stateValue={totalUsers} statePercentage={10}/>

                            <StateCard stateTitle={"Active Users"} stateValue={activeUsers} statePercentage={10}/>

                            <StateCard stateTitle={"Total Forms"} stateValue={totalForms} statePercentage={15}/>

                            <StateCard stateTitle={"Form Responses"} stateValue={totalResponses} statePercentage={3}/>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <UserActivityChart userActivityData={userActivityData}/>

                            <FormCreationTrend formCreationData={formCreationData}/>
    
                            <FormsDistribution formResponsesData={formResponsesData} />

                            <ActiveUsersCard/>
                        </div>

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
