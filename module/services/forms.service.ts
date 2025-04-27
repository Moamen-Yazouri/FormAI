import { IDashboardForm, IFormFromDB, IUserForm } from "@/@types";
import formsRepo from "../repositories/forms.repo";
import { getDateOnly } from "@/lib/dateUtils";

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
        try {
            const form = await formsRepo.getFormById(formId);
            if(!form) {
                console.error("No form found");
                return null;
            };
            return form;
        }
        catch(err) {
            console.error(err);
            return null;
        }
        
    }
}