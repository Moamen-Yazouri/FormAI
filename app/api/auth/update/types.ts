import { UserRoles } from "@/@types";

export type UpdateEmail = {
    id: string;
    email: string;
} 
export type UpdateName = {
    id: string;
    name: string;
} 
export type UpdateRole = {
    id: string;
    role: UserRoles;
} 
export type UpdatePassword = {
    id: string;
    prevPassword: string;
    newPassword: string;
} 
