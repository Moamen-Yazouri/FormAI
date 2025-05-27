import { IResponseFromDB, IResponsePopulatedUser, IUserFromDB, IUserResponseTable } from "@/@types";
import responseModel from "@/DB/models/response.model";
import mongoose from "mongoose";
import userRepo from "./user.repo";

import { getDateOnly } from "@/lib/dateUtils";
import { IResponseDetailsFromDB } from "../services/types";
import { deleteUser } from "@/components/user-table/actions/user.action";

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
        const filtered = creatorResponses.filter(r => r.formId !== null);
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
}

export default new ResponseRepo();