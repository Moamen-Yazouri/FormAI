import { connection } from '@/DB/connection';
import dashboardService from '@/module/services/dashboard.service';
import DashboardHeader from '../../admin/dashboard/components/dashboardHeader';
import FormsTable from '../../admin/dashboard/components/tables/formsTable';
interface IProps {
    params: Promise<{ id: string }>;
}
const AllForms = async (props: IProps) => {
    const id = (await props.params).id;
    await connection();
    const userFormsData = await dashboardService.getUserForms(id);
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 pb-20 pt-0 md:pt-0 w-full'>
            <DashboardHeader/>
            <div className="rounded-md border bg-white p-5 mx-5 my-5">
                <FormsTable filteredForms={userFormsData} />
            </div>
        </div>
    )
}

export default AllForms