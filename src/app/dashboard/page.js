"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { celebrities } from "@/data/celebrities";
import NavbarLayout from "@/components/NavbarLayout";
import Image from "next/image";

const categories = ["All", "Billionaire", "Artist", "Historical", "Athlete", "Innovator", "Celebrity"];

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [customName, setCustomName] = useState("");
    const router = useRouter();

    const filtered = celebrities.filter((c) => {
        return selectedCategory === "All" || c.category === selectedCategory;
    });

    const handleSelect = (id) => {
        router.push(`/chat/${id}`);
    };

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        if (!customName.trim()) return;
        const id = customName.trim().toLowerCase().replace(/\s+/g, "-");
        router.push(`/chat/${id}?name=${encodeURIComponent(customName.trim())}`);
    };

    return (

        <NavbarLayout>
            <main className="min-h-screen bg-background text-foreground">

                <div className="max-w-6xl mx-auto px-6 py-14">

                    {/* Page Header */}
                    <div className="mb-10">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                            Who do you want to speak with?
                        </p>
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-3">
                            Select Your Figure
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
                            Choose anyone below to begin a conversation. The AI will assume their personality and only answer questions relevant to their life, work, and achievements.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 mb-8 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-widest border transition-all duration-150 cursor-pointer ${selectedCategory === cat
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-surface text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Fighter Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-14">
                        {filtered.map((celebrity) => (
                            <div
                                key={celebrity.id}
                                onClick={() => handleSelect(celebrity.id)}
                                className="group cursor-pointer relative overflow-hidden rounded-sm border border-border bg-surface hover:border-primary/60 hover:shadow-md transition-all duration-200"
                                style={{ boxShadow: "var(--shadow-sm)" }}
                            >
                                {/* Portrait */}
                                <div className="aspect-square w-full overflow-hidden bg-muted">
                                    <Image
                                        fill
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                        src={celebrity.image}
                                        alt={celebrity.name}
                                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                                    />
                                </div>

                                {/* Name overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-3">
                                    <p className="text-white text-xs font-semibold leading-tight truncate">
                                        {celebrity.name}
                                    </p>
                                    <p className="text-white/50 text-[10px] uppercase tracking-wider mt-0.5">
                                        {celebrity.category}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border mb-10" />

                    {/* Custom Name Input */}
                    <div className="max-w-lg">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-medium">
                            Do not see who you are looking for?
                        </p>
                        <p className="text-sm text-muted-foreground mb-5">
                            Type any name below — a historical figure, billionaire, athlete, or public figure — and start a conversation.
                        </p>
                        <form onSubmit={handleCustomSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                placeholder="e.g. Nikola Tesla, Cristiano Ronaldo..."
                                className="flex-1 bg-input border border-border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-sm hover:opacity-90 transition cursor-pointer"
                            >
                                Start Chat
                            </button>
                        </form>
                    </div>

                </div>
            </main>

            <footer className="bottom-0 flex justify-center items-center w-full h-10 bg-surface/80 text-xs text-muted-foreground">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Powered by Gemma 4
                </span>
            </footer>
        </NavbarLayout>
    );
}