import { IContextUser } from "@/@types";
import { ITokenPayload, verifyToken } from "@/lib/generateAndVerifyToken";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    const token = (await cookies()).get("auth-token");
    if(!token) {
        return NextResponse.json({user: null}, {status: 401});
    }

    try {
        const userData: ITokenPayload | null = await verifyToken(token.value);
        console.log(userData);
        if(!userData) {
            (await cookies()).delete("auth-token")
            return NextResponse.json({user: null}, {status: 401});
        }
        const userToContext: IContextUser = {
            _id: userData.userId,
            email: userData.email,
            role: userData.role,

        }
        return NextResponse.json({user: userToContext}, {status: 200});
    }
    catch(err) {
        if(err instanceof Error) {
            return NextResponse.json({message: err.message, user: null}, {status: 500});
        }
        return NextResponse.json({message: "Internal server error", user: null}, {status: 500});
    }
} 