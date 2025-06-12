import { connection } from "@/DB/connection";
import dashboardService from "@/module/services/creator/dashboard.service";
import { ICreatorResponses, IFormCreationData } from "../types";
import { IFormTable } from "@/@types";

class FetchServices {
    async formCreationData(name: string) {
        await connection();
        try {
            const formCreationData: IFormCreationData[]  = await dashboardService.formCreationData(name);
            if (!formCreationData || formCreationData.length === 0) {
            console.warn(`No form creation data found for "${name}".`);
            return [];
            }

            return formCreationData;
        }
        catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
                return[];
            }
            console.error("Failed to fetch form creation data!");
            return [];
        }
    }

    async formResponseData(name: string) {
        await connection();
        try {
            const formResponseData = await dashboardService.getFormResponseData(name);
            if (!formResponseData || formResponseData.length === 0) {
            console.warn(`No form response data found for "${name}".`);
            return [];
            }

            return formResponseData;
        }
        catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
                return[];
            }
            console.error("Failed to fetch form creation data!");
            return [];
        } 
    }

    async creatorActivityData(name: string) {
        await connection();
        try {
            const creatorActivityData = await dashboardService.getCreatorActivityData(name);
            if (!creatorActivityData || creatorActivityData.length === 0) {
            console.warn(`No creator activity data found for "${name}".`);
            return [];
            }

            return creatorActivityData;
        }
        catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
                return[];
            }
            console.error("Failed to fetch creator activity data!");
            return [];
        } 
    }
    async formsData(name: string) {
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
    async creatorResponses(name: string) {
        await connection();
        try {
            const responses: ICreatorResponses[] = await dashboardService.getCreatorResponses(name);
            if (!responses || responses.length === 0) {
                console.warn(`No responses found for "${name}".`);
                return []; 
            }
            return responses;
        }
        catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
                return[];
            }
            console.error("Failed to fetch creator responses!");
            return [];
        }
    }
}
export default new FetchServices();