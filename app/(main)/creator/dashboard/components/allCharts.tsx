import CreatorActivityChart from "./all-charts/creatorActivityChart"
import FormCreationTrend from "./all-charts/formCreationChart"
import FormsDistribution from "./all-charts/formDistributionChart"
import RecentResponses from "./all-charts/recentResponses"

interface IFormCreationData {
    date: string
    count: number
}

interface IFormResponseData {
    formId: string
    formTitle: string
    responsesCount: number
}

interface ICreatorActivityData {
    date: string
    formsCreated: number
    responsesReceived: number
}

interface IProps {
    creatorActivityData: ICreatorActivityData[]
    formCreationData: IFormCreationData[]
    formResponsesData: IFormResponseData[]
}

const AllCharts = (props: IProps) => {
    const { creatorActivityData, formCreationData, formResponsesData } = props

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CreatorActivityChart creatorActivityData={creatorActivityData} />
        <FormCreationTrend formCreationData={formCreationData} />
        <FormsDistribution formResponsesData={formResponsesData} />
        <RecentResponses />
        </div>
    )
}

export default AllCharts
