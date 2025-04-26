import { NextRequest, NextResponse } from "next/server";
import { generatePrompt } from "../util/generatePrompt";
import { cleanJsonResponse } from "../util/cleanJsonResponse";

export const POST = async(req: NextRequest ) => {
    try{
        const {formRequirements} = await req.json();    
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
        if(!OPENAI_API_KEY) {
            return NextResponse.json(
                {error: "API key not found!"},
                {status: 404}
            )
        }
        if(!formRequirements) {
            return NextResponse.json(
                {error: "Please Provide form details!"},
                {status: 404}
            )
        }
        const prompt = generatePrompt(formRequirements);
        const response = await fetch(OPENAI_API_URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{role: "user", content: prompt}],
                    max_tokens: 2025,
                    temperature: 0.2,
                })
            }
        );
        if(!response.ok) {
            const errorMessage = await response.json();
            console.error(errorMessage);
            return NextResponse.json(
                {error: "Faild to fetch data from the OPENAI API, please retry!"},
                {status: 502}
            )
        }
        const data = await response.json();
        const jsonResponse = data.choices[0]?.message?.content;
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