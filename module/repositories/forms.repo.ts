import { IForm, IFormFromDB, IFormPopulatedByCreator, IFormResponse, IUserFromDB } from "@/@types";
import FormModel from "@/DB/models/form.model";
import responseModel from "@/DB/models/response.model";
import userModel from "@/DB/models/user.model";

class FormsRepo {
    async getAllowedForms(username: string): Promise<IFormPopulatedByCreator[] | null> {
        const user = await userModel.findOne({name: username});
        if(!user) {
            return null;
        }
        const allowedForms = await FormModel.find({
                                isPublic: true,
                                answeredBy: {$nin: [user._id]}
                            })
                            .populate('creatorId', "name -_id")
                            .lean<IFormPopulatedByCreator[]>();
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
        return await responseModel.create(response);
    }

    async getAnswerdForms (id: string) {
        const answeredForms = await FormModel.findOne({
            answeredBy: {$in: [id]}
        })
        .populate({
            path: "creatorId",
            select: "name -_id"
        });
        
        return answeredForms;
    }

    async getCreatorForm (name: string) {
        const id = (await userModel.findOne({name}).lean<IUserFromDB>())?._id;
        if(!id) {
            throw new Error("User not found!");
            
        }
        const creatorForms = await FormModel.find({
            creatorId: id
        }).lean<IFormFromDB[]>();
            return creatorForms;
        }
}

export default new FormsRepo();