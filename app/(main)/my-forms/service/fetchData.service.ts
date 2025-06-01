import { IFormTable } from "@/@types";
import { connection } from "@/DB/connection";
import dashboardService from "@/module/services/creator/dashboard.service";

export const getCreatorForms = async (name: string) => {
        await connection();
        try {
            const formsData: IFormTable[] = await dashboardService.getCreatorForms(name);
            if (!formsData || formsData.length === 0) {
            console.warn(`No forms found for "${name}".`);
            return [];
            }

            return formsData;
        }
        catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
                return[];
            }
            console.error("Failed to fetch creator forms data!");
            return [];
        }
    }