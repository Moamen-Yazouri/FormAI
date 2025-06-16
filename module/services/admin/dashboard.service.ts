import { 
    IUserFromDB, 
    IUserData, 
    IFormPopulatedByCreator, 
    IUsersActivityData, 
    IFormFromDB, 
    IFormCreationData, 
    IFormTable 
} from "@/@types";
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
            users.sort((a, b) => {
                const aActive = getActiveStatus(a.lastActive);
                const bActive = getActiveStatus(b.lastActive);
                if(aActive === "active" && bActive === "inactive") return -1;
                if(aActive === "inactive" && bActive === "active") return 1;
                return 0;
            })
            .map(async (user) => {
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
        )
        return usersData;
    }

    async getCreatorForms(username: string) {
        try {
            const user: IUserFromDB | null = await dashboardRepo.getUserByName(username);
            if (user) {
                const forms: IFormFromDB[] = await dashboardRepo.getUserForms(user._id);
                const formsData: IFormTable[] = forms.map(form => {
                    const resNubmber = (form.anonymousNumber || 0) + (form.answeredBy?.length || 0)
                    return {
                        id: String(form._id),
                        name: form.title,
                        creator: user.name,
                        description: form.description,
                        responses: resNubmber,
                        createdAt: getDateOnly(form.createdAt),
                        deadline: form.expiredAt ? getDateOnly(form.expiredAt) : "No deadline",
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

        const formsData: IFormTable[] = populatedForms.map(form => {
            const resNubmber = (form.anonymousNumber || 0) + (form.answeredBy?.length || 0)
            return {
                id: String(form._id),
                name: form.title,
                description: form.description,
                creator: form.creatorId.name,
                responses: resNubmber,
                createdAt: getDateOnly(form.createdAt),
                deadline: form.expiredAt? getDateOnly(form.expiredAt) : "No deadline",
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
                active: users.filter(user => (getActiveStatus(user.lastActive) === "active")).length || 0,
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
}
export default new DashboardService();