import { IFormFromDB } from "@/@types";
import { connection } from "@/DB/connection";
import responseRepo from "@/module/repositories/response.repo";
import formsService from "@/module/services/forms.service";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    
        const formId = (await req.json()).formId;
        if (!formId) {
            return NextResponse.json({ message: "Form ID is required!" }, { status: 401 });
        }

        await connection();

        try {
        console.log("Form ID: ", formId);
        await responseRepo.deleteFormResponses(formId);

        const deletedForm: IFormFromDB | null = await formsService.deleteForm(formId); 
        if (!deletedForm) {
            return NextResponse.json({ message: "Invalid form ID!" }, { status: 401 });
        }

        return NextResponse.json({ deletedForm }, { status: 200 });
    }
    catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 401 });
        }
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}