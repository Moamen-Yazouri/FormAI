import FormsTable from '@/components/forms-table/formsTable';
import { connection } from '@/DB/connection';
import dashboardService from '@/module/services/admin/dashboard.service';
import React from 'react';
interface IProps {
    name: string;
}
const PageContent = async ({name}: IProps) => {
    await connection();
    const userFormsData = await dashboardService.getCreatorForms(name);
    return (
        <FormsTable forms={userFormsData}/>
    )
}

export default PageContent