import React from 'react'
import fetchDataService from '../dashboard/services/fetchData.service'
import UsersTable from '@/components/user-table/userTable';
const page = async() => {
    const users = await fetchDataService.usersData();
    return (
        <UsersTable users={users}/>
    )
}

export default page