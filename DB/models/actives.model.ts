import { IActive } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IAcvtiveDocument extends IActive, Document { }

const ActivesSchema = new Schema<IAcvtiveDocument>(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true, 
            index: true, 
            unique: true 
        },
        lastActive: { type: Date, required: true },
    },
    { timestamps: true }
);

const activesModel =
    mongoose.models.Actives || mongoose.model<IAcvtiveDocument>("Actives", ActivesSchema);

export default activesModel;