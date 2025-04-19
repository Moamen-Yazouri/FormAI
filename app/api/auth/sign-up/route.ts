import { IUser } from "@/@types";
import { connection } from "@/DB/connection";
import authService from "@/module/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try{
        await connection()
        const data: IUser = await req.json();
        if(!data) {
            return NextResponse.json({message: "No data provided"}, {status: 400});
        }
        const newUser = await authService.signUp(data);
        return NextResponse.json({message: "User created successfully", data: newUser}, {status: 201});
    }
    catch(error){
        if(error instanceof Error) {
            return NextResponse.json({message: error.message}, {status: 400});
        }
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}   