import { cookies } from "next/headers"
import { NextResponse } from "next/server";

const POST = async () => {
    (await cookies()).delete("auth-token");
    return NextResponse.json({message: "Logged out successfully"}, {status: 200});
}