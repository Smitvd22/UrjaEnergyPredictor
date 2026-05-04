import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { question, language } = body;
  
  let answer = "";
  if (language === "Hindi") {
    answer = "यह एक कृत्रिम बुद्धिमत्ता प्रतिक्रिया है। वर्तमान ग्रिड स्थिति स्थिर है।";
  } else {
    answer = \`Simulated AI response to: "\${question}". Based on the current grid telemetry, everything is operating smoothly with minimal flux events.\`;
  }
  
  return NextResponse.json({
    answer: answer
  });
}
