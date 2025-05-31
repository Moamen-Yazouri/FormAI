"use client"
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {Card, CardContent} from "@/components/ui/card"
import {useContext} from "react"
import {
    LayoutDashboard,
    FileText,
    Users
} from "lucide-react"
import useCreatorDashboard from "../hooks/useDashboard"
import DashboardHeader from "./dashboardHeader"
import AllTabs from "./allTabs"
import AllCards from "./allStates"
import AllCharts from "./allCharts"
import TabHeader from "./tabHeader"
import SearchBar from "./searchBar"
import ResponsesTable from "./responses-table/responsesTable"
import CreatorFormsTable from "./creatorFormsTable"
import {
    ICreatorActivityData,
    ICreatorResponses,
    IFormCreationData,
    IFormResponseData
} from "../types"
import {IFormTable} from "@/@types"
import {AuthContext} from "@/providers/auth/authProvider"
import LoadingPage from "@/components/loadingPage/loadingPage"
export const dummyForms = [
    {
        id: "1",
        name: "Customer Feedback",
        creator: "John Doe",
        responses: 12,
        createdAt: new Date("2025-04-01T10:00:00Z")
    },
    {
        id: "2",
        name: "Survey: UI Preferences",
        creator: "Jane Smith",
        responses: 30,
        createdAt: new Date("2025-04-15T15:20:00Z")
    },
    {
        id: "3",
        name: "Bug Report Form",
        creator: "Alice Johnson",
        responses: 5,
        createdAt: new Date("2025-03-28T08:30:00Z")
    },
    {
        id: "4",
        name: "Event Registration",
        creator: "Bob Brown",
        responses: 89,
        createdAt: new Date("2025-05-01T12:45:00Z")
    }, {
        id: "5",
        name: "Weekly Feedback",
        creator: "Charlie Green",
        responses: 17,
        createdAt: new Date("2025-04-29T09:00:00Z")
    },
];


interface IProps {
    formsData: IFormTable[]
    formCreationData: IFormCreationData[]
    formResponsesData: IFormResponseData[]
    creatorActivityData: ICreatorActivityData[]
    responses: ICreatorResponses[]
}

const CREATOR_TABS = [
    {
        value: "overview",
        label: "Overview",
        icon: <LayoutDashboard className="h-4 w-4"/>
    }, {
        value: "forms",
        label: "My Forms",
        icon: <FileText className="h-4 w-4"/>
    }, {
        value: "responses",
        label: "Responses",
        icon: <Users className="h-4 w-4"/>
    },
]

const CreatorDashboard = (props : IProps) => {
    const {
        formsData,
        formCreationData,
        formResponsesData,
        creatorActivityData,
        responses
    } = props
    const {user, isLoading} = useContext(AuthContext)
    const {
        slicedForms,
        slicedResponses,
        stateCardsData,
        searchForms,
        searchResponses,
        recentResponses,
        setSearchForms,
        setSearchResponses
    } = useCreatorDashboard({formsData, responses})


    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-white px-4 md:px-10 py-8">
                <LoadingPage/>
            </div>
        )
    }
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-900 text-slate-200 pb-20 pt-0 w-full">
        <DashboardHeader />

        <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
            <AllTabs tabs={CREATOR_TABS} />

            <TabsContent value="overview" className="space-y-6">
            <AllCards cards={stateCardsData} />

            <AllCharts
                formResponsesData={formResponsesData}
                formCreationData={formCreationData}
                creatorActivityData={creatorActivityData}
                recentResponses={recentResponses}
            />
            </TabsContent>

            <TabsContent value="forms" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm text-[#93c1ff]">
                <TabHeader title="My Forms" description="View and manage all your created forms" />
                <CardContent>
                <SearchBar placeholder="Search forms..." setSearch={setSearchForms} search={searchForms} />
                <CreatorFormsTable forms={slicedForms} />
                </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="responses" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm text-[#93c1ff]">
                <TabHeader title="Form Responses" description="View and analyze responses to your forms" />
                <CardContent>
                <SearchBar placeholder="Search responses..." setSearch={setSearchResponses} search={searchResponses} />
                <ResponsesTable responses={slicedResponses} name={user!.name} isSummary={true} />
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    </div>
    )


}

export default CreatorDashboard
