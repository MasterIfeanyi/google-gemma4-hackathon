"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

const navLinks = [
    { label: "Stories", href: "/story" },
    { label: "Generate Story", href: "/generate" },
    { label: "Summarizer", href: "/summarize" },
];

function getLinkClass(isActive) {
    if (isActive) return "text-brand";
    return "text-foreground/70 hover:text-foreground";
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-background backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex gap-1 items-center">
                        {/* <Image
                            src="/images/pix.png"
                            alt="Story Logo"
                            width={40}
                            height={40}
                        /> */}
                        <span className="text-lg font-bold tracking-tight text-foreground">
                            Buddy<span className="text-primary">.</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 ml-auto">
                        {/* {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-semibold transition-colors ${getLinkClass(isActive)}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })} */}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        {/* <div className="flex flex-col gap-4">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors ${getLinkClass(isActive)}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div> */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border mt-2">
                            <ThemeToggle />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}