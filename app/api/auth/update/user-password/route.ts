import { connection, NextRequest, NextResponse } from "next/server";
import { UpdatePassword } from "../types";
import userService from "@/module/services/user.service";

export const POST = async (req: NextRequest) => {
    const payload: UpdatePassword = await req.json();
    if(!payload) {
        return NextResponse.json({message: "Invalid payload"}, {status: 400});
    }
    if(!payload.id ||!payload.prevPassword ||!payload.newPassword) {
        return NextResponse.json({message: "Invalid payload"}, {status: 400});
    }
    await connection();
    try {
        const updatedUser = await userService.updatePassword(payload.id, payload.prevPassword, payload.newPassword);
        if(!updatedUser) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json({message: "Password updated successfully", updatedUser}, {status: 200});
    }
    catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({message: err.message}, {status: 500});
        }
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }
}