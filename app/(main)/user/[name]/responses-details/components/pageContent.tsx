import React from 'react'
import fetchDataService from '../../dashboard/service/fetchData.service';
import CompletedFormsPage from '../components/userResponses';
interface IProps {
    name: string;
}
const pageContent = async ({name}: IProps) => {
    const decodedName = decodeURIComponent(name); 
    const responseDetails = await fetchDataService.getUserResponseDetails(decodedName);
    return (
        <CompletedFormsPage responsesDetails={responseDetails} />
    )
}

export default pageContent