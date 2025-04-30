import FormsTable from '@/components/forms-table/formsTable'
import formsService from '@/module/services/forms.service';
import React from 'react'
interface IProps {
    params: Promise<{name: string}>
}
const AvailableForms = async(props: IProps) => {
    const name = (await props.params).name;
    const availableForms = await formsService.getAllowedForms(name);
    return (
        <FormsTable filteredForms={availableForms}/>
    )
}

export default AvailableForms;