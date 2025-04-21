import { IUserFromDB, IUserData, IFormPopulatedByCreator, IFormData, IDashboardForm } from "@/@types";
import { getActiveStatus } from "@/lib/getDateFromISO";
import dashboardRepo from "../repositories/dashboard.repo";

class DashboardService {
    async getUsersData() {
        const users: IUserFromDB[] = await dashboardRepo.getAllUsers();
        const formsCount = async (userId: string) => {
            const forms = await dashboardRepo.getUserForms(userId);
            return forms.length;
        }
        const usersData: IUserData[] = await Promise.all(
            users.map(async (user) => {
                return {
                    id: String(user._id),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: getActiveStatus(user.updatedAt),
                    forms: await formsCount(String(user._id)),
                    lastActive: user.updatedAt,
                }
            })
        )
        return usersData;
    }

    async getFormsData() {
        const populatedForms: IFormPopulatedByCreator[] = await dashboardRepo.getAllFormsWithCreators();
        console.log(populatedForms);
        const formsData: IDashboardForm[] = populatedForms.map(form => {
            return {
                id: String(form._id),
                name: form.title,
                creator: form.creatorId.name,
                responses: form.answeredBy?.length || 0,
                createdAt: form.createdAt
            }
        })
        return formsData;
    }
}
export default new DashboardService();