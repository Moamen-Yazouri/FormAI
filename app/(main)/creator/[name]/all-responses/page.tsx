import dashboardService from '@/module/services/creator/dashboard.service';
import React from 'react'
import fetchDataService from '../dashboard/services/fetchData.service';
import ResponsesTable from '@/components/responses-table/responsesTable';
interface IProps {
    params: Promise<{name: string}>
}
const page = async (props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    const responses = await fetchDataService.creatorResponses(name)
    return (
        <ResponsesTable responses={responses} name = {name}/>
    )
}

export default page;