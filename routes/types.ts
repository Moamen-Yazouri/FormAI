import { UserRoles } from "@/@types";
import { routesAccess } from "./pageAccessRights";

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
    | "/already-logged"
    | "/forbidden"
    
export const protectedRoutes = Array.from(routesAccess.keys());

export interface IPageAccessRights {
    role: UserRoles[]
}