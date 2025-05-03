import { IUserFromDB, IUserData, IFormPopulatedByCreator, IFormData, IDashboardForm, IUsersActivityData, IFormFromDB, IFormCreationData } from "@/@types";
import { getActiveStatus, getDateOnly, getMonthName, getWeekDaysDates } from "@/lib/dateUtils";
import dashboardRepo from "../../repositories/admin/dashboard.repo";
import { months } from "@/constants/dateConstants";

class DashboardService {
    async getUsersData() {
        const users: IUserFromDB[] = await dashboardRepo.getAllUsers();
        const formsCount = async (userId: string) => {
            const forms = await dashboardRepo.getUserForms(userId) || [];
            return forms.length;
        }
        const usersData: IUserData[] = await Promise.all(
            users.map(async (user) => {
                return {
                    id: String(user._id),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: getActiveStatus(user.updatedAt, new Date().toISOString()),
                    forms: await formsCount(String(user._id)),
                    lastActive: getDateOnly(user.updatedAt),
                }
            })
        )
        return usersData;
    }

    async getUserForms(username: string) {
        try {
            const user: IUserFromDB | null = await dashboardRepo.getUserByName(username);
            if (user) {
                const forms: IFormFromDB[] = await dashboardRepo.getUserForms(user._id);
                const formsData: IDashboardForm[] = forms.map(form => {
                    return {
                        id: String(form._id),
                        name: form.title,
                        creator: user.name,
                        responses: form.answeredBy?.length || 0,
                        createdAt: getDateOnly(form.createdAt),
                    }
                })
                return formsData;
            }
            console.error("User not found!");
            return [];
        } catch (err) {
            console.error("Faild to fetch user forms!");
            return [];
        }

    }

    async getFormsData() {
        const populatedForms: IFormPopulatedByCreator[] = await dashboardRepo.getAllFormsWithCreators();

        const formsData: IDashboardForm[] = populatedForms.map(form => {
            return {
                id: String(form._id),
                name: form.title,
                creator: form.creatorId.name,
                responses: form.answeredBy?.length || 0,
                createdAt: getDateOnly(form.createdAt),
            }
        })
        return formsData;
    }

    async getUsersActivityData() {
        const users: IUserFromDB[] = await dashboardRepo.getAllUsers();
        const dates = getWeekDaysDates();
        const userActivityData: IUsersActivityData[] = dates.map((date) => {
            return {
                name: date.day,
                active: users.filter(user => (getActiveStatus(user.updatedAt, date.date) === "active")).length || 0,
                new: users.filter(user => getDateOnly(user.createdAt) === getDateOnly(date.date)).length || 0,
            }
        })
        return userActivityData;
    }

    async getFormsCreationData() {
        const forms: IFormFromDB[] = await dashboardRepo.getAllForms();
        const formCreationData: IFormCreationData[] = months.map((month) => {
            return {
                name: month,
                forms: forms.filter(form => getMonthName(form.createdAt) === month).length || 0,
            }
        })
        return formCreationData;
    }

    async getResponsesData() {
        const fomrs: IFormFromDB[] = await dashboardRepo.getAllForms();
        const formResponseData = fomrs.map(form => {
            return {
                name: form.title,
                value: form.answeredBy?.length || 0,
            }
        })
        return formResponseData;
    }

    async deleteUser(userId: string) {
        const deletedUser: IUserFromDB | null = await dashboardRepo.deleteUser(userId);
        return deletedUser;
    }

    async deleteForm(formId: string) {
        const deletedForm: IFormFromDB | null = await dashboardRepo.deleteForm(formId);
        return deletedForm;
    }
}
export default new DashboardService();