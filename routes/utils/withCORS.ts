import { NextResponse } from "next/server";

export const withCORS = (response: NextResponse) => {
    response.headers.set("Access-Control-Allow-Origin", "https://form-ai-gold.vercel.app");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
};