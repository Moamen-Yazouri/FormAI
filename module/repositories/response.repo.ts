import { IResponseFromDB, IResponsePopulatedUser, IUserFromDB, IUserResponseTable } from "@/@types";
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
    // async getUserResponses(userId: string) {
    //     return await responseModel.find({userId});
    // }

    async getCreatorResponses(name: string) {
        const creator = await userRepo.getUserByName(name);
        if (!creator) {
            return null;
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

        return creatorResponses;
    }

    async getUserResponses(name: string) {
        const user: IUserFromDB = await userRepo.getUserByName(name);
        if (!user) throw new Error("Invalid user!")
        const userResponses = await responseModel.find({ userId: user._id }).populate([
            {
                path: "formId",
                select: "title -_id"
            },
        ])
            .lean<IResponsePopulatedUser[]>();
        return userResponses;
    }

    async deleteResponse(responseId: string) {
        return await responseModel.findByIdAndDelete(responseId);
    }
}

export default new ResponseRepo();