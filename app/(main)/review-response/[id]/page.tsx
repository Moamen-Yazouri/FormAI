import React from 'react';
import ResponseDetailsPage from '../components/responseReview';
import { IDisplayResponse } from '@/@types';
import FetchDataService from '../service/FetchData.service';

interface IProps {
    params: Promise<{id: string}>
}
const page = async(props: IProps) => {
    const id = (await props.params).id;
    const response = await FetchDataService.getResponseDetails(id);
    return (
        <ResponseDetailsPage response={response}/>
    )
}

export default page