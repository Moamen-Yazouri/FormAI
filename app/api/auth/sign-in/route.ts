import { IUserFromDB } from "@/@types";
import { connection } from "@/DB/connection";
import authService from "@/module/services/auth.service";

import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try {
        const data = await req.json();

        if(!data) {
            return NextResponse.json({message: "No data provided"}, {status: 400});
        }

        await connection();

        const {token, user}: {token: string, user: IUserFromDB} = await authService.signin(data);
        return NextResponse.json({message: "User logged successfully", token, user}, {status: 200})
    }
    catch(err) {
        if(err instanceof Error) {
                return Response.json({ message: err.message }, { status: 401 }) 
        }
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
    }
}