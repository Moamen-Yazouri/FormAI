import React from 'react'
import fetchDataService from './service/fetchData.service';
import FormsTable from '@/components/forms-table/formsTable';
interface IProps {
    params: Promise<{name: string}>
}
const AvailableForms = async(props: IProps) => {
    const name = decodeURIComponent((await props.params).name); 
    const availableForms = await fetchDataService.getAvailableForms(name);
    return (
        <FormsTable forms= {availableForms} role={'user'} name={name} />
    )
}

export default AvailableForms;