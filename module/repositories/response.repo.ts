import { IResponseFromDB } from "@/@types";
import responseModel from "@/DB/models/response.model";
import mongoose from "mongoose";
import userRepo from "./user.repo";

class ResponseRepo {
    async getResponseById(responseId: string) {
        return await responseModel.findById(responseId);
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
    async getUserResponses(userId: string) {
        return await responseModel.find({userId});
    }

    async getCreatorResponses(name: string) {
        const creator = await userRepo.getUserByName(name);
        const creatorResponses = await responseModel.find().populate(
            {
                path: "formId",
                match: {creatorId: creator._id },
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