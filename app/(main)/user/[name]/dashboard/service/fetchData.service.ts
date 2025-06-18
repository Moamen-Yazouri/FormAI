import { connection } from "@/DB/connection";
import { toast } from "sonner";
import { IAnsweredForms } from "../types";
import dashboardService from "@/module/services/user/dashboard.service";
import { IFormTable, IUserResponseDetails } from "@/@types";

class FetchDataService {
    async availableForms(username: string): Promise<IFormTable[]> {
        await connection();
        try {
            const forms = await dashboardService.getUserForms(username);
            if(forms.length === 0) {
                toast.warning("No forms available!");
            }
            return forms.slice(0, 5);
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
            const responses = await dashboardService.getUserResponses(username);
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

    async getUserResponseDetails(username: string) {
        await connection();
        try {
            const responsesDetails: IUserResponseDetails[] = await dashboardService.getUserResponsesDetails(username);
            if(responsesDetails.length == 0) {
                return [];
            }
            return responsesDetails
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