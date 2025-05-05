import { IFormFromDB, IResponseFromDB } from "@/@types";
import { ICreatorActivityData, ICreatorFormData, IFormCreationData, IFormResponseData } from "@/app/(main)/creator/dashboard/types";
import { getDateOnly } from "@/lib/dateUtils";
import { getDataPerDate } from "@/lib/getDataPerDate";
import dashboardRepo from "@/module/repositories/creator/dashboard.repo";
import responseRepo from "@/module/repositories/response.repo";

class DashboardService {
    async formCreationData (name: string) {
        const forms  = await dashboardRepo.getFormCreationData(name);
        if(forms) {
            const formsPerDate: {[key: string]: number} = getDataPerDate(forms);
            const formCreationData: IFormCreationData[] = Object.keys(formsPerDate).map((date) => {
                return {
                    date,
                    count: formsPerDate[date]
                }
            })

            return formCreationData;
        }
        else {
            throw new Error("User not found!")
        }
    }

    async getFormResponseData (name: string) {
        const forms = await dashboardRepo.getFormCreationData(name);
        if(forms) {
            const formResponseData: IFormResponseData[] = forms.map((form) => {
                return {
                    formId: String(form._id),
                    formTitle: form.title,
                    responsesCount: form.answeredBy?.length || 0,
                }
            })

            return formResponseData;
        }
        else {
            throw new Error("User not found!");
        }
    }

    async getCreatorActivityData (name: string) {
        const forms: IFormFromDB[]  = await dashboardRepo.getFormCreationData(name);
        if(forms.length > 0) {
            const responses: IResponseFromDB[] = await responseRepo.getCreatorResponses(name);
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
        return [];
    }

    async getCreatorForms(name: string) {
        const forms = await dashboardRepo.getFormCreationData(name);
        if(forms.length > 0) {
            const formsData: ICreatorFormData[] = forms.map((form) => {
                return {
                    id: String(form._id),
                    title: form.title,
                    createdAt: getDateOnly(form.createdAt),
                    responsesCount: form.answeredBy?.length || 0,
                }
            })
            return formsData;
        }
        return [];
    }
}

export default new DashboardService();