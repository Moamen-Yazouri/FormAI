    "seerver-only";
    import { connection } from "@/DB/connection";
    import { getToken } from "@/lib/getToken"
    import formsService from "@/module/services/forms.service";
    enum AccessRights {
        "unauthorized",
        "allowed",
        "notFound"
    }
    type AccessRightsType = keyof typeof AccessRights;

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
            const form = await formsService.getFormById(formId);
            if(!form) return "notFound";
            const allowed = form.allowedUsers?.map(userId => String(userId)) || [];
            if(form.isPublic || allowed.includes(token.userId)) return "allowed";
            return "unauthorized";
        }
    }