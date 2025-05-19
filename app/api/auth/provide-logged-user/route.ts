import { IContextUser } from "@/@types";
import { ITokenPayload, verifyToken } from "@/lib/generateAndVerifyToken";
import { getToken } from "@/lib/getToken";
import userService from "@/module/services/user.service";


import { NextRequest, NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    const tokenPayload = await getToken();
    if (!tokenPayload) {
        return NextResponse.json({message: "Unauthorized", user: null}, { status: 401 });
    }

    try {
        const user = await userService.findUserById(tokenPayload.userId);
        if (!user) {
            return NextResponse.json({ message: "User not found", user: null }, { status: 404 });
        }
        const userToContext: IContextUser = {
            _id: String(user._id),
            email: user.email,
            role: user.role,
            name: user.name,
        }
        return NextResponse.json({ user: userToContext }, { status: 200 });
    }
    catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message, user: null }, { status: 500 });
        }
        return NextResponse.json({ message: "Internal server error", user: null }, { status: 500 });
    }
} 