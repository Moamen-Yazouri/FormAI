import { connection } from "@/DB/connection";
import responseService from "@/module/services/response.service";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    await connection();
    try {
        const { id } = await req.json();
        if (id) {
            return NextResponse.json({message: "No id provided!"}, {status: 400});
        }
        const response = await responseService.deleteResponse(id);
        if(!response) {
            return NextResponse.json({message: "No response found!"}, {status: 404});
        }
        return NextResponse.json({response}, {status: 200});
    }
    catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({message: err.message}, {status: 500});
        }
        return NextResponse.json({message: "Something went wrong!"}, {status: 500});
    }
}