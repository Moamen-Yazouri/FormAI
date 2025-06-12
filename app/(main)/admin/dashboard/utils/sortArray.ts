import { IUserData } from "@/@types"

export const getActivesFirst = (users: IUserData[]) => {
    const usersData = users.sort((a,b) => {
        if (a.status === "active" && b.status !== "active") {
            return -1
        }
        if(a.status !== "active" && b.status === "active") {
            return 1
        }
        return 0
    }).slice(0, 5);
    return usersData;
}