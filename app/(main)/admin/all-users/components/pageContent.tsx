import UsersTable from '@/components/user-table/userTable';
import fetchDataService from '../../dashboard/services/fetchData.service';

const PageContent = async() => {
    const users = await fetchDataService.usersData();
    return (
        <UsersTable users={users}/>
    )
}

export default PageContent