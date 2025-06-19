import React from 'react'
import fetchDataService from '../service/fetchData.service';
import FormsTable from '@/components/forms-table/formsTable';
import authService from '@/module/services/auth.service';
import { handleAccess } from '@/lib/triggerCoventions';
interface IProps {
    name: string;
}
const pageContent = async({name}: IProps) => {
    const accessRight = await authService.validateName(name);
    handleAccess(accessRight);
    const availableForms = await fetchDataService.getAvailableForms(name);
    return (
        <FormsTable forms= {availableForms} available={true}/>
    )
}

export default pageContent