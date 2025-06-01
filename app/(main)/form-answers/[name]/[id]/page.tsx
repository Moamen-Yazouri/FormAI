import React from 'react'
import { getFormAnswers } from '../../service/answers.service';
import ResponsesTable from '@/components/responses-table/responsesTable';

interface IProps {
    params: Promise<{id: string, name: string}>
}
const page = async(props: IProps) => {
    const {id, name} = await props.params;
    const validName = decodeURIComponent(name);
    const {message, answers} = await getFormAnswers(id, validName);
    return (
        <ResponsesTable responses={answers} name={validName}/>
    )
}

export default page