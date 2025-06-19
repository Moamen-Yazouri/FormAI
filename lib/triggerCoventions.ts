import { AccessRightsType } from "@/@types/access";
import { forbidden, unauthorized, notFound } from "next/navigation";

export const handleAccess = (access: AccessRightsType) => {

    if(access === "forbidden") {
        forbidden();
    }

    if(access === "unauthorized") {
        unauthorized();
    }

    if(access === "notFound") {
        notFound();
    }
    return;
} 