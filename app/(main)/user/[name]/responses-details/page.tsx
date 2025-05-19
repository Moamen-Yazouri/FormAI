import React from 'react'
import CompletedFormsPage from './components/userResponses'
import fetchDataService from '../dashboard/service/fetchData.service';
interface IProps {
    params: Promise<{name: string}>;
}
const page = async(props: IProps) => {
    const nameParam = (await props.params);
    const name = decodeURIComponent(nameParam.name); 
    console.log((await props.params).name)
    const responseDetails = await fetchDataService.getUserResponseDetails(name);
    return (
        <CompletedFormsPage responsesDetails={responseDetails} />
    )
}

export default page