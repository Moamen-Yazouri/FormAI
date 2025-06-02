import dashboardService from '@/module/services/creator/dashboard.service';
import React from 'react'
import fetchDataService from '../dashboard/services/fetchData.service';
import ResponsesTable from '@/components/responses-table/responsesTable';
import authService from '@/module/services/auth.service';
import { unauthorized } from 'next/navigation';
interface IProps {
    params: Promise<{name: string}>
}
const page = async (props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    const access = await authService.validateUser(name);
    if(!access) {
        unauthorized();
    }
    const responses = await fetchDataService.creatorResponses(name)
    return (
        <ResponsesTable responses={responses} />
    )
}

export default page;