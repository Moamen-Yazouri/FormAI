import { IFormFromDB, IFormPopulatedByCreator, IUserFromDB } from "@/@types";
import FormModel from "@/DB/models/form.model";
import responseModel from "@/DB/models/response.model";
import userModel from "@/DB/models/user.model";

class DashboardRepo {
    async getAllUsers() {
        return await userModel.find({}).lean<IUserFromDB[]>();
    }

    async getUserForms(userId: string) {
        return await FormModel.find({creatorId: userId}).lean<IFormFromDB[]>();
    }

    async getUserResponses(userId: string) {
        return await responseModel.find({userId}).lean();
    }

    async getAllFormsWithCreators() {
        return await FormModel.find({}).populate('creatorId', "name -_id").lean<IFormPopulatedByCreator[]>();
    }

    async getAllForms() {
        return await FormModel.find({}).lean<IFormFromDB[]>();
    }

    async deleteUser(userId: string) {
        return await userModel.findByIdAndDelete(userId).lean<IUserFromDB>();
    }

    async deleteForm(formId: string) {
        return await FormModel.findByIdAndDelete(formId).lean<IFormFromDB>();
    }

    async getFormById(formId: string) {
        return await FormModel.findById(formId).lean<IFormFromDB>();
    }

    async getFormResponses(formId: string) {
        return await responseModel.find({formId}).lean();
    }

}

export default new DashboardRepo(); 