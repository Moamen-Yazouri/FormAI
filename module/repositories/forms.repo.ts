import { IForm, IFormFromDB, IFormPopulatedByCreator } from "@/@types";
import FormModel from "@/DB/models/form.model";
import userModel from "@/DB/models/user.model";

class FormsRepo {
    async getAllowedForms(userId: string): Promise<IFormPopulatedByCreator[] | null> {
        const email = await userModel.findById(userId).select("email");
        const allowedForms = await FormModel.find({isPublic: true}).populate('creatorId', "name -_id").lean<IFormPopulatedByCreator[]>();
        return allowedForms;
    }
    async getFormById(formId: string): Promise<IFormFromDB | null> {
        return await FormModel.findById(formId).lean<IFormFromDB>();
    }

    async getFormByName(formName: string): Promise<IFormFromDB | null> {
        return await FormModel.findOne({title: formName}).lean<IFormFromDB>();
    }
    async addForm(formData: IForm): Promise<IFormFromDB> {
        return await FormModel.create(formData);
    }
}

export default new FormsRepo();