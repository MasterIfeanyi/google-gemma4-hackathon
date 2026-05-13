"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image"
import { dashboard as celebrities } from "@/data/dashboard";
import ChatInput from "@/components/ui/ChatInput";
import { saveSession, getSession } from "@/utils/chatHistory";

export default function ChatPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session") || "default";

    const customName = searchParams.get("name");

    // Find from celebrity list or build a custom object from the URL
    const person = celebrities.find((c) => c.id === id) || {
        id,
        name: customName || id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        categories: ["Public Figure"],
        description: "Public figure",
        image: null,
    };


    const [resolvedImage, setResolvedImage] = useState(person.image || null);


    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: `Hello. I'm ${person.name}. Ask me anything about my life, career, or work — I'm here to talk.`,
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Reset messages when session changes
    useEffect(() => {
        setMessages([
            {
                role: "assistant",
                content: `Hello. I'm ${person.name}. Ask me anything about my life, career, or work — I'm here to talk.`,
            },
        ]);
    }, [sessionId]);

    // Save conversation to localStorage every time messages update
    useEffect(() => {
        if (messages.length <= 1) return; // Don't save the initial greeting alone
        saveSession(id, sessionId, messages, person.name);
    }, [messages]);


    // Load existing session from localStorage if it exists
    useEffect(() => {
        const existing = getSession(id, sessionId);
        if (existing && existing.messages?.length > 0) {
            setMessages(existing.messages);
        } else {
            setMessages([
                {
                    role: "assistant",
                    content: `Hello. I'm ${person.name}. Ask me anything about my life, career, or work — I'm here to talk.`,
                },
            ]);
        }
    }, [sessionId]);

    useEffect(() => {
        // Only fetch from Wikipedia if this is a custom person with no image
        if (person.image) return;

        fetch(`/api/person-image?name=${encodeURIComponent(person.name)}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.image) setResolvedImage(data.image);
            })
            .catch(() => { }); // silently fail -- fallback to the initial letter avatar
    }, [person.name]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        const userMessage = { role: "user", content: trimmed };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    personName: person.name,
                    personDescription: person.description,
                    messages: updatedMessages.filter((_, i) => i !== 0),
                }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden">

            {/* Top Nav */}


            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                <div className="max-w-3xl mx-auto w-full space-y-6">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {/* AI avatar — left side */}
                            {msg.role === "assistant" && (
                                <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-border mb-0.5">
                                    {resolvedImage  ? (
                                        <Image
                                            width={80}
                                            height={80}
                                            src={resolvedImage }
                                            alt={person.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-xs font-semibold text-primary">
                                                {person.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Bubble */}
                            <div
                                className={`max-w-[70%] px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-t-xl rounded-bl-xl rounded-br-sm"
                                    : "bg-surface border border-border text-foreground rounded-t-xl rounded-br-xl rounded-bl-sm"
                                    }`}
                                style={{ boxShadow: "var(--shadow-sm)" }}
                            >
                                {msg.content}
                            </div>

                            {/* User avatar — right side */}
                            {msg.role === "user" && (
                                <div className="shrink-0 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center mb-0.5">
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 6a5 5 0 0 1 10 0H3Z" fill="currentColor" className="text-muted-foreground" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                        <div className="flex items-end gap-3 justify-start">
                            <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-border">
                                {person.image ? (
                                    <Image
                                        width={80}
                                        height={80}
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-xs font-semibold text-primary">
                                            {person.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div
                                className="bg-surface border border-border rounded-t-xl rounded-br-xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5"
                                style={{ boxShadow: "var(--shadow-sm)" }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Input bar */}
            <ChatInput
                value={input}
                onChange={setInput}
                onSend={sendMessage}
                loading={loading}
                placeholder={`Ask ${person.name} something...`}
            />

            <p className="text-center text-[11px] text-muted-foreground max-w-3xl mx-auto px-3">
                Only questions about {person.name} life, career, and achievements will be answered.
            </p>
        </div>
    );
}