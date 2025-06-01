import React from 'react'

import FormsTable from '@/components/forms-table/formsTable';
import { getCreatorForms } from '../service/fetchData.service';
interface IProps {
    params: Promise<{name: string}>
}
const page = async (props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    const forms = await getCreatorForms(name)
    return (
        <FormsTable forms={forms}/>
    )
}

export default page;