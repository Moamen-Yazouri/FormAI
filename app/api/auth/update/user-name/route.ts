import { NextRequest, NextResponse } from "next/server";
import { UpdateName } from "../types";
import { connection } from "@/DB/connection";
import userService from "@/module/services/user.service";

export const POST = async (req: NextRequest) => { 
    const payload: UpdateName = await req.json();
    if(!payload) {
        return NextResponse.json({message: "Invalid payload"}, {status: 400});
    }
    if(!payload.id ||!payload.name) {
        return NextResponse.json({message: "Invalid payload"}, {status: 400}); 
    }
    await connection();
    try {
        const updatedUser = await userService.updateName(payload.id, payload.name);
        if(!updatedUser) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json({message: "User updated successfully", updatedUser}, {status: 200});
    }
    catch(e) {
        if(e instanceof Error) {
            return NextResponse.json({message: e.message}, {status: 500});
        }
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}