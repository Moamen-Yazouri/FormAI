import { IFormFromDB, IFormPopulatedByCreator, IUserFromDB } from "@/@types";
import FormModel from "@/DB/models/form.model";
import responseModel from "@/DB/models/response.model";
import userModel from "@/DB/models/user.model";

class DashboardRepo {
    async getAllUsers() {
        return await userModel.find({}).lean<IUserFromDB[]>();
    }

    async getUserForms(userId: string) {
        return await FormModel.find({userId}).lean<IFormFromDB[]>();
    }

    async getUserResponses(userId: string) {
        return await responseModel.find({userId}).lean();
    }

    async getAllFormsWithCreators() {
        return await FormModel.find({}).populate('creatorId', "name -_id").lean<IFormPopulatedByCreator[]>();
    }
}

export default new DashboardRepo();