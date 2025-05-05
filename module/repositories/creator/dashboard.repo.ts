import { IFormFromDB } from "@/@types";
import formsRepo from "../forms.repo";
import { IFormCreationData } from "@/app/(main)/creator/dashboard/types";

class DashboardRepo {
    async getFormCreationData(name: string) {
        return await formsRepo.getCreatorForm(name);
    }
}

export default new DashboardRepo();