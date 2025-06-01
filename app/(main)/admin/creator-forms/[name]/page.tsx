import {connection} from '@/DB/connection';
import dashboardService from '@/module/services/admin/dashboard.service';
import DashboardHeader from '../../dashboard/components/dashboardHeader';
import FormsTable from '@/components/forms-table/formsTable';
interface IProps {
    params: Promise < {
        name: string
    } >;
}
const AllForms = async (props : IProps) => {
    const username = (await props.params).name;
    await connection();
    const userFormsData = await dashboardService.getCreatorForms(username);
    return (
        <FormsTable forms={userFormsData}/>
    )
}

export default AllForms
