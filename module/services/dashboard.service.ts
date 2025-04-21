import { IUserFromDB, IUsersData } from "@/@types";
import { getActiveStatus } from "@/lib/getDateFromISO";
import dashboardRepo from "../repositories/dashboard.repo";

class DashboardService {
    async getUsersData() {
        const users: IUserFromDB[] = await dashboardRepo.getAllUsers();
        const formsCount = async (userId: string) => {
            const forms = await dashboardRepo.getUserForms(userId);
            return forms.length;
        }
        const usersData: IUsersData[] = await Promise.all(
            users.map(async (user) => {
                return {
                    id: String(user._id),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: getActiveStatus(user.updatedAt),
                    forms: await formsCount(user._id),
                    lastActive: user.updatedAt,
                }
            })
        )
        return usersData;
    }
}
export default new DashboardService();