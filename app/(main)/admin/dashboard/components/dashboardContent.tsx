import AdminDashboard from '../components/adminDashboard';
import FetchData from "../services/fetchData.service";
import { getActives } from '../utils/getActives';


const DashboardContent = async() => {
    
    const [
        userActivityData,
        formCreationData,
        formResponsesData,
        usersData,
        formsData,
    ] = await Promise.all([
        FetchData.usersActivity(),      
        FetchData.formCreationData(),
        FetchData.formResponsesData(),
        FetchData.usersData(),
        FetchData.formsData(),
    ]);
    const activeUsers = getActives(usersData);
    return (
        <AdminDashboard 
            usersData={usersData}
            formsData={formsData}
            userActivityData={userActivityData}
            formCreationData={formCreationData}
            formResponsesData={formResponsesData} 
            activeUsers={activeUsers}        
        />
    )
}

export default DashboardContent;