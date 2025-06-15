import React from 'react'
import fetchDataService from '../service/fetchData.service'
import UserDashboard from './userDashboard'
interface IProps {
    name: string
}
const DashboardContent = async({name}: IProps) => {
        const [
        responses,
        availableForms,
    ] = await Promise.all([
        fetchDataService.answeredForms(name),
        fetchDataService.availableForms(name),
    ]) 
    const data = {
        formsCompleted: responses.length,
        formsAvailable: availableForms.length,
        averageCompletionTime: "3m 45s",
        availableForms,
        completedForms: responses,
    }
    return (
        <UserDashboard {...data} name={name}/>
    )
}

export default DashboardContent