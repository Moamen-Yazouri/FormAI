import { IFormResponse } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IResponseDocument extends IFormResponse, Document {}

const ResponseSchema = new Schema<IResponseDocument> ({
    formId: {type: String, required: true, ref: "Form"},
    userId: {type: String, required: true, unique: true, ref: "User"},
    answers: [
        {
        fieldId: {type: String, required: true},
        answer: {type: Schema.Types.Mixed, required: true},
    }
],
},
{ timestamps: true }
); 
const responseModel =
    mongoose.models.responseModel || mongoose.model<IResponseDocument>("Response", ResponseSchema);

export default responseModel;