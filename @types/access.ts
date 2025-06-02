export enum AccessRights {
        "forbidden",
        "unauthorized",
        "allowed",
        "notFound"
    }
export type AccessRightsType = keyof typeof AccessRights;