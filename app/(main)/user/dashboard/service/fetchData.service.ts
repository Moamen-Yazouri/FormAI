import { connection } from "@/DB/connection";
import userService from "@/module/services/user.service";
import { toast } from "sonner";
import { IAnsweredForms, IAvailableForms } from "../types";

class FetchDataService {
    async availableForms(username: string): Promise<IAvailableForms[]> {
        await connection();
        try {
            const forms = await userService.getUserForms(username);
            if(forms.length === 0) {
                toast.warning("No forms available!");
            }
            const availableForms: IAvailableForms[] = forms.map(form => {
                return {
                    id: form.id,
                    title: form.name,
                    description: form.description,
                    deadline: form.deadline ? form.deadline : undefined,
                    creator: form.creator
                }
            })
            return availableForms;
        }
        catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
                return [];
            }
            console.error("Something went wrong!");
            return [];
        }
    }

    async answeredForms(username: string): Promise<IAnsweredForms[]> {
        await connection();
        try {
            const responses = await userService.getUserResponses(username);
            if(responses.length === 0) {
                toast.warning("No forms answered!");
            }
            return responses;
        }
        catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
                return [];
            }
            console.error("Something went wrong!");
            return [];
        }
        
    }
}

export default new FetchDataService();