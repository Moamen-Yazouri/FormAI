import { NextRequest, NextResponse } from "next/server";
import { generatePrompt } from "../util/generatePrompt";
import { cleanJsonResponse } from "../util/cleanJsonResponse";

export const POST = async (req: NextRequest) => {
  try {
    const { formRequirements } = await req.json();

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: "API key not found!" }, { status: 404 });
    }

    if (!formRequirements) {
      return NextResponse.json(
        { error: "Please Provide form details!" },
        { status: 404 }
      );
    }

    const prompt = generatePrompt(formRequirements);

    const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.2,
}),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error(errorMessage);
      return NextResponse.json(
        { error: errorMessage?.error?.message || "Groq request failed" },
        { status: 502 }
      );
    }

    const data = await response.json();

    // ✅ Groq returns assistant message content here:
    const jsonResponse = data.choices?.[0]?.message?.content;

    if (!jsonResponse) {
      console.error("No response from the Groq API!");
      return NextResponse.json(
        { error: "Unexpected API response!" },
        { status: 502 }
      );
    }

    const cleanedJson = cleanJsonResponse(jsonResponse);

    try {
      const parsedJson = JSON.parse(cleanedJson);
      return NextResponse.json(parsedJson, { status: 200 });
    } catch (parseError) {
      console.error("Failed to parse the Groq API response:", parseError);
      return NextResponse.json(
        {
          error: "Failed to parse the Groq API Response!",
          rawResponse: cleanedJson,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "something went wrong!" }, { status: 500 });
  }
};
