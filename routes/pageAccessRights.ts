import { IPageAccessRights, PageAccessName } from "./types";

const routesAccess = new Map<PageAccessName, IPageAccessRights>([
    [
        "/admin",
        {
            role: ["admin"]
        }
    ],
    [
        "/user",
        {
            role: ["user"]
        }
    ],
    [
        "/creator",
        {
            role: ["creator"]
        }
    ],
    [
        "/available-forms",
        {
            role: ["creator", "user", "creator"]
        }
    ],
    [
        "/answer-form",
        {
            role: ["creator", "user", "creator"]
        }
    ],
    [
        "/form-answers",
        {
            role: ["creator", "creator"]
        }
    ],
    [
        "/form-generator",
        {
            role: ["creator", "creator"]
        }
    ],
    [
        "/my-forms",
        {
            role: ["creator", "creator"]
        }
    ],
    [
        "/profile",
        {
            role: ["creator", "creator", "user"]
        }
    ],
    [
        "/review-response",
        {
            role: ["creator", "creator", "user"]
        }
    ],
    [
        "/view-form",
        {
            role: ["creator", "creator"]
        }
    ],

])