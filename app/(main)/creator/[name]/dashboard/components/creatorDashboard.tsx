"use client"
import {Tabs, TabsContent} from "@/components/ui/tabs";
import {Card, CardContent} from "@/components/ui/card";
import useCreatorDashboard from "../hooks/useDashboard";
import DashboardHeader from "./dashboardHeader";
import AllTabs from "./allTabs";
import AllCards from "./allStates";
import AllCharts from "./allCharts";
import TabHeader from "./tabHeader";
import SearchBar from "./searchBar";

import CreatorFormsTable from "./creatorFormsTable";

import {
    ICreatorActivityData,
    ICreatorResponses,
    IFormCreationData,
    IFormResponseData
} from "../types";

import {IFormTable} from "@/@types";
import ResponsesTable from "@/components/responses-table/responsesTable";
import { CREATOR_TABS } from "../constants";


interface IProps {
    formsData: IFormTable[]
    formCreationData: IFormCreationData[]
    formResponsesData: IFormResponseData[]
    creatorActivityData: ICreatorActivityData[]
    responses: ICreatorResponses[]
}

const CreatorDashboard = (props : IProps) => {
    const {
        formsData,
        formCreationData,
        formResponsesData,
        creatorActivityData,
        responses
    } = props
    
    const {
        slicedForms,
        slicedResponses,
        stateCardsData,
        searchForms,
        searchResponses,
        recentResponses,
        setSearchForms,
        setSearchResponses
    } = useCreatorDashboard({formsData, responses});


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
                <ResponsesTable responses={slicedResponses}  isSummary={true} />
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    </div>
    )


}

export default CreatorDashboard;
