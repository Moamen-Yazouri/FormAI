"server-only"
import { IContextUser } from "@/@types";
import formsService from "@/module/services/forms.service";
import { notFound, unauthorized } from "next/navigation";

export const getForm = async(id: string, user: IContextUser) => {
    // await connection();
    try {
        const form = await formsService.getFormById(id);
        if(user._id !== id && user.role !== "admin") {
            unauthorized();
        }
        return form;
    }
    catch(err) {
        if(err instanceof Error && err.message === "Form not found") {
            notFound();
        }
        return null;
    }
}