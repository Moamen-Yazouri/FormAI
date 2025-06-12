import { NextRequest, NextResponse } from "next/server";
import { generatePrompt } from "../util/generatePrompt";
import { cleanJsonResponse } from "../util/cleanJsonResponse";

export const POST = async(req: NextRequest ) => {
    try{
        const {formRequirements} = await req.json();    
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if(!GEMINI_API_KEY) {
            return NextResponse.json(
                {error: "API key not found!"},
                {status: 404}
            )
        }
        const GEMINI_API_URL = 
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

        if(!formRequirements) {
            return NextResponse.json(
                {error: "Please Provide form details!"},
                {status: 404}
            )
        }
        const prompt = generatePrompt(formRequirements);
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                {
                    parts: [
                    { text: prompt }
                    ]
                }
                ]
            })
        });
        if(!response.ok) {
            const errorMessage = await response.json();
            console.error(errorMessage);
            return NextResponse.json(
                {error: errorMessage.message},
                {status: 502}
            )
        }
        const data = await response.json();
        const jsonResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;;
        if(!jsonResponse) {
            console.error("No response from the OPENAI API!");
            return NextResponse.json(
                {error: "Unexpected API response!"},
                {status: 502}
            )
        }
        const cleanedJson = cleanJsonResponse(jsonResponse);
        try{
            const parsedJson = JSON.parse(cleanedJson);
            return NextResponse.json( parsedJson, {status: 200})    
        }
        catch(parseError) {
            console.error("Faild to parse the OPENAI API, Raw response:", parseError);
            return NextResponse.json(
                {
                    error: "Faild to parse the OPENAI API Response!",
                    rawResponse: cleanedJson
                },
                {status: 502}
            )
        }
    }
    catch(error) {

    }
}