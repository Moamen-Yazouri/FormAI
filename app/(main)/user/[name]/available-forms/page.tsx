import React from 'react'
import AvailableTable from './components/formsAvailableTable';
import fetchDataService from './service/fetchData.service';
interface IProps {
    params: Promise<{name: string}>
}
const AvailableForms = async(props: IProps) => {
    const name = decodeURIComponent((await props.params).name); 
    const availableForms = await fetchDataService.getAvailableForms(name);
    return (
        <AvailableTable forms={availableForms}/>
    )
}

export default AvailableForms;