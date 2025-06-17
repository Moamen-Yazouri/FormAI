import React from 'react';
import { getAccessRights } from '../service/accessRights.service';
import { handleAccess } from '@/lib/triggerCoventions';
import { getFormAnswers } from '../service/answers.service';
import ResponsesTable from '@/components/responses-table/responsesTable';
interface IProps {
    name: string;
    id: string;
}
const pageContent = async ({name, id}: IProps) => {
    const access = await getAccessRights(id);
    handleAccess(access);
    const { answers} = await getFormAnswers(id, name);
    return (
        <ResponsesTable responses={answers} />
    )
}

export default pageContent