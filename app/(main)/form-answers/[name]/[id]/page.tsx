import React from 'react'
import { getFormAnswers } from '../../service/answers.service';
import ResponsesTable from '@/components/responses-table/responsesTable';
import { getAccessRights } from '../../service/accessRights.service';
import { forbidden, notFound, unauthorized } from 'next/navigation';
import { handleAccess } from '@/lib/triggerCoventions';

interface IProps {
    params: Promise<{id: string, name: string}>
}
const page = async(props: IProps) => {
    const {id, name} = await props.params;
    const validName = decodeURIComponent(name);
    const access = await getAccessRights(id, name);
    handleAccess(access);

    const { answers} = await getFormAnswers(id, validName);
    return (
        <ResponsesTable responses={answers} />
    )
}

export default page