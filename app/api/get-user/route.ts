import { connection } from "@/DB/connection";
import userService from "@/module/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await connection()
    try {
        const { id } = await req.json();

        if (!id) {
        return NextResponse.json(
            { error: "Please provide a user id!" },
            { status: 400 }
        );
        }

        const user = await userService.findUserById(id);

        if (!user) {
        return NextResponse.json(
            { error: "User not found!" },
            { status: 404 }
        );
        }

        return NextResponse.json(
        { user },
        { status: 200 }
        );
    } catch (err) {
        if (err instanceof Error) {
        return NextResponse.json(
                { error: err.message },
                { status: 500 }
        );
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};
