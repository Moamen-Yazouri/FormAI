interface IStateCard {
    stateTitle: string,
    stateValue: number,
    statePercentage: number,
}
export const generateStateCards = (
    totalUsers: number,
    activeUsers: number,
    totalForms: number,
    totalResponses: number
): IStateCard[] => {
    return [
        {
            stateTitle: "Total Users",
            stateValue: totalUsers,
            statePercentage: 10,
        },
        {
            stateTitle: "Active Users",
            stateValue: activeUsers,
            statePercentage: 10,
        },
        {
            stateTitle: "Total Forms",
            stateValue: totalForms,
            statePercentage: 15,
        },
        {
            stateTitle: "Form Responses",
            stateValue: totalResponses,
            statePercentage: 3,
        },
    ]

}