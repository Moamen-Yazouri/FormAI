import { IDashboardForm, IForm, IFormData, IFormFromDB, IFormResponse, IUserForm } from "@/@types";
import formsRepo from "../repositories/forms.repo";
import { getDateOnly } from "@/lib/dateUtils";
import { generateValidationScehma } from "@/lib/createTheValidationSchema";
import * as yup from "yup";
class FormServices {
    async getAllowedForms(userId: string): Promise<IUserForm[] | []> {
        try {
            const forms = await formsRepo.getAllowedForms(userId);
            if(!forms){
                console.error("No forms found");
                return []
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
            console.error(err);
            return []
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
        const schema = generateValidationScehma(formData.fields);
        const isValid = await schema.validate(formData, {abortEarly: false});
        if(!isValid) {
            throw new Error("Invalid form data"); 
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
}
export default new FormServices();