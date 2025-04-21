import FormModel from "@/DB/models/form.model";
import responseModel from "@/DB/models/response.model";
import userModel from "@/DB/models/user.model";

class DashboardRepo {
    async getAllUsers() {
        return await userModel.find({});
    }

    async getUserForms(userId: string) {
        return await FormModel.find({userId});
    }

    async getUserResponses(userId: string) {
        return await responseModel.find({userId});
    }
}

export default new DashboardRepo();