import { IResponseFromDB } from "@/@types";
import responseModel from "@/DB/models/response.model";
import mongoose from "mongoose";

class ResponseRepo {
    async getUserResponses(userId: string) {
        return await responseModel.find({userId});
    }

    async getCreatorResponses(creatorId: string) {
        const creatorResponses = await responseModel.find().populate(
            {
                path: "formId",
                match: {creatorId: new mongoose.Types.ObjectId(creatorId) },
                select: "_id"
            }
        )
        
        const filteredResponses: IResponseFromDB[] = creatorResponses.filter(
                    response => response.formId !== null
                )
                .map(
                    res => ({
                        _id: res._id,
                        formId: res.formId._id, 
                        userId: res.userId,
                        answers: res.answers,
                        createdAt: res.createdAt,
                        updatedAt: res.updatedAt,
                        __v: res.__v
                    })
                );

        return filteredResponses;           
    }
}

export default new ResponseRepo();