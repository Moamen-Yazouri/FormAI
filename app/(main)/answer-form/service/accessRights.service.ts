    "server-only";
import { AccessRightsType } from "@/@types/access";
    import { connection } from "@/DB/connection";
    import { getToken } from "@/lib/getToken"
    import formsService from "@/module/services/forms.service";


    export const  getAccessRights = async (formId: string): Promise<AccessRightsType> => {
        const token = await getToken();
        if(!token) {
            return "unauthorized";
        }
        if(token.role === "admin") {
            return "allowed";
        }
        else {
            await connection();
            try {
                const form = await formsService.getFormById(formId);
                if(!form) return "notFound";
                const allowed = form.allowedUsers?.map(userId => String(userId)) || [];
                if(form.isPublic || allowed.includes(token.userId)) return "allowed";
                return "unauthorized";
            }
            catch(e) {
                return "notFound";
            }
        }
    }