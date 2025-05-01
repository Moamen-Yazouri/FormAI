import { IForm, IFormFromDB, IFormPopulatedByCreator, IFormResponse } from "@/@types";
import FormModel from "@/DB/models/form.model";
import responseModel from "@/DB/models/response.model";
import userModel from "@/DB/models/user.model";

class FormsRepo {
    async getAllowedForms(username: string): Promise<IFormPopulatedByCreator[] | null> {
        const email = await userModel.findOne({name: username}).select("email");
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
    async addResponse(response: IFormResponse) {
        return await responseModel.insertOne(response);
    }

    async getAnswerdForms (id: string) {
        const answeredForms = await FormModel.findOne({
            answeredBy: {$in: [id]}
        });
        
        return answeredForms;
    }
}

export default new FormsRepo();