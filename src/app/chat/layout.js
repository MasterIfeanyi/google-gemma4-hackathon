"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image"
import Link from "next/link"
import { FiClock } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";

// Generates a short unique session ID
const generateSessionId = () => Math.random().toString(36).substring(2, 10);

export default function ChatLayout({ children }) {
    const router = useRouter();
    const { id } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleNewChat = () => {
        if (!id) return;
        const newSessionId = generateSessionId();
        // Navigate to the same celebrity but with a fresh session ID
        // This creates a brand new conversation with its own identity
        router.push(`/chat/${id}?session=${newSessionId}`);
        setSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden">

            {/* Mobile overlay -- tap outside to close */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    flex flex-col items-center justify-between w-14 h-full bg-surface border-r border-border py-4 shrink-0
                    fixed z-30 top-0 left-0 transition-transform duration-200
                    md:relative md:translate-x-0
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
                style={{ boxShadow: "var(--shadow-sm)" }}
            >
                {/* Top section */}
                <div className="flex flex-col items-center gap-3">

                    {/* Buddy logo mark */}
                    <Link href="/dashboard">
                        <Image
                            src="/images/cache.png"
                            alt="Buddy"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                        />
                    </Link>

                    <span className="w-6 h-px bg-border" />

                    {/* New chat */}
                    <SidebarButton
                        title="New chat"
                        onClick={handleNewChat}
                        icon={
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        }
                    />

                    {/* History */}
                    <SidebarButton
                        title="Chat history"
                        onClick={() => router.push(`/chat/${id}/history`)}
                        icon={
                            <FiClock size={16} />
                        }
                    />
                </div>

                {/* Bottom — user avatar */}
                <div className="flex flex-col items-center gap-3">
                    <span className="w-6 h-px bg-border" />
                    <div
                        title="Account"
                        className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center cursor-pointer hover:border-primary transition"
                    >
                        <FaUser size={14} />
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-hidden">
                {/* Mobile-only toggle -- invisible on desktop */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border border-border bg-surface text-muted-foreground hover:text-foreground transition"
                >
                    {sidebarOpen
                        ? <PanelLeftClose size={14} />
                        : <PanelLeftOpen size={14} />
                    }
                </button>
                {children}
            </main>

        </div>
    );
}

function SidebarButton({ icon, title, onClick, active }) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={`w-9 h-9 rounded-sm flex items-center justify-center transition cursor-pointer
        ${active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                }`}
        >
            {icon}
        </button>
    );
}