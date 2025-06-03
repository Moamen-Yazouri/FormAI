import React from 'react'
import fetchDataService from '../service/fetchData.service';
import FormsTable from '@/components/forms-table/formsTable';
import authService from '@/module/services/auth.service';
import { unauthorized } from 'next/navigation';
import { handleAccess } from '@/lib/triggerCoventions';
interface IProps {
    params: Promise<{name: string}>
}
const AvailableForms = async(props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    const availableForms = await fetchDataService.getAvailableForms(name);
    return (
        <FormsTable forms= {availableForms} />
    )
}

export default AvailableForms;