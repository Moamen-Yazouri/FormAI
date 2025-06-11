"seerver-only";
import { AccessRightsType } from "@/@types/access";
import { connection } from "@/DB/connection";
import { getToken } from "@/lib/getToken"
import formsService from "@/module/services/forms.service";

export const  getAccessRights = async (formId: string): Promise<AccessRightsType> => {
    const token = await getToken();
    if(!token) {
        return "unauthorized";
    }
    try {
        await connection();
        const form = await formsService.getFormById(formId);
        if(!form) {
            return "notFound";
        }
        if( String(form.creatorId) !== token.userId) return "forbidden";
        return "allowed";
    }
    catch (error) {
        if(error instanceof Error) {
            throw new Error(error.message);
            ;
        }
        throw new Error("Something went wrong!");
    }
}