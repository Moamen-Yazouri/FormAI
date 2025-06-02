export enum AccessRights {
        "unauthorized",
        "allowed",
        "notFound"
    }
export type AccessRightsType = keyof typeof AccessRights;