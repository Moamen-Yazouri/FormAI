import { IFormTable } from "@/@types";
import { connection } from "@/DB/connection";
import dashboardService from "@/module/services/user/dashboard.service";
import { toast } from "sonner";

class FetchDataService {
    async getAvailableForms(username: string) {
        await connection();
        try {
            const forms: IFormTable[] = await dashboardService.getUserForms(username);
            if(forms.length == 0) {
                toast.warning("There is no forms available!");
                return [];
            }
            return forms
        }
        catch {
            console.error("Failed to fetch available forms data!");
            return [];
        }
    }
}
export default new FetchDataService();