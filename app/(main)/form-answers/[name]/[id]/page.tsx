import React from 'react'
import { getFormAnswers } from '../../service/answers.service';
import ResponsesTable from '@/components/responses-table/responsesTable';
import { getAccessRights } from '../../service/accessRights.service';
import { notFound, unauthorized } from 'next/navigation';

interface IProps {
    params: Promise<{id: string, name: string}>
}
const page = async(props: IProps) => {
    const {id, name} = await props.params;
    const validName = decodeURIComponent(name);
    const permission = await getAccessRights(id, name);
    if(permission === "unauthorized") {
        unauthorized()
    }
    if(permission === "notFound") {
        notFound();
    }
    const { answers} = await getFormAnswers(id, validName);
    return (
        <ResponsesTable responses={answers} />
    )
}

export default page