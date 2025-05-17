import dashboardService from '@/module/services/user/dashboard.service';
import React from 'react'
import AvailableTable from '../components/formsAvailableTable';
import { connection } from '@/DB/connection';
interface IProps {
    params: Promise<{name: string}>
}
const AvailableForms = async(props: IProps) => {
    await connection();
    const name = decodeURIComponent((await props.params).name); 
    const availableForms = await dashboardService.getUserForms(name);
    return (
        <AvailableTable filteredForms={availableForms}/>
    )
}

export default AvailableForms;