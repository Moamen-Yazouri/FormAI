import { IUsersActivityData } from "@/@types";
import { connection } from "@/DB/connection";
import dashboardService from "@/module/services/admin/dashboard.service";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connection();
        const usersActivityData: IUsersActivityData[] = await dashboardService.getUsersActivityData();
        if (!usersActivityData) {
            return NextResponse.json({ userActivityData: [] }, { status: 404 });
        }
        return NextResponse.json({ usersActivityData }, { status: 200 })
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}