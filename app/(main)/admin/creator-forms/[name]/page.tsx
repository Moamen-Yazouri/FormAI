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
        <div className='min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 pb-20 pt-0 md:pt-0 w-full'>
            <DashboardHeader/>
            <div className="rounded-md border bg-white p-5 mx-5 my-5">
                <FormsTable filteredForms={userFormsData}/>
            </div>
        </div>
    )
}

export default AllForms
