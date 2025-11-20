import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import StreamingTextResponse from "ai";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. Your output should be like: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Make them intriguing and positive.";

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You generate friendly, open-ended questions. Keep output in one single string separated by ||.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    });

    const result = completion.choices[0]?.message?.content || "";
    console.log("Groq Response:", result);

    return NextResponse.json({ completion: result.trim() });
  } catch (error: any) {
    console.error("Groq Error:", error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
