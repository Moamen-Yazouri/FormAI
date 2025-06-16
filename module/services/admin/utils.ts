import { IFormFromDB, IFormTable, IUserFromDB } from "@/@types";
import { getActiveStatus, getDateOnly } from "@/lib/dateUtils";

export const  userDataFormatter = (users: IUserFromDB[], formsCount: (userId: string) => Promise<number>) => {
    const sortedUsers = sortUsersData(users);
    return sortedUsers.map(async (user) => {
        return {
            id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
            status: getActiveStatus(user.lastActive),
            forms: await formsCount(String(user._id)),
            lastActive: getDateOnly(user.lastActive),
        }
    })
}

export const sortUsersData = (users: IUserFromDB[]) => {
    return users.sort((a, b) => {
        const aActive = getActiveStatus(a.lastActive);
        const bActive = getActiveStatus(b.lastActive);
        if(aActive === "active" && bActive === "inactive") return -1;
        if(aActive === "inactive" && bActive === "active") return 1;
        return 0;
    });
}

export const creatorFormsFormatter = (forms: IFormFromDB[], name: string) => {
    const formsData: IFormTable[] = forms.map(form => {
    const resNubmber = (form.anonymousNumber || 0) + (form.answeredBy?.length || 0)
        return {
            id: String(form._id),
            name: form.title,
            creator: name,
            description: form.description,
            responses: resNubmber,
            createdAt: getDateOnly(form.createdAt),
            deadline: form.expiredAt ? getDateOnly(form.expiredAt) : "No deadline",
        }
    });
    return formsData;
}