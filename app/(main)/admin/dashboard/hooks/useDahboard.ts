import { IDashboardForm, IUserData } from "@/@types"
import { useCallback, useMemo, useState } from "react"

interface IProps {
    userData: IUserData[],
    formsData: IDashboardForm[],
}
const useDashboard = (props: IProps) => {
    const { userData, formsData } = props
    const [searchUsers, setSearchUsers] = useState("")
    const [searchForms, setSearchForms] = useState("")
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [totalForms, setTotalForms] = useState(0);
    const [totalResponses, setTotalResponses] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
        
    const filteredUsers = userData.filter(
        user => user.name.toLowerCase().includes(searchUsers.toLowerCase()) || 
        user.email.toLowerCase().includes(searchUsers.toLowerCase())
    );

    const filteredForms = formsData?.filter(
        form => form.name.toLowerCase().includes(searchForms.toLowerCase()) || 
        form.creator.toLowerCase().includes(searchForms.toLowerCase())
    );

    useMemo(() => {
        setTotalUsers(userData.length);
        setActiveUsers(userData.filter(user => user.status === "active").length); 
    }, [userData]);

    useMemo(() => {
        setTotalForms(formsData.length);
        setTotalResponses(formsData.reduce((sum, form) => sum + form.responses, 0));
    }, [formsData]);


    return {
        filteredUsers,
        filteredForms,
        totalUsers,
        searchUsers,
        searchForms,
        activeUsers,
        totalForms,
        totalResponses,
        isDialogOpen,
        setIsDialogOpen,
        setSearchUsers,
        setSearchForms,
    }
}
export default useDashboard