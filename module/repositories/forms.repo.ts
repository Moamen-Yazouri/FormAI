import { IForm, IFormFromDB, IFormPopulatedByCreator, IFormResponse } from "@/@types";
import FormModel from "@/DB/models/form.model";
import responseModel from "@/DB/models/response.model";


class FormsRepo {
    async getAllowedForms(id: string): Promise<IFormPopulatedByCreator[]> {
        const allowedForms = await FormModel.find({
                isPublic: true,
                answeredBy: {$nin: [id]}
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

    async getCreatorForm (id: string) {
        const creatorForms = await FormModel.find({
            creatorId: id
        }).lean<IFormFromDB[]>();
            return creatorForms;
        }
    async deleteForm (formId: string) {
        return await FormModel.findByIdAndDelete(formId).lean<IFormFromDB>();
    }
}

export default new FormsRepo();