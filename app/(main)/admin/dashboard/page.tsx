import AdminDashboard from './components/adminDashboard';
import FetchData from "./services/fetchData.service";

const page = async() => {

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
    return (
        <AdminDashboard 
            usersData={usersData} 
            formsData={formsData} 
            userActivityData={userActivityData} 
            formCreationData={formCreationData} 
            formResponsesData={formResponsesData}        
        />
    )
}

export default page