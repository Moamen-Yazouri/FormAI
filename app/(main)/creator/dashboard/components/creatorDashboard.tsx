"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useMemo } from "react"
import { BarChart, PieChart, LayoutDashboard, FileText, Users } from "lucide-react"
import useCreatorDashboard from "../hooks/useDashboard"
import DashboardHeader from "./dashboardHeader"
import AllTabs from "./allTabs"
import AllCards from "./allStates"
import AllCharts from "./allCharts"
import TabHeader from "./tabHeader"
import SearchBar from "./searchBar"
import FormsTable from "@/components/forms-table/formsTable"
import ResponsesTable from "./responsesTable"
import CreatorFormsTable from "./creatorFormsTable"
import { ICreatorActivityData, ICreatorFormData, IFormCreationData, IFormResponseData } from "../types"
export const dummyForms = [
  {
    id: "1",
    name: "Customer Feedback",
    creator: "John Doe",
    responses: 12,
    createdAt: new Date("2025-04-01T10:00:00Z"),
  },
  {
    id: "2",
    name: "Survey: UI Preferences",
    creator: "Jane Smith",
    responses: 30,
    createdAt: new Date("2025-04-15T15:20:00Z"),
  },
  {
    id: "3",
    name: "Bug Report Form",
    creator: "Alice Johnson",
    responses: 5,
    createdAt: new Date("2025-03-28T08:30:00Z"),
  },
  {
    id: "4",
    name: "Event Registration",
    creator: "Bob Brown",
    responses: 89,
    createdAt: new Date("2025-05-01T12:45:00Z"),
  },
  {
    id: "5",
    name: "Weekly Feedback",
    creator: "Charlie Green",
    responses: 17,
    createdAt: new Date("2025-04-29T09:00:00Z"),
  },
];

// Types for our data
// interface IFormData {
//   id: string
//   title: string
//   createdAt: string
//   responsesCount: number
//   status: "active" | "draft" | "archived"
//   conversionRate: number
// }

// interface IFormCreationData {
//   date: string
//   count: number
// }

// interface IFormResponseData {
//   formId: string
//   formTitle: string
//   responsesCount: number
// }

// interface ICreatorActivityData {
//   date: string
//   formsCreated: number
//   responsesReceived: number
// }

interface IProps {
  formsData: ICreatorFormData[]
  formCreationData: IFormCreationData[]
  formResponsesData: IFormResponseData[]
  creatorActivityData: ICreatorActivityData[]
}

const CREATOR_TABS = [
  {
    value: "overview",
    label: "Overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    value: "forms",
    label: "My Forms",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    value: "responses",
    label: "Responses",
    icon: <Users className="h-4 w-4" />,
  },
]

const CreatorDashboard = (props: IProps) => {
  const { formsData, formCreationData, formResponsesData, creatorActivityData } = props

  const {
    filteredForms,
    filteredResponses,
    totalForms,
    totalResponses,
    searchForms,
    searchResponses,
    setSearchForms,
    setSearchResponses,
  } = useCreatorDashboard({ formsData })

  const stateCardsData = useMemo(
    () => [
      {
        stateTitle: "Total Forms",
        stateValue: totalForms,
        statePercentage: 10,
        icon: <FileText className="h-5 w-5 text-purple-500" />,
      },
      {
        stateTitle: "Active Forms",
        stateValue: 8,
        statePercentage: 15,
        icon: <BarChart className="h-5 w-5 text-green-500" />,
      },
      {
        stateTitle: "Total Responses",
        stateValue: totalResponses,
        statePercentage: 12,
        icon: <Users className="h-5 w-5 text-purple-500" />,
      },
    ],
    [totalForms, totalResponses],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 pb-20 pt-0 md:pt-0 w-full">
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
            />
          </TabsContent>

          <TabsContent value="forms" className="space-y-6">
            <Card>
              <TabHeader title="My Forms" description="View and manage all your created forms" />
              <CardContent>
                <SearchBar placeholder="Search forms..." setSearch={setSearchForms} search={searchForms} />
                <CreatorFormsTable filteredForms={filteredForms}/>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            <Card>
              <TabHeader title="Form Responses" description="View and analyze responses to your forms" />
              <CardContent>
                <SearchBar placeholder="Search responses..." setSearch={setSearchResponses} search={searchResponses} />
                <ResponsesTable filteredResponses={filteredResponses} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CreatorDashboard
