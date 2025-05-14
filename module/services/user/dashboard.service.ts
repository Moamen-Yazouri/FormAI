import { IUserForm, IUserFromDB, IFormPopulatedByCreator, IUserResponseTable, IResponsePopulatedUser } from "@/@types";
import { getDateOnly } from "@/lib/dateUtils";

import { IAnsweredForms } from "@/app/(main)/user/dashboard/types";
import userRepo from "@/module/repositories/user.repo";
import formsRepo from "@/module/repositories/forms.repo";
import { connection } from "@/DB/connection";
import responseRepo from "@/module/repositories/response.repo";

class UserService {
        async getUserForms(username: string): Promise<IUserForm[] | []> {
            const user = await userRepo.getUserByName(username);
            if(!user) {
                throw new Error("User not found");
            }
            const forms = await formsRepo.getAllowedForms(user._id);
            if(!forms){
                throw new Error("No forms found!"); 
            } ;
            const allowedForms: IUserForm[] = forms.map(form => {
                    return form.expiredAt ? {
                        id: String(form._id),
                        name: form.title,
                        description: form.description,
                        creator: form.creatorId.name,
                        deadline: getDateOnly(form.expiredAt),
                        createdAt: getDateOnly(form.createdAt),
                    }
                    : {
                        id: String(form._id),
                        name: form.title,
                        description: form.description,
                        creator: form.creatorId.name,
                        createdAt: getDateOnly(form.createdAt),
                        expiredAt: form.expiredAt,
                    }
                })
            return allowedForms;
        }

    async getUserAnsweredForms(name: string) {
            await connection()
                const user: IUserFromDB | null = await userRepo.getUserByName(name);
                if(!user) {
                    throw new Error("User not found");
                }
                const forms: IFormPopulatedByCreator[] = await formsRepo.getAnswerdForms(String(user._id));
                if(!forms){
                    throw new Error("No forms found!"); 
                } ;
                const allowedForms: IUserForm[] = forms.map(form => {
                        return {
                            id: String(form._id),
                            name: form.title,
                            description: form.description,
                            creator: form.creatorId.name,
                            createdAt: getDateOnly(form.createdAt),
                        }
                    })
            return allowedForms;
        }

    async getUserResponses(name: string) {
        await connection();
        const user: IUserFromDB | null = await userRepo.getUserByName(name);
        if(!user) throw new Error("User not found!");
        const responses: IResponsePopulatedUser[] = await responseRepo.getUserResponses(user._id);
        if(!responses) {
            throw new Error("No responses found!")
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

export default new UserService();