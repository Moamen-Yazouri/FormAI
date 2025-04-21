import { IUserDocument } from "@/DB/models/user.model";
import mongoose from "mongoose";

export enum ERole {
    Admin = "admin",
    Creator = "creator",
    User = "user"
}
export type UserRoles = `${ERole}`;

export interface IUser {
    name: string;
    role: UserRoles;
    email: string;
    password: string;
}
export enum EType {
    text = "text",
    textarea = "textarea",
    checkbox = "checkbox",
    radio = "radio",
    dropdown= "dropdown",
    email = "email",
    select = "select",
}

export type fieldTypes = `${EType}`;

export interface IFormField {
    fieldId: string;
    label: string;
    type: fieldTypes; 
    required: boolean;
    options?: string[];
    placeholder?: string;
}
export interface IForm {
    title: string;
    description: string;
    fields: IFormField[];
    answeredBy: string[];
    creatorId: string;
    isPublic: boolean;
    allowAnonymous: boolean;
    expiredAt: Date;
}

type IAnswer = {
    fieldId: string;
    answer: string | string[];
};

export interface IFormResponse {
    formId: string;
    userId?: string;
    answers: IAnswer[]; 
}


export interface IUserFromDB {
    _id: string;          
    name: string;
    email: string;
    role: UserRoles;  
    createdAt: string;    
    updatedAt: string;
}

export interface IFormData {
    title: string
    description: string
    fields: IFormField[]
    submitButton: string
}
export interface IContextUser extends Pick<IUserFromDB, "_id"| "role" | "email"> {}
export interface IAuthContext {
    user: IContextUser | null;
    setUser: React.Dispatch<React.SetStateAction<IContextUser | null>>;
    isLoading: boolean;
}

export interface IUsersData {
    id: string,
    name: string,
    email: string,
    role: string,
    status: string,
    forms: number,
    lastActive: string,
}
