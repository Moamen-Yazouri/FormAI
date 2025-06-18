import { connection, NextRequest, NextResponse } from "next/server";
import { UpdateRole } from "../types";
import userService from "@/module/services/user.service";

export const POST = async (req: NextRequest) => {
    const payload: UpdateRole = await req.json();

    if(!payload) {
        return NextResponse.json({message: "Invalid payload"}, {status: 400});
    }

    if(!payload.id || !payload.role) {
        return NextResponse.json({message: "Invalid payload"}, {status: 400}); 
    }

    await connection();
    try {
        const updateUser = await userService.updateRole(payload.id, payload.role);
        if(!updateUser) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }    
    } 
    catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({message: error.message}, {status: 500});
        }
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }

}