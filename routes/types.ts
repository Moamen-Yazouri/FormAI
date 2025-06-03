import { UserRoles } from "@/@types";

export type PageAccessName = 
    | "/sign-in"
    | "/sign-up"
    | `/admin`
    | `/creator`
    | "/user"
    | "/answer-form"
    | "/available-forms"
    | "/review-response"
    | "/form-answers"
    | "/form-generator"
    | "/answer-form"
    | "/my-forms"
    | "/profile"
    | "/view-form"

export const protectedRoutes = Array.from([]);

export interface IPageAccessRights {
    role: UserRoles[]
}