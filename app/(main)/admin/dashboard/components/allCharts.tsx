import React from 'react'
import UserActivityChart from './charts/usersActivity'
import FormCreationTrend from './formCreationTrend'
import FormsDistribution from './charts/formsDistribution'
import { ActiveUsersCard } from './charts/latestUsers'
import { IFormCreationData, IFormResponseData, IUsersActivityData } from '@/@types'
interface IProps {
    userActivityData: IUsersActivityData[],
    formCreationData: IFormCreationData[],
    formResponsesData: IFormResponseData[],
}
const AllCharts = (props: IProps) => {
    const {
        userActivityData,
        formCreationData,
        formResponsesData,
    } = props
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserActivityChart userActivityData={userActivityData}/>

            <FormCreationTrend formCreationData={formCreationData}/>

            <FormsDistribution formResponsesData={formResponsesData} />

            <ActiveUsersCard/>
        </div>
    )
}

export default AllCharts