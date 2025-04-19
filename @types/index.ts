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
}

export type fieldTypes = `${EType}`;

export interface IFormField {
    fieldId: string;
    label: string;
    type: fieldTypes; 
    required: boolean;
    options?: string[];
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
  role: UserRoles;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

