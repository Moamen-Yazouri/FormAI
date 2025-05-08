import { IUserForm, IUserFromDB, IFormPopulatedByCreator, IUserResponseTable, IResponsePopulatedUser } from "@/@types";
import { getDateOnly } from "@/lib/dateUtils";
import formsRepo from "../repositories/forms.repo";
import userRepo from "../repositories/user.repo";
import { connection } from "@/DB/connection";
import responseRepo from "../repositories/response.repo";

class UserService {
        async getUserForms(username: string): Promise<IUserForm[] | []> {
            const user = await userRepo.getUserByName(username);
            if(!user) {
                throw new Error("User not found");
            }
            const forms = await formsRepo.getAllowedForms(username);
            if(!forms){
                throw new Error("No forms found!"); 
            } ;
            const allowedForms: IUserForm[] = forms.map(form => {
                    return {
                        id: String(form._id),
                        name: form.title,
                        creator: form.creatorId.name,
                        createdAt: getDateOnly(form.createdAt),
                    }
                })
            return allowedForms;
        }

    async getUserAnsweredForms(name: string) {
            await connection()
                const user: IUserFromDB = await userRepo.getUserByName(name);
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
                            creator: form.creatorId.name,
                            createdAt: getDateOnly(form.createdAt),
                        }
                    })
            return allowedForms;
        }

    async getUserResponses(name: string) {
        await connection();
            const responses: IResponsePopulatedUser[] = await responseRepo.getUserResponses(name);
            throw new Error("No responses found!")
            const userResponses: IUserResponseTable[] = responses.map((res) => {
                return {
                    id: res._id,
                    formTitle: res.formId.title,
                    date: res.createdAt,
                }
            })

    }
}