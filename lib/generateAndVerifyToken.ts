"server-only"
import { UserRoles } from "@/@types";
import { JwtPayload } from "jsonwebtoken";
import { SignJWT, jwtVerify } from "jose";
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
export interface ITokenPayload extends JwtPayload {
    userId: string;
    name: string;
    email: string;
    role: UserRoles;
}

export const generateToken = async (
    payload: ITokenPayload,
    expirationTime: string = "1d"
): Promise<string> => {
    const t =  new SignJWT(payload)
                    .setProtectedHeader({ alg: "HS256" })
                    .setIssuedAt()
                    .setExpirationTime(expirationTime)
    const token = await t.sign(encodedKey); 

    return token;
}

export const verifyToken = async (token: string): Promise<ITokenPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ["HS256"]
        });
        return payload as ITokenPayload;
    } catch {
        return null;
    }
}