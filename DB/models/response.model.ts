import { IFormResponse } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IResponseDocument extends IFormResponse, Document { }

const ResponseSchema = new Schema<IResponseDocument>(
    {
        formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        answers: [
        {
            fieldId: { type: String, required: true },
            answer: { type: Schema.Types.Mixed, required: true },
        }
        ],
        anonymous: { type: Boolean, default: false, required: true },
    }, 
    { timestamps: true }
);

ResponseSchema.index({ formId: 1, userId: 1 }, { unique: true });
const responseModel =
    mongoose.models.Response || mongoose.model<IResponseDocument>("Response", ResponseSchema);

export default responseModel;