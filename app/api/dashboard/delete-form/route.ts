import { IFormFromDB } from "@/@types";
import { connection } from "@/DB/connection";
import dashboardRepo from "@/module/repositories/admin/dashboard.repo";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    await connection();
    try {
        const formId = (await req.json()).formId;
        if (!formId) {
            return NextResponse.json({ message: "form ID is required!" }, { status: 401 });
        }
        const deletedForm: IFormFromDB | null = await dashboardRepo.deleteForm(formId);
        if (!deletedForm) {
            return NextResponse.json({ message: "Invalid form ID!" }, { status: 401 });
        }
        return NextResponse.json({ deletedForm }, { status: 200 });
    }
    catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 401 });
        }
    }
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
}