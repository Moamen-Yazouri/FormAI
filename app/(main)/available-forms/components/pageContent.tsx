import React from 'react'
import fetchDataService from '../service/fetchData.service';
import FormsTable from '@/components/forms-table/formsTable';
interface IProps {
    name: string;
}
const pageContent = async({name}: IProps) => {
    const availableForms = await fetchDataService.getAvailableForms(name);
    return (
        <FormsTable forms= {availableForms} available={true}/>
    )
}

export default pageContent