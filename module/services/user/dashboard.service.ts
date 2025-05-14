import { IUserForm, IUserFromDB, IFormPopulatedByCreator, IUserResponseTable, IResponsePopulatedUser, IUserResponseDetails } from "@/@types";
import { getDateOnly } from "@/lib/dateUtils";

import { IAnsweredForms } from "@/app/(main)/user/dashboard/types";
import userRepo from "@/module/repositories/user.repo";
import formsRepo from "@/module/repositories/forms.repo";
import { connection } from "@/DB/connection";
import responseRepo from "@/module/repositories/response.repo";


class DashboardService {
        async getUserForms(username: string): Promise<IUserForm[] | []> {
            const user = await userRepo.getUserByName(username);
            if(!user) {
                throw new Error("User not found");
            }
            const forms = await formsRepo.getAllowedForms(user._id);
            if(forms.length == 0){
                throw new Error("No forms found!"); 
            } ;
            const allowedForms: IUserForm[] = forms.map(form => {
                    return {
                        id: String(form._id),
                        formTitle: form.title,
                        description: form.description,
                        creator: form.creatorId.name,
                        deadline: form.expiredAt ? getDateOnly(form.expiredAt) : "No deadline",
                    }
                })
            return allowedForms;
        }

    async getUserResponsesDetails(name: string) {
            await connection()
            const user: IUserFromDB | null = await userRepo.getUserByName(name);
            if(!user) {
                throw new Error("User not found");
            }
            const responses = await responseRepo.getUserResponseDetails(user._id);
            if(responses.length == 0) {
                return [];
            }
            const userResponsesDetails: IUserResponseDetails[] = responses.map((res) => {
                return {
                    id: res._id,
                    formId: res.formId._id,
                    title: res.formId.title,
                    description: res.formId.description,
                    creator: res.formId.creatorId.name,
                    createdAt: getDateOnly(res.formId.createdAt),
                    completedAt: getDateOnly(res.createdAt),
                }
            })
            return userResponsesDetails;
        }

    async getUserResponses(name: string) {
        await connection();
        const user: IUserFromDB | null = await userRepo.getUserByName(name);
        if(!user) throw new Error("User not found!");
        const responses: IResponsePopulatedUser[] = await responseRepo.getUserResponses(user._id);
        if(responses.length == 0) {
            return [];
        }
        const userResponses: IAnsweredForms[] = responses.map((res) => {
            return {
                id: res._id,
                title: res.formId.title,
                date: res.createdAt,
            }
        })
        return userResponses;

    }
}

export default new DashboardService();