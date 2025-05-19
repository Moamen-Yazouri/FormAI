import { connection } from "@/DB/connection";
import { toast } from "sonner";
import { IAnsweredForms, IAvailableForms } from "../types";
import dashboardService from "@/module/services/user/dashboard.service";
import { IUserForm, IUserResponseDetails } from "@/@types";

class FetchDataService {
    async availableForms(username: string): Promise<IUserForm[]> {
        await connection();
        try {
            const forms = await dashboardService.getUserForms(username);
            if(forms.length === 0) {
                toast.warning("No forms available!");
            }
            return forms;
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
                toast.warning("You do not have answered any forms");
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