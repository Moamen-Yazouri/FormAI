import { getDateOnly } from "@/lib/dateUtils";
import dashboardRepo from "@/module/repositories/creator/dashboard.repo";

class DashboardService {
    async getCreatorForms (id: string) {
        const forms  = await dashboardRepo.getFormCreationData(id);

        const formsPerDate: {[key: string]: number} = {};

        forms.map((form) => {
            const date = getDateOnly(form.createdAt);
            formsPerDate[date] = (formsPerDate[date] || 0) + 1;
        })

        const formCreationData = Object.keys(formsPerDate).map((date) => {
            return {
                date,
                value: formsPerDate[date]
            }
        })

        return formCreationData;
    }
}

export default new DashboardService();