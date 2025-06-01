import React from 'react'
import fetchDataService from '../dashboard/services/fetchData.service';
import FormsTable from '@/components/forms-table/formsTable';
interface IProps {
    params: Promise<{name: string}>
}
const page = async (props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    const forms = await fetchDataService.formsData(name)
    return (
        <FormsTable forms={forms}/>
    )
}

export default page