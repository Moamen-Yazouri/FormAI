import { IResponseFromDB } from "@/@types";
import responseModel from "@/DB/models/response.model";
import mongoose from "mongoose";
import userRepo from "./user.repo";
import { ICreatorResponses } from "@/app/(main)/creator/dashboard/types";
import { getDateOnly } from "@/lib/dateUtils";

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
        const creatorResponses = await responseModel.find().populate([
            {
                path: "userId",
                match: {name: creator?.name},
                select: "name email -_id"
            },
            {
                path: "formId",
                match: {creatorId: creator._id },
                select: "title"
            }
        ])
        
        const filteredResponses: ICreatorResponses[] = creatorResponses.filter(
                    response => response.formId !== null
                )
                .map(
                    res => ({
                        id: String(res._id),
                        formTitle: res.formId.title, 
                        respondentName: res.userId.name,
                        respondentEmail: res.userId.email,
                        date: getDateOnly(res.createdAt)
                    })
                );

        return filteredResponses;           
    }
}

export default new ResponseRepo();