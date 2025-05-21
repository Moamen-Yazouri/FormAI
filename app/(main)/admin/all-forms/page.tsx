import { IFormTable } from '@/@types'
import React from 'react'
import fetchDataService from '../dashboard/services/fetchData.service'
import FormsTable from '@/components/forms-table/formsTable';

const page = async() => {
    const forms: IFormTable[] = await fetchDataService.formsData();
    return (
        <FormsTable role='admin' name='admin' forms={forms}/>
    )
}

export default page;