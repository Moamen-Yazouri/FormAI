"seerver-only";
import { connection } from "@/DB/connection";
import { getToken } from "@/lib/getToken"
import formsService from "@/module/services/forms.service";

export const  getAccessRights = async (formId: string) => {
    const token = await getToken();
    if(!token) {
        return false;
    }
    if(token.role === "admin") {
        return true;
    }
    else {
        await connection();
        const form = await formsService.getFormById(formId);
        if(!form || String(form.creatorId) !== token.userId) return false;
        return true;
    }
}