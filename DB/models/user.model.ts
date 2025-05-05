import { IUser, ERole } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
    {
        name: { type: String, required: true, unique: true },
        role: { type: String, enum: Object.values(ERole), required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
{ timestamps: true });

const userModel =
    mongoose.models.User || 
    mongoose.model<IUserDocument>("User", UserSchema);

export default userModel;
