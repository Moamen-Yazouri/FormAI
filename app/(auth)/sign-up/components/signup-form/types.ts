import { IUser } from "@/@types";

export interface FormValues extends Omit<IUser, "lastActive">   {
    confirmedPassword: string;
}