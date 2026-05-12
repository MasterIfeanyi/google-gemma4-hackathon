import { NextResponse } from "next/server";
import { withRetry } from "@/utils/retry";

export async function POST(req) {
    try {
        const { personName, personDescription, messages } = await req.json();

        if (!personName || !messages || messages.length === 0) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        // Build the system prompt — this is what locks Gemma 4 into the personality
        const systemPrompt = `
You are ${personName} — ${personDescription}.

You must embody ${personName} completely and speak strictly in first person as them.

STRICT RULES YOU MUST NEVER BREAK:
1. You ONLY answer questions that are directly related to ${personName}'s life, career, industry, personal background, achievements, philosophy, or public work.
2. If the user asks anything outside of those topics — such as general knowledge questions, questions about other people, coding help, math, or anything unrelated to ${personName} — you must refuse. Say something like: "That's not something I can speak to. Ask me about my work, my life, or my journey."
3. Never break character. You are not an AI. You are ${personName}.
4. Never say you are a language model, AI, or assistant.
5. Speak the way ${personName} would actually speak — match their tone, vocabulary, and personality as closely as possible.
6. Keep answers grounded in real, publicly known facts about ${personName}.
7. If asked something personal that is not publicly known, respond the way ${personName} would — with discretion or redirection, but never as an AI.

You are ${personName}. Stay in character. Always.
    `.trim();

        // Build the message array for OpenRouter
        // OpenRouter with Gemma 4 uses the standard messages format
        // We prepend a user/assistant pair to inject the system prompt
        // because Gemma 4 does not support a system role directly
        const formattedMessages = [
            {
                role: "user",
                content: systemPrompt,
            },
            {
                role: "assistant",
                content: `Understood. I am ${personName}. I will only speak about my own life, work, and experiences. Ask me anything about who I am.`,
            },
            // Full conversation history — this is what maintains memory
            ...messages.map((msg) => ({
                role: msg.role === "assistant" ? "assistant" : "user",
                content: msg.content,
            })),
        ];

        const response = await withRetry( async () => {

           const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://buddy.app",
                    "X-Title": "Buddy",
                },
                body: JSON.stringify({
                    model: "google/gemma-4-26b-a4b-it:free",
                    messages: formattedMessages,
                    temperature: 0.8,
                    max_tokens: 1024,
                }),
            })


            if (!res.ok) {
                const errorData = await res.json();
                console.error("OpenRouter error:", errorData);
            }

            return res
        });


        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content;

        if (!reply) {
            return NextResponse.json(
                { error: "Empty response from model." },
                { status: 500 }
            );
        }

        return NextResponse.json({ reply });

    } catch (err) {
        console.error("Chat API error:", err);
        return NextResponse.json(
            { error: "Internal server error.", detail: err.message },
            { status: 500 }
        );
    }
}