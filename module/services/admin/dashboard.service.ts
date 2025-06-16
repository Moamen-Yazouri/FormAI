import { 
    IUserFromDB, 
    IUserData, 
    IFormPopulatedByCreator, 
    IUsersActivityData, 
    IFormFromDB, 
    IFormCreationData, 
    IFormTable 
} from "@/@types";
import { 
    getActiveStatus, 
    getDateOnly, 
    getMonthName, 
    getWeekDaysDates 
} from "@/lib/dateUtils";
import dashboardRepo from "../../repositories/admin/dashboard.repo";
import { months } from "@/constants/dateConstants";
import { creatorFormsFormatter, userDataFormatter } from "./utils";

class DashboardService {
    async getUsersData() {
        const users: IUserFromDB[] = await dashboardRepo.getAllUsers();
        const formsCount = async (userId: string) => {
            const forms = await dashboardRepo.getUserForms(userId) || [];
            return forms.length;
        }
        const usersData: IUserData[] = await Promise.all(userDataFormatter(users, formsCount));
        return usersData;
    }

    async getCreatorForms(username: string) {
        try {
            const user: IUserFromDB | null = await dashboardRepo.getUserByName(username);
            if (user) {
                const forms: IFormFromDB[] = await dashboardRepo.getUserForms(user._id);
                const formsData: IFormTable[] = creatorFormsFormatter(forms, username)
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