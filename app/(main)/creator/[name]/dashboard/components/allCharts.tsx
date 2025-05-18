import { ICreatorActivityData, ICreatorResponses, IFormCreationData, IFormResponseData } from "../types"
import CreatorActivityChart from "./all-charts/creatorActivityChart"
import FormCreationTrend from "./all-charts/formCreationChart"
import FormsDistribution from "./all-charts/formDistributionChart"
import RecentResponses from "./all-charts/recentResponses"


interface IProps {
    creatorActivityData: ICreatorActivityData[]
    formCreationData: IFormCreationData[]
    formResponsesData: IFormResponseData[]
    recentResponses: ICreatorResponses[]
}

const AllCharts = (props: IProps) => {
    const { creatorActivityData, formCreationData, formResponsesData, recentResponses } = props

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CreatorActivityChart creatorActivityData={creatorActivityData} />
            <FormCreationTrend formCreationData={formCreationData} />
            <FormsDistribution formResponsesData={formResponsesData} />
            <RecentResponses recentResponses={recentResponses} />
        </div>
    )
}

export default AllCharts
