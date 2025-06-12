import { IForm, IFormFromDB } from "@/@types";
import formsRepo from "../repositories/forms.repo";
import userRepo from "../repositories/user.repo";

class FormServices {
    async getFormById(formId: string): Promise<IFormFromDB | null> {
            const form = await formsRepo.getFormById(formId);
            if(!form) {
                throw new Error("Form not found");
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

    async deleteForm (formId: string) {
        const form = await formsRepo.getFormById(formId);
        if(!form) {
            throw new Error("Form not found");
        }

        const deletedForm = await formsRepo.deleteForm(formId);
        return deletedForm;
    }
    deleteUserForms  = async (userId: string) => {
        const forms = await formsRepo.getCreatorForm(userId);
        if(forms.length > 0) {
            const deletedForms = await formsRepo.deleteUserForms(userId);
            if(!deletedForms) {
                throw new Error("Error deleting user forms");
            }
        }
        return forms;
    }

    async ensureFormCreator (formId: string, creatorName: string): Promise<Boolean> {
        const form = await formsRepo.getFormById(formId);
        const creator = await userRepo.getUserByName(creatorName);
        console.log(creator?._id);
        console.log(String(form?.creatorId ));
        if(!creator) {
            throw new Error("Creator not found");
        }
        
        if(!form) {
            throw new Error("Form not found");
        }
        
        if(String(form.creatorId) !== String(creator._id)) {
            return false;
        }
        return true;
    }
}
export default new FormServices();