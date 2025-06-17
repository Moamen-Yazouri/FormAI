import { UserRoles } from "@/@types";

export type FormValues  = {
    name: string;
    role: UserRoles;
}

export interface IOptions {
    value: string;
    label: string;
}