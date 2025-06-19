import ResponsesTable from '@/components/responses-table/responsesTable'
import React from 'react'
import fetchDataService from '../../dashboard/services/fetchData.service'
import authService from '@/module/services/auth.service';
import { handleAccess } from '@/lib/triggerCoventions';
interface IProps {
    name: string;
}
const PageContent = async({name}: IProps) => {
    const accessRight = await authService.validateName(name);
    handleAccess(accessRight);
    const responses = await fetchDataService.creatorResponses(name);
    return (
        <ResponsesTable responses={responses} />
    )
}

export default PageContent