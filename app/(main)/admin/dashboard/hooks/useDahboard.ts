"use client"
import { IFormTable, IUserData } from "@/@types";
import { useMemo, useState } from "react";
import { generateStateCards } from "../utils/generateStateCards";
import { getActivesFirst } from "../utils/sortArray";
import { getSortedForms } from "../utils/sortByResponse";

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
    
    const slicedUsers = useMemo(() => getActivesFirst(usersData), [usersData]);

    const slicedForms = useMemo(() => getSortedForms(formsData), [formsData]);

    const stateCardsData = useMemo(() => generateStateCards(
            totalUsers,
            activeUsers,
            totalForms,
            totalResponses
        )
    , [totalUsers, activeUsers, usersData, formsData]);

    useMemo(() => {
        setTotalUsers(usersData.length);
        setActiveUsers(usersData.filter(user => user.status === "active").length); 
    }, [usersData]);

    useMemo(() => {
        setTotalForms(formsData.length);
        setTotalResponses(formsData.reduce((sum, form) => sum + form.responses, 0));
    }, [formsData]);


    return {
        slicedForms,
        slicedUsers,
        stateCardsData,
    }
}
export default useDashboard;