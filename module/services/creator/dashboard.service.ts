import { IFormResponseData } from "@/app/(main)/creator/dashboard/types";
import { getDateOnly } from "@/lib/dateUtils";
import dashboardRepo from "@/module/repositories/creator/dashboard.repo";

class DashboardService {
    async formCreationData (id: string) {
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

    async getFormResponseData (id: string) {
        const forms = await dashboardRepo.getFormCreationData(id);

        const formResponseData: IFormResponseData[] = forms.map((form) => {
            return {
                formId: String(form._id),
                formTitle: form.title,
                responsesCount: form.answeredBy?.length || 0,
            }
        })

        return formResponseData;
    }
}

export default new DashboardService();