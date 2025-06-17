"use client";

import Link from "next/link";
import { MemoizedFooterLogo } from "./footerLogo";
import { MemoizedFooterSocial } from "./footerSocial";
import { MemoizedFooterCard } from "./footerCard";
import { MemoizedBackgroundColors } from "./backgroundColors";


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className="w-full relative overflow-hidden">
            <MemoizedBackgroundColors />

            <div className="w-full max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                    <MemoizedFooterLogo/>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        <div className="flex gap-6 text-xs text-slate-400">
                            {
                            ["Terms", "Privacy", "Contact"].map((item) => (
                                <Link key={item}
                                    href="#"
                                    className="hover:text-cyan-300 hover:underline transition-all duration-200">
                                    {item} </Link>
                            ))
                        } </div>
                        <MemoizedFooterSocial/>
                    </div>
                </div>

                <MemoizedFooterCard/>

                <div className="mt-10 text-center text-xs text-slate-500">
                    © {currentYear}
                    FormAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
