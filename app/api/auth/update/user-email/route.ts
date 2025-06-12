import { NextRequest, NextResponse } from "next/server";
import { UpdateEmail } from "../types";
import userService from "@/module/services/user.service";
import { connection } from "@/DB/connection";

export const POST = async (req: NextRequest) => {
    const newEmail: UpdateEmail | null = await req.json();
    if(!newEmail) {
        return NextResponse.json({message: "No data provided"}, {status: 400})
    }

    if (!newEmail?.id || !newEmail?.email) {
        return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }
    await connection();
    try {
        console.log(newEmail.id, newEmail.email)
        const user = await userService.updateEmail(newEmail.id, newEmail.email);
        if(!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json({message: "User email updated successfully", updatedUser: user}, {status: 200})
    }
    catch(err) {
        if(err instanceof Error) {
            return NextResponse.json({message: err.message}, {status: 400})
        }
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}