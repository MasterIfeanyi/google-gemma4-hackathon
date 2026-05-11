"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { celebrities } from "@/data/celebrities.js"
import Link from "next/link";
import CarouselCard from "@/components/CarouselCard";
import NavbarLayout from "@/components/NavbarLayout";
import { FaInfoCircle } from "react-icons/fa";



// Duplicate for seamless infinite loop
const doubled = [...celebrities, ...celebrities, ...celebrities];

export default function LandingPage() {
    const router = useRouter();

    return (
        <NavbarLayout>

            <main className="min-h-screen bg-background text-foreground flex flex-col">

                {/* Hero */}
                <section className="flex flex-col items-center text-center px-6 pt-24 pb-0">

                    {/* Eyebrow pill */}
                    <div className="mb-8 inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full">
                        Powered by Gemma 4
                    </div>

                    {/* Title */}
                    <h1
                        className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight text-foreground mb-5"
                        style={{ fontFamily: "'Segoe UI Variable', 'Segoe UI', sans-serif", letterSpacing: "-0.03em" }}
                    >
                        Talk to your{" "}
                        <span className="text-primary">Buddy</span>{" "}
                        today.
                    </h1>

                    {/* Subheading */}
                    <p className="text-base text-muted-foreground font-light max-w-md leading-relaxed mb-10">
                        Have real conversations with the worlds most iconic figures, leaders,
                        legends, and visionaries powered by AI that knows them inside out.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center mb-20">
                        <Link
                            href="/dashboard"
                            className="rounded-sm border border-primary px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary hover:text-brand transition-colors"
                        >
                            Start a conversation
                        </Link>
                    </div>
                </section>

                {/* Carousel */}
                <div className="relative w-full flex justify-center py-4">
                    <div className="relative w-full max-w-2xl overflow-hidden">

                        {/* Fade masks - now using currentColor so they respect the theme */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                            style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
                        />
                        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                            style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
                        />

                        <div
                            className="flex gap-5 w-max"
                            style={{ animation: "buddyScroll 40s linear infinite" }}
                        >
                            {doubled.map((person, i) => (
                                <CarouselCard key={`a-${i}`} person={person} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Disclaimer */}
                <div className="flex justify-center px-6 mt-10 mb-16">
                    <div className="flex items-start gap-3 max-w-xl w-full border border-primary/30 bg-primary/5 rounded-sm px-5 py-4">
                        <FaInfoCircle className="w-4 h-4 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="font-semibold text-foreground">Disclaimer. </span>
                            Buddy simulates conversations based on publicly available information.
                            Responses are AI-generated and do not represent the actual views,
                            opinions, or statements of any individual, living or deceased.
                        </p>
                    </div>
                </div>

                {/* Keyframe injection */}
                <style>{`
                    @keyframes buddyScroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-33.333%);  }
                    }
                `}</style>

            </main>
        </NavbarLayout>
    );
}