import React from 'react'
import CreatorDashboard from './creatorDashboard';
import FetchServices from '../services/fetchData.service'
interface IProps {
    name: string;
}
const DashboardContent = async({name}: IProps) => {
    const [
        formData,
        formCreationData,
        formResponseData,
        creatorActivityData,
        responses,
    ] = await Promise.all([
        FetchServices.formsData(name),      
        FetchServices.formCreationData(name),
        FetchServices.formResponseData(name),
        FetchServices.creatorActivityData(name),
        FetchServices.creatorResponses(name),
    ]);
    return (
            <CreatorDashboard 
            formsData={formData} 
            formCreationData={formCreationData} 
            formResponsesData={formResponseData} 
            creatorActivityData={creatorActivityData}
            responses={responses}
            />
    )

}

export default DashboardContent
