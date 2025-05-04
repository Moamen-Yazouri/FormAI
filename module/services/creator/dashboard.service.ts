import { IFormFromDB, IResponseFromDB } from "@/@types";
import { ICreatorActivityData, IFormResponseData } from "@/app/(main)/creator/dashboard/types";
import { getDateOnly } from "@/lib/dateUtils";
import { getDataPerDate } from "@/lib/getDataPerDate";
import dashboardRepo from "@/module/repositories/creator/dashboard.repo";
import responseRepo from "@/module/repositories/response.repo";

class DashboardService {
    async formCreationData (id: string) {
        const forms  = await dashboardRepo.getFormCreationData(id);

        const formsPerDate: {[key: string]: number} = getDataPerDate(forms);

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

    async getCreatorActivityData (id: string) {
        const forms: IFormFromDB[] = await dashboardRepo.getFormCreationData(id);
        const responses: IResponseFromDB[] = await responseRepo.getCreatorResponses(id);
        const formsPerDate: {[key: string]: number} = getDataPerDate(forms);

        const responsesPerDate: {[key: string]: number} = getDataPerDate(responses);

        const creatorActivityData: ICreatorActivityData[] = Object.keys(formsPerDate).map((date) => {
            return {
                date,
                formsCreated: formsPerDate[date],
                responsesReceived: responsesPerDate[date] || 0,
            }
        });

        return creatorActivityData;
    }
}

export default new DashboardService();