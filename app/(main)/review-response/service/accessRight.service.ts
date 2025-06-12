"server-only";
import { connection } from "@/DB/connection";
import { getToken } from "@/lib/getToken";
import formsService from "@/module/services/forms.service";
import responseService from "@/module/services/response.service";

export const getAccessRight = async (resId: string) => {
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
            const res = await responseService.getResponseById(resId);
            if(!res) return "notFound";

            const form = await formsService.getFormById(String(res.formId));
            if(!form) return "notFound";

            if(
                String(form.creatorId)  === token.userId
                || String(res.userId) === token.userId
            ) return "allowed";
            return "forbidden";
        }
        catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message); 
            }
            throw new Error("Something went wrong!");
        }
    }
}