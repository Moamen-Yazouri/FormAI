import { IFormTable } from "@/@types";
import { connection } from "@/DB/connection"
import dashboardService from "@/module/services/admin/dashboard.service";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connection();
        const formsData: IFormTable[] = await dashboardService.getFormsData();
        if (!formsData || formsData.length === 0) {
            return NextResponse.json({ message: "No forms found" }, { status: 404 });
        }
        return NextResponse.json({ formsData }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}