import { IUser } from "@/@types";

export interface FormValues extends IUser {
    confirmedPassword: string;
}