import { EType, IForm } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IFormDocument extends IForm, Document {}

const formSchema = new Schema<IFormDocument>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        fields: [
            {
                fieldId: { type: String, required: true },
                label: { type: String, required: true },
                type: { type: String,enum: Object.values(EType) ,required: true },
                required: { type: Boolean, default: false },
                options: { type: [String], default: [] },
            }
        ],
        answeredBy: [{ type: String }], 
        creatorId: { type: String, required: true }, 
        isPublic: { type: Boolean, default: false },
        allowAnonymous: { type: Boolean, default: false },
        expiredAt: { type: Date },
    },
    { timestamps: true }
);

const FormModel = mongoose.models.Form || mongoose.model<IFormDocument>("Form", formSchema);
export default FormModel;
