import React from 'react'
import ResponseDetailsPage from '../components/responseReview'
import dashboardService from '@/module/services/creator/dashboard.service';
import { IDisplayResponse } from '@/@types';
import responseService from '@/module/services/response.service';
interface IProps {
    params: Promise<{id: string}>
}
const page = async(props: IProps) => {
    const id = (await props.params).id;
    const response: IDisplayResponse = await responseService.getResponse(id);
    return (
        <ResponseDetailsPage response={response}/>
    )
}

export default page