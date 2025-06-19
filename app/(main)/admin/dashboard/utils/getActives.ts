import { IActiveUsers, IUserData } from "@/@types"
import { getAvatar } from "./getAvatar"

export const getActives = (data: IUserData[]) => {
    const activeUsers: IActiveUsers[] = data.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: getAvatar(user.name),
            lastActive: user.lastActive,
            status: user.status,
            forms: user.forms,
        }
    })
    return data.length > 5 ? activeUsers.slice(0, 5) : activeUsers;
}