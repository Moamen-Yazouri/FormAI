import React from 'react';
import ResponseDetailsPage from '../components/responseReview';
import { IDisplayResponse } from '@/@types';
import FetchDataService from '../service/FetchData.service';
import { getAccessRight } from '../service/accessRight.service';
import { handleAccess } from '@/lib/triggerCoventions';

interface IProps {
    params: Promise<{id: string}>
}
const page = async(props: IProps) => {
    const id = (await props.params).id;
    const validateAccess = await getAccessRight(id);
    handleAccess(validateAccess);
    const response = await FetchDataService.getResponseDetails(id);
    return (
        <ResponseDetailsPage response={response}/>
    )
}

export default page