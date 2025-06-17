import ResponsesTable from '@/components/responses-table/responsesTable'
import React from 'react'
import fetchDataService from '../../dashboard/services/fetchData.service'
interface IProps {
    name: string;
}
const PageContent = async({name}: IProps) => {
    const responses = await fetchDataService.creatorResponses(name)
    return (
        <ResponsesTable responses={responses} />
    )
}

export default PageContent