import { IUserFromDB } from "@/@types";
import { connection } from "@/DB/connection";
import formsService from "@/module/services/forms.service";
import responseService from "@/module/services/response.service";
import userService from "@/module/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    await connection();
    try {
        const userId = (await req.json()).userId;
        console.log(userId);
        if (!userId) {
            return NextResponse.json({ message: "User ID is required!" }, { status: 401 });
        }

        await formsService.deleteUserForms(userId);

        await responseService.deleteUserResponses(userId);

        const deletedUser: IUserFromDB | null = await userService.deleteUser(userId);
        if (!deletedUser) {
            return NextResponse.json({ message: "Invalid user ID!" }, { status: 401 });
        }

        return NextResponse.json({ deletedUser }, { status: 200 });
    }
    catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 401 });
        }
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}