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
    name: string;
    label: string;
    type: fieldTypes; 
    required: boolean;
    options?: string[];
    placeholder?: string;
    min?: number;
    max?: number;
}
export interface IForm {
    title: string;
    description: string;
    fields: IFormField[];
    answeredBy: mongoose.Types.ObjectId[];
    creatorId: mongoose.Types.ObjectId;
    isPublic: boolean;
    allowAnonymous: boolean;
    expiredAt?: Date;
    allowedUsers?: string[];
}

export type IAnswer = {
    fieldId: string | mongoose.Types.ObjectId;
    answer: string | string[] | boolean | number;
};

export interface IFormResponse {
    formId: mongoose.Types.ObjectId;
    userId?: mongoose.Types.ObjectId;
    answers: IAnswer[]; 
}

export interface IDisplayResponse {
    formTitle: string;
    respondentName: string;
    respondentEmail: string;
    submittedAt: string;
    responses: IAnswer[];
}
export interface IUserFromDB {
    _id: string;          
    name: string;
    password: string,
    email: string;
    role: UserRoles;  
    createdAt: string;    
    updatedAt: string;
}

export interface IResponseFromDB {
    _id: string; 
    formId: string;
    userId: string;
    answers: string[]; 
    createdAt: string; 
    updatedAt: string;
    __v: number;
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

export interface IUserData {
    id: string ,
    name: string,
    email: string,
    role: UserRoles,
    status: string,
    forms: number,
    lastActive: string,
}

export interface IDashboardForm {
    id: string ,
    name: string,
    creator: string,
    responses: number,
    createdAt: Date | string,
}

export interface IUserForm extends Omit<IDashboardForm, "responses"> {
    description: string,
    deadline?: string ,
}

export interface IFormFromDB extends IForm {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    creatorId: mongoose.Types.ObjectId;
    _v: number;
}

export interface IFormPopulatedByCreator extends Omit<IFormFromDB, "creatorId"> {
    creatorId: {
        name: string
    }
}

export interface IUserResponse extends Omit<IFormResponse, "formId">  {
    formId: {
        title: string
    }
}

export interface IUserResponseTable {
    id: string,
    formTitle: string,
    date: string,
}
export interface IUsersActivityData {
    name: string,
    active: number,
    new: number, 
}

export interface IFormCreationData {
    name: string,
    forms: number
}

export interface IFormResponseData {
    name: string,
    value: number,
}
export interface IStateCard {
    stateTitle: string,
    stateValue: number,
    statePercentage: number,
}

export interface IActiveUsers {
    id: string | number,
    name: string,
    email: string,
    avatar: string,
    lastActive: string,
    status: String,
    forms: number,
}

export interface IStyle {
    input: string,
    label: string,
}

export interface IResponsePopulatedCreator extends Omit<IResponseFromDB, "formId" | "userId"> {
    formId: {
        id: string,
        title: string
    }
    userId : {
        name: string,
        email: string,
    }
}
export interface IResponsePopulatedUser extends Omit<IResponseFromDB, "formId"> {
    formId: {
        title: string,
        description: string,
    }
}

export interface IUserResponseDetails {
    id: string,
    formId: string,
    title: string,
    description: string,
    creator:  string,
    createdAt: string,
    completedAt: string,
}