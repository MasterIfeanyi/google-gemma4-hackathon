"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-background backdrop-blur-md border-b border-border px-8 py-1 flex items-center justify-between">
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
                        <ThemeToggle />
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeToggle />

                        <button
                            className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {/* {mobileMenuOpen && (
                    <div className="md:hidden py-4">
                        <div className="flex items-center gap-3 pt-4">
                            <ThemeToggle />
                        </div>
                    </div>
                )} */}
            </div>
        </nav>
    );
}