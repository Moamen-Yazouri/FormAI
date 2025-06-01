import { IFormCreationData } from "@/@types";
import { connection } from "@/DB/connection";
import dashboardService from "@/module/services/admin/dashboard.service";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connection();
        const formsCreationData: IFormCreationData[] = await dashboardService.getFormsCreationData();
        if (!formsCreationData) {
            return NextResponse.json({ formsCreationData: [] }, { status: 404 });
        }
        return NextResponse.json({ formsCreationData }, { status: 200 })
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}