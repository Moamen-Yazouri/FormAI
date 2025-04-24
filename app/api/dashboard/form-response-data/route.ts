import { IFormResponseData } from "@/@types";
import { connection } from "@/DB/connection"
import dashboardService from "@/module/services/dashboard.service";
import { NextResponse } from "next/server"

export const GET = async() => {
    try{
        await connection();
        const formResponsesData: IFormResponseData[] = await dashboardService.getResponsesData();

        if(!formResponsesData) {
            return NextResponse.json({formResponsesData: []}, {status: 404});
        }

        return NextResponse.json({formResponsesData}, {status: 200});
    }
    catch(error) {
        if(error instanceof Error) {
            return NextResponse.json({message: error.message}, {status: 400}) 
        }
        return NextResponse.json({message: "Something went wrong!"}, {status: 500}) 
    }
}