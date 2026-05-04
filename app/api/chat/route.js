import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { question, language } = body;
  let answer = "";
  
  try {
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      throw new Error("GROQ_API_KEY is not configured.");
    }

    const systemPrompt = `You are a knowledgeable AI assistant for the Urja Precision Telemetry Grid dashboard. 
    You must answer the user's questions about the grid telemetry accurately and concisely.
    Please respond in ${language}. Here is the current grid data: ${JSON.stringify(body.inputs || {})}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqApiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    answer = data.choices[0].message.content;

  } catch (error) {
    console.error("Error in chat API:", error);
    if (language === "Hindi") {
      answer = "क्षमा करें, AI सेवा वर्तमान में अनुपलब्ध है।";
    } else {
      answer = "Sorry, the AI service is currently unavailable.";
    }
  }

  return NextResponse.json({
    answer: answer
  });
}
