import { IDashboardForm, IForm, IFormData, IFormFromDB, IFormResponse, IUserForm } from "@/@types";
import formsRepo from "../repositories/forms.repo";
import { getDateOnly } from "@/lib/dateUtils";
import { generateValidationScehma } from "@/lib/createTheValidationSchema";

import userRepo from "../repositories/user.repo";
class FormServices {
    async getAllowedForms(username: string): Promise<IUserForm[] | []> {
        try {
            const user = await userRepo.getUserByName(username);
            if(!user) {
                throw new Error("User not found");
            }
            const forms = await formsRepo.getAllowedForms(username);
            if(!forms){
                return []; 
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
        catch(err) {
            if(err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("Something went wrong");
        }
    }

    async getFormById(formId: string): Promise<IFormFromDB | null> {
            const form = await formsRepo.getFormById(formId);
            if(!form) {
                console.error("No form found");
                return null;
            };
            return form;
        }

    async addNewForm (formData: IForm) {
        if(!formData) {
            throw new Error("No form data provided");
        }
        const newForm: IFormFromDB = await formsRepo.addForm(formData);
        return newForm;
    }

    async addResponse (response: IFormResponse) {
        const form = await formsRepo.getFormById(response.formId);
        if(!form) {
            throw new Error("No form found");
        }
        const isValid = generateValidationScehma(form.fields).validate(response, {abortEarly: true});
        if(!isValid) {
            throw new Error("Invalid response");
        }
        return await formsRepo.addResponse(response);
    }

    async getAnswerdForms (username: string) {
        const user = await userRepo.getUserByName(username);
        if(!user) {
            throw new Error("User not found");
        }
        const forms = await formsRepo.getAnswerdForms(user._id);
        if(!forms) {
            return [];
        }
        return forms;
    }

}
export default new FormServices();