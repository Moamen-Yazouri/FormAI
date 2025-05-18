import { IContextUser } from "@/@types";
import { ITokenPayload, verifyToken } from "@/lib/generateAndVerifyToken";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const authToken = req.cookies.get("auth-token")?.value;
    if(!authToken) {
        return NextResponse.json({user: req.cookies}, {status: 401});
    }

    try {
        const userData: ITokenPayload | null = await verifyToken(authToken);
        if(!userData) {
            (await cookies()).delete("auth-token")
            return NextResponse.json({user: null}, {status: 400});
        }
        const userToContext: IContextUser = {
            _id: userData.userId,
            email: userData.email,
            role: userData.role,
            name: userData.name,

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