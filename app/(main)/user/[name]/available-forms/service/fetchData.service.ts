import { IUserForm, IUserResponseDetails } from "@/@types";
import { connection } from "@/DB/connection";
import dashboardService from "@/module/services/user/dashboard.service";
import { toast } from "sonner";

class FetchDataService {
        async getAvailableForms(username: string) {
        await connection();
        try {
            const forms: IUserForm[] = await dashboardService.getUserForms(username);
            if(forms.length == 0) {
                toast.warning("There is no forms available!");
                return [];
            }
            return forms
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