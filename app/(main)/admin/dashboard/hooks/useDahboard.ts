import { IDashboardForm, IUserData } from "@/@types"
import { useCallback, useMemo, useState } from "react"

interface IProps {
    mockUserData: IUserData[],
    mockFormData: IDashboardForm[],
}
const useDashboard = (props: IProps) => {
    const { mockUserData, mockFormData } = props
    const [searchUsers, setSearchUsers] = useState("")
    const [searchForms, setSearchForms] = useState("")
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [totalForms, setTotalForms] = useState(0);
    const [totalResponses, setTotalResponses] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredUsers = mockUserData.filter(
        user => user.name.toLowerCase().includes(searchUsers.toLowerCase()) || 
        user.email.toLowerCase().includes(searchUsers.toLowerCase())
    );

    const filteredForms = mockFormData.filter(
        form => form.name.toLowerCase().includes(searchForms.toLowerCase()) || 
        form.creator.toLowerCase().includes(searchForms.toLowerCase())
    );

    useMemo(() => {
        setTotalUsers(mockUserData.length);
        setActiveUsers(mockUserData.filter(user => user.status === "active").length); 
    }, [mockUserData]);

    useMemo(() => {
        setTotalForms(mockFormData.length);
        setTotalResponses(mockFormData.reduce((sum, form) => sum + form.responses, 0));
    }, [mockFormData]);


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