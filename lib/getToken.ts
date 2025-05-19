"server-only";

import { cookies } from "next/headers";
import { ITokenPayload, verifyToken } from "./generateAndVerifyToken";

export const getToken = async (): Promise<ITokenPayload | undefined | null> => {
    const token  = (await cookies()).get("auth-token")?.value;
    if(!token) return undefined;
    const tokenPayload = await verifyToken(token);
    return tokenPayload;
}