import { IDashboardForm, IForm, IFormData, IFormFromDB, IFormPopulatedByCreator, IFormResponse, IUserForm, IUserFromDB } from "@/@types";
import formsRepo from "../repositories/forms.repo";
import { getDateOnly } from "@/lib/dateUtils";
import { generateValidationScehma } from "@/lib/createTheValidationSchema";

import userRepo from "../repositories/user.repo";
class FormServices {
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