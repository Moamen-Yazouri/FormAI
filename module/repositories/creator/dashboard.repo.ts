import { IFormFromDB } from "@/@types";
import formsRepo from "../forms.repo";
import { IFormCreationData } from "@/app/(main)/creator/dashboard/types";

class DashboardRepo {
    async getFormCreationData(id: string) {
        return await formsRepo.getCreatorForm(id);
    }
}

export default new DashboardRepo();