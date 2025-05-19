import { IFormFromDB, IFormTable, IResponseFromDB, IResponsePopulatedCreator } from "@/@types";
import { ICreatorActivityData, ICreatorFormData, ICreatorResponses, IFormCreationData, IFormResponseData } from "@/app/(main)/creator/[name]/dashboard/types";
import { connection } from "@/DB/connection";
import { getDateOnly } from "@/lib/dateUtils";
import { getDataPerDate } from "@/lib/getDataPerDate";
import dashboardRepo from "@/module/repositories/creator/dashboard.repo";
import formsRepo from "@/module/repositories/forms.repo";
import responseRepo from "@/module/repositories/response.repo";
import userRepo from "@/module/repositories/user.repo";

class DashboardService {
    async formCreationData (name: string) {
        await connection();
        const creator = await userRepo.getUserByName(name);
        if(!creator) {
            throw new Error("Invalid creator name!");
        }
        const forms  = await formsRepo.getCreatorForm(creator._id);
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
        await connection();
        const creator = await userRepo.getUserByName(name);
        if(!creator) {
            throw new Error("Invalid creator name!");
        }
        const forms = await formsRepo.getCreatorForm(String(creator._id));
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
        await connection()
        const creator = await userRepo.getUserByName(name);

        if(!creator) throw new Error("Invalid creator name!");

        const forms: IFormFromDB[]  = await formsRepo.getCreatorForm(creator._id);

        if(forms.length === 0) {
            throw new Error("No forms found!");
        }

        if(creator === null) {
            throw new Error("Creator not found!");
        }
        const responses: IResponsePopulatedCreator[] | null = await responseRepo.getCreatorResponses(creator);
        if(!responses) {
            throw new Error("Creator not found!")
        };

            const formsPerDate: {[key: string]: number} = getDataPerDate(forms);

            const responsesPerDate: {[key: string]: number} = getDataPerDate(responses);

            const creatorActivityData: ICreatorActivityData[] = Object.keys(formsPerDate).map((date) => {
                return {
                    date,
                    formsCreated: formsPerDate[date] || 0,
                    responsesReceived: responsesPerDate[date] || 0,
                }
            });

            return creatorActivityData;
        
    }

    async getCreatorForms(name: string) {
        await connection()
        const creator = await userRepo.getUserByName(name);
    //         id: string,
    // name: string,
    // creator: string,
    // responses: number,
    // createdAt: Date | string,
        if(!creator) throw new Error("Invalid creator name!");

        const forms: IFormFromDB[]  = await formsRepo.getCreatorForm(creator._id);

        if(forms.length > 0) {
            const formsData: IFormTable[] = forms.map((form) => {
                return {
                    id: String(form._id),
                    name: form.title,
                    creator: creator.name,
                    createdAt: getDateOnly(form.createdAt),
                    responses: form.answeredBy?.length || 0,
                }
            })
            return formsData;
        }
        throw new Error("No forms yet!");
    }

    async getCreatorResponses(name: string) {
        await connection();
        const creator = await userRepo.getUserByName(name);
        if(!creator) {
            throw new Error("No user found!");
        }

        const responses: IResponsePopulatedCreator[] | null = await responseRepo.getCreatorResponses(creator);
        if(!responses) {
            throw new Error("No user found!");
        }

        if(responses?.length === 0) {
            throw new Error("No response found!")
        }

        const filteredResponses: ICreatorResponses[] = responses.filter(
            response => response.formId !== null
        )
        .map(
            res => ({
                id: String(res._id),
                formTitle: res.formId.title, 
                respondentName: res.userId.name,
                respondentEmail: res.userId.email,
                date: getDateOnly(res.createdAt)
            })
        );
        const sortedResponses = filteredResponses.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        })
        return sortedResponses;
    }
}

export default new DashboardService();