import { IDisplayResponse } from "@/@types";
import { connection } from "@/DB/connection";
import responseService from "@/module/services/response.service";

class FetchDataService {
    async getResponseDetails(id: string): Promise<IDisplayResponse | null> {
        await connection();
        try {
            const response = await responseService.getResponse(id);
            return response;
        } catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
            }
            else {
                console.error("something went wrong!", error);
            }
            return null;
        }
    }
}
export default new FetchDataService();