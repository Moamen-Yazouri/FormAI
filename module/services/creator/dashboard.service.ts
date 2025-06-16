import { 
    IFormFromDB, 
    IResponsePopulatedCreator 
} from "@/@types";
import { 
    ICreatorActivityData,  
    ICreatorResponses, 
    IFormCreationData, 
    IFormResponseData 
} from "@/app/(main)/creator/[name]/dashboard/types";
import { connection } from "@/DB/connection";
import { getDataPerDate } from "@/lib/getDataPerDate";
import formsRepo from "@/module/repositories/forms.repo";
import responseRepo from "@/module/repositories/response.repo";
import userRepo from "@/module/repositories/user.repo";
import { formatCreatorForms, formatCreatorResponses } from "./utils";

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
                const resCount = (form.answeredBy?.length || 0) + (form?.anonymousNumber || 0);
                return {
                    formId: String(form._id),
                    formTitle: form.title,
                    responsesCount: resCount, 
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

        if(!creator) throw new Error("Invalid creator name!");

        const forms: IFormFromDB[]  = await formsRepo.getCreatorForm(creator._id);

        if(forms.length > 0) {
            return formatCreatorForms(forms, name);
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

        if(responses.length === 0) {
            throw new Error("No responses found!")
        }
        const sortedResponses: ICreatorResponses[] = formatCreatorResponses(responses)
        return sortedResponses;
    }
}

export default new DashboardService();