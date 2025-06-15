import { IForm, IFormFromDB, IFormPopulatedByCreator } from "@/@types";
import FormModel from "@/DB/models/form.model";



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
    async deleteUserForms (userId: string) {
        return await FormModel.deleteMany({creatorId: userId});
    }
    async addRespondant (formId: string, userId: string) {
        if(userId === "Anonymous") {
            return await FormModel.findByIdAndUpdate(formId, {
                $inc: {
                    anonymousNumber: 1
                }
            }).lean<IFormFromDB>();
        }
        return await FormModel.findByIdAndUpdate(formId, {
            $addToSet: {
                answeredBy: userId
            }
        }).lean<IFormFromDB>();
    }
}

export default new FormsRepo();