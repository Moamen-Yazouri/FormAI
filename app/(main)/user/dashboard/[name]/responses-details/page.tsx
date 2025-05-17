import React from 'react'
import CompletedFormsPage from '../../components/userResponses'
import fetchDataService from '../../service/fetchData.service';
interface IProps {
    params: Promise<{name: string}>;
}
const page = async(props: IProps) => {
    const name = decodeURIComponent((await props.params).name); 
    console.log(name)
    const responseDetails = await fetchDataService.getUserResponseDetails(name);
    return (
        <CompletedFormsPage responsesDetails={responseDetails} />
    )
}

export default page