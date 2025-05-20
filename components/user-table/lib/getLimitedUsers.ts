import { IUserData } from "@/@types";

export const getLimitedUsers = (users: IUserData[]) => {
    return users.sort((a, b)  => {  
                if(a.status === "active" && b.status === "inactive") {
                    return -1;
                }
                if(a.status === "inactive" && b.status === "active") {
                    return 1;
                }
                return 0;
            })
            .slice(0, 5);
}