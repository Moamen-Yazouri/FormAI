"use client";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Loader2, Menu, User} from "lucide-react";
import React, {useContext, useState} from "react";
import {Button} from "../ui/button";
import Link from "next/link";
import {redirect} from "next/navigation";
import {motion} from "framer-motion";
import { AuthContext } from "@/providers/auth/authProvider";


const Header = () => {
    const {user, setUser, isLoading} = useContext(AuthContext);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleLogout = async () => {
        setUser(null);
        await fetch("api/auth/logout", {method: "POST"});
        redirect("/sign-in");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm backdrop-blur-md">
            <div className="w-full max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-3">
                        <motion.img src="/logo.png" alt="FormAI Logo" className="w-[50px] h-[50px] rounded-full border-2 border-purple-500 shadow-md"
                            whileHover={
                                {
                                    scale: 1.1,
                                    rotate: 5
                                }
                            }
                            transition={
                                {
                                    type: "spring",
                                    stiffness: 200
                                }
                            }/>
                        <motion.span className="text-2xl font-extrabold text-purple-600 tracking-tight"
                            initial={
                                {
                                    opacity: 0,
                                    x: -10
                                }
                            }
                            animate={
                                {
                                    opacity: 1,
                                    x: 0
                                }
                            }
                            transition={
                                {
                                    delay: 0.2
                                }
                        }>
                            FormAI
                        </motion.span>
                    </Link>
                </div>

                {/* Center: Nav Links (Desktop) */}
                <nav className="hidden md:flex gap-6">
                    <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                        How It Works
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                        Pricing
                    </Link>
                </nav>

                {/* Right: Auth + Button */}
                <div className="flex items-center gap-4">
                    {
                    user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <User className="h-4 w-4"/> {
                                    user.email
                                } </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                            {
                                isLoading ? (
                                    <Loader2 className="animate-spin text-purple-600"/>
                                )
                                : "login"
                            }
                        </Link>
                    )
                }
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <Button variant="ghost" size="icon" className="md:hidden"
                    onClick={
                        () => setMobileOpen(!mobileOpen)
                }>
                    <Menu className="h-6 w-6 text-purple-500"/>
                </Button>
            </div>

            {/* Mobile Nav (conditionally rendered) */}
            {
            mobileOpen && (
                <div className="md:hidden px-6 pb-4 space-y-2 bg-white border-t">
                    <Link href="#features" className="block text-sm font-medium text-gray-700 hover:text-purple-600">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="block text-sm font-medium text-gray-700 hover:text-purple-600">
                        How It Works
                    </Link>
                    <Link href="#pricing" className="block text-sm font-medium text-gray-700 hover:text-purple-600">
                        Pricing
                    </Link>
                </div>
            )
        } </header>
    );
};

export default Header;
