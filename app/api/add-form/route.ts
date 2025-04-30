import { IForm } from "@/@types";
import formsService from "@/module/services/forms.service";
import { connection, NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest ) => {
    const formData: IForm = await request.json();
    if(!formData) {
        return NextResponse.json({message: "Form data not found!"})
    }
    await connection();
        console.log(formData);
    try {
        await formsService.addNewForm(formData);
        return NextResponse.json({message: "Form added successfully!"}, {status: 201})
    }
    catch(err) {
        if(err instanceof Error) {
            return NextResponse.json({message: "Bad request!"}, {status: 400})
        }
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}