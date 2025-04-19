import { IUser } from "@/@types";
import { connection } from "@/DB/connection";
import authService from "@/module/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try {
        const data = await req.json();

        if(!data) {
            return NextResponse.json({message: "No data provided"}, {status: 400});
        }

        await connection();

        const {token, user}: {token: string, user: IUser} = await authService.signin(data);
        
        (await cookies()).set("auth-token", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        })
        return NextResponse.json({message: "User logged successfully", token, role: user.role}, {status: 201})
    }
    catch(err) {
        if(err instanceof Error) {
                return Response.json({ message: err.message }, { status: 400 }) 
        }
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
    }
}