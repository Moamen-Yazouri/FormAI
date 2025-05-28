import React from 'react'
import UserActivityChart from './charts/usersActivity'
import FormCreationTrend from './formCreationTrend'
import FormsDistribution from './charts/formsDistribution'
import { ActiveUsersCard } from './charts/latestUsers'
import { IActiveUsers, IFormCreationData, IFormResponseData, IUsersActivityData } from '@/@types'
interface IProps {
    userActivityData: IUsersActivityData[],
    formCreationData: IFormCreationData[],
    formResponsesData: IFormResponseData[],
    activeUsersData: IActiveUsers[],
}
const AllCharts = (props: IProps) => {
    const {
        userActivityData,
        formCreationData,
        formResponsesData,
        activeUsersData
    } = props
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserActivityChart userActivityData={userActivityData}/>

            <FormCreationTrend formCreationData={formCreationData}/>

            <FormsDistribution formResponsesData={formResponsesData} />

            <ActiveUsersCard activeUsers={activeUsersData}/>
        </div>
    )
}

export default AllCharts