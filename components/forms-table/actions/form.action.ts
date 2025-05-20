import { connection } from "@/DB/connection";
import formsService from "@/module/services/forms.service";

class FormActions {
    async deleteForm(formId: string) {
        await connection();
        try {
            const deletedForm = await formsService.deleteForm(formId);
            return deletedForm;
        }   
        catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
            }
            console.error("Failed to Delete the form!");
            return null;
        }
    }
}

export default new FormActions();