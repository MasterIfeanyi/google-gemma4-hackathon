"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { celebrities } from "@/data/celebrities.js"
import Image from "next/image";
import CarouselCard from "@/components/CarouselCard";
import NavbarLayout from "@/components/NavbarLayout";

// const people = [
//   {
//     name: "Elon Musk",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
//   },
//   {
//     name: "Oprah Winfrey",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Oprah_in_2014.jpg/440px-Oprah_in_2014.jpg",
//   },
//   {
//     name: "Steve Jobs",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/440px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
//   },
//   {
//     name: "Beyoncé",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonce_at_The_Fashion_Awards_2016_%28cropped%29.png/440px-Beyonce_at_The_Fashion_Awards_2016_%28cropped%29.png",
//   },
//   {
//     name: "Albert Einstein",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg",
//   },
//   {
//     name: "Bill Gates",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bill_Gates_2018.jpg/440px-Bill_Gates_2018.jpg",
//   },
//   {
//     name: "Nelson Mandela",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/440px-Nelson_Mandela_1994.jpg",
//   },
//   {
//     name: "Rihanna",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_Fenty_2018.png/440px-Rihanna_Fenty_2018.png",
//   },
//   {
//     name: "Warren Buffett",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/440px-Warren_Buffett_KU_Visit.jpg",
//   },
//   {
//     name: "Michael Jordan",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jordan_in_2014.jpg/440px-Michael_Jordan_in_2014.jpg",
//   },
//   {
//     name: "Steve Harvey",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Steve_Harvey_2019_by_Glenn_Francis.jpg/440px-Steve_Harvey_2019_by_Glenn_Francis.jpg",
//   },
//   {
//     name: "Angela Merkel",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Angela_Merkel_Security_Conference_2013.jpg/440px-Angela_Merkel_Security_Conference_2013.jpg",
//   },
// ];

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
                    <div className="flex items-center gap-3 mb-20">
                        <Button
                            variant="primary"
                            size="medium"
                            className="rounded-sm border border-primary"
                            onClick={() => router.push("/dashboard")}
                        >
                            Start a conversation
                        </Button>
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
                        <svg
                            className="w-4 h-4 mt-0.5 shrink-0 text-primary"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-2.5a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 8 5.5Zm0-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                        </svg>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="font-semibold text-foreground">AI Disclaimer. </span>
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