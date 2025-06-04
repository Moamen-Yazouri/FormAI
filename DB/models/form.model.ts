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
            type: { type: String, enum: Object.values(EType), required: true },
            required: { type: Boolean, default: false },
            options: { type: [String], default: [] },
        },
        ],
        answeredBy: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        allowedUsers: {
            type: [String],
            default: [],
        },
        isPublic: { type: Boolean, default: true },
        allowAnonymous: { type: Boolean, default: true },
        expiredAt: {
        type: Date,
        default: () => {
            const farFuture = new Date();
            farFuture.setFullYear(farFuture.getFullYear() + 100);
            return farFuture;
        },
        },
    },
    { timestamps: true }
);

const FormModel =
    mongoose.models.Form || mongoose.model<IFormDocument>("Form", formSchema);

export default FormModel;
