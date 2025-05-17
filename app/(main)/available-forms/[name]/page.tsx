import FormsTable from '@/components/forms-table/formsTable'
import dashboardService from '@/module/services/user/dashboard.service';
import React from 'react'
interface IProps {
    params: Promise<{name: string}>
}
const AvailableForms = async(props: IProps) => {
    const name = (await props.params).name;
    const availableForms = await dashboardService.getUserForms(name);
    return (
        <FormsTable filteredForms={availableForms}/>
    )
}

export default AvailableForms;