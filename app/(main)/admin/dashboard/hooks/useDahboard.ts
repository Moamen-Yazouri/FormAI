import { IFormTable, IUserData } from "@/@types"
import { useCallback, useMemo, useState } from "react"

interface IProps {
    usersData: IUserData[],
    formsData: IFormTable[],
}
const useDashboard = (props: IProps) => {
    const { usersData, formsData } = props
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [totalForms, setTotalForms] = useState(0);
    const [totalResponses, setTotalResponses] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
        

    useMemo(() => {
        setTotalUsers(usersData.length);
        setActiveUsers(usersData.filter(user => user.status === "active").length); 
    }, [usersData]);

    useMemo(() => {
        setTotalForms(formsData.length);
        setTotalResponses(formsData.reduce((sum, form) => sum + form.responses, 0));
    }, [formsData]);


    return {
        totalUsers,
        activeUsers,
        totalForms,
        totalResponses,
        isDialogOpen,
        setIsDialogOpen,
    }
}
export default useDashboard