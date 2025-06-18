import { IPageAccessRights, PageAccessName } from "./types";

export const routesAccess = new Map<PageAccessName, IPageAccessRights>([
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
            role: ["creator", "user", "admin"]
        }
    ],
    [
        "/answer-form",
        {
            role: ["creator", "user", "admin"]
        }
    ],
    [
        "/form-answers",
        {
            role: ["admin", "creator"]
        }
    ],
    [
        "/form-generator",
        {
            role: ["admin", "creator"]
        }
    ],
    [
        "/my-forms",
        {
            role: ["admin", "creator"]
        }
    ],
    [
        "/profile",
        {
            role: ["admin", "creator", "user"]
        }
    ],
    [
        "/review-response",
        {
            role: ["admin", "creator", "user"]
        }
    ],
    [
        "/view-form",
        {
            role: ["creator", "admin"]
        }
    ],
    [
        "/forbidden",
        {
            role: ["creator", "admin", "user"]
        }
    ],

    [
        "/already-logged",
        {
            role: ["creator", "admin", "user"]
        }
    ]
])