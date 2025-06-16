import { IFormResponse, IResponseFromDB, IResponsePopulatedUser, IUserFromDB } from "@/@types";
import responseModel from "@/DB/models/response.model";
import { IResponseDetailsFromDB } from "../services/types";


class ResponseRepo {
    async getResponseById(responseId: string) {
        return await responseModel.findById(responseId).lean<IResponseFromDB>() ;
    }
    async updateResponse(response: IFormResponse) {
        const { formId, userId } = response;
        return await responseModel.findOneAndUpdate(
            {
                formId,
                userId
            },
            response, 
            { new: true }
        );
    }
    async getResponseData(responseId: string) {
        return await responseModel.findById(responseId).populate([
            {
                path: "formId",
                select: "title"
            },
            {
                path: "userId",
                select: "name email -_id"
            }
        ]);
    }

    async addResponse(response: IFormResponse) {
        return await responseModel.create(response);
    }
    async getCreatorResponses(creator: IUserFromDB) {
        if (!creator) {
            throw new Error("Invalid Creator name!")
        }
        const creatorResponses = await responseModel.find().populate([
            {
                path: "userId",
                select: "name email -_id"
            },
            {
                path: "formId",
                match: { creatorId: creator._id },
                select: "title"
            }
        ])
        const filtered = creatorResponses.filter(r => r.formId !== null).map(res => {
            if(res.anonymous) {
                return {...res, userId: {
                    name: "Anonymous",
                    email: "Anonymous"
                }}
            }
            else {
                return res;
            }
        });
        return filtered;
    }

    async getFormResponses(formId: string) {
            const formResponses = await responseModel.find().populate([
                {
                    path: "userId",
                    select: "name email -_id"
                },
                {
                    path: "formId",
                    match: { _id: formId },
                    select: "title"
                }
            ])
            const filtered = formResponses.filter(r => r.formId !== null);
            return filtered;
    }

    async getUserResponses(id: string) {
        const userResponses = await responseModel.find({ userId: id }).populate([
            {
                path: "formId",
                select: "title -_id"
            },
        ])
            .lean<IResponsePopulatedUser[]>();
        return userResponses;
    }

    async getUserResponseDetails(id: string) {
        const userResponses = await responseModel.find({ userId: id }).populate([
            {
                path: "formId",
                select: "title description createdAt creatorId _id",
                populate: {
                    path: "creatorId",
                    select: "name -_id"
                }
            },
        ])
        .lean<IResponseDetailsFromDB[]>();
        return userResponses;
    }
    async deleteResponse(responseId: string) {
        return await responseModel.findByIdAndDelete(responseId);
    }
    async deleteFormResponses(formId: string) {
        return await responseModel.deleteMany({ formId: formId });
    }

    async deleteUserResponses(userId: string) {
        return await responseModel.deleteMany({ userId: userId });
    }
    
    async getResponseByUserIdAndFormId(userId: string, formId: string) {
        return await responseModel.findOne({ userId: userId, formId: formId }).lean<IResponseFromDB>();
    }
}

export default new ResponseRepo();