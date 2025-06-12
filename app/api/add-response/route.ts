import { connection, NextRequest } from "next/server";
import responseService from "@/module/services/response.service";
export const POST = async(req: NextRequest) => {
    const formResponse = await req.json();
    if(!formResponse){
        return Response.json({message: "Form response is required!"}, {status: 404});
    }
    await connection();
    try {
        
        const response = await responseService.addResponse(formResponse);
        
        return Response.json({response}, {status: 200});
    }
    catch(error) {
        if(error instanceof Error) {
            return Response.json({message: error.message}, {status: 400});
        }
        return Response.json({message: "Something went wrong!"}, {status: 500});
    }
} 