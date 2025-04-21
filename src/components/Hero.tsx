"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const testimonials: string[] = [
    "“Inventory Tracker saved us hours every week.”",
    "“Our stock accuracy improved instantly.”",
    "“I wish we started using it sooner.”",
    "“Simple, fast, and reliable — 10/10.”",
    "“Tracking categories is so easy now.”",
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll indicator
        const handleScroll = () => {
            const indicator = document.getElementById('scrollIndicator');
            if (!indicator) return;
            indicator.style.opacity = window.scrollY > 50 ? '0' : '1';
        };

        window.addEventListener('scroll', handleScroll);

        // Auto-scrolling testimonials
        const container = containerRef.current;
        if (!container) return;

        let scrollAmount = 0;
        let isHovered = false;

        const scroll = () => {
            if (isHovered) return;
            scrollAmount += 1;
            if (container) {
                container.scrollLeft = scrollAmount;
                if (scrollAmount >= container.scrollWidth / 2) {
                    scrollAmount = 0;
                }
            }
        };

        const handleMouseEnter = () => (isHovered = true);
        const handleMouseLeave = () => (isHovered = false);

        container?.addEventListener('mouseenter', handleMouseEnter);
        container?.addEventListener('mouseleave', handleMouseLeave);

        const interval = setInterval(scroll, 20);

        // Cleanup both
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
            container?.removeEventListener('mouseenter', handleMouseEnter);
            container?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);


    return (
        <section className="relative h-screen bg-white dark:bg-gray-900 pt-40 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-purple-300 dark:bg-purple-800 opacity-20 rounded-full blur-3xl animate-parallax z-0"></div>
            <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] bg-blue-200 dark:bg-blue-700 opacity-20 rounded-full blur-2xl animate-parallax-slower z-0"></div>
            <div
                className="absolute z-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob 
    bg-blue-300 dark:bg-blue-800 bottom-[-100px] right-[-100px]"
            />
            <div
                className="absolute z-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob
    bg-purple-300 dark:bg-purple-800"
            />

            <div className="container mx-auto px-6 lg:px-20 text-center relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
                >
                    Simplify Your Inventory Management
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-6 text-lg font-normal text-gray-600 lg:text-xl dark:text-gray-300"
                >
                    Designed for small to large shop owners, our platform helps you track stock levels, manage categories, and stay on top of sales trends.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-8 flex justify-center space-x-4"
                >
                    <Link
                        href="#features"
                        className="transition-all delay-75 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800"
                    >
                        Explore Features
                    </Link>
                    <Link
                        href="#pricing"
                        className="transition-all px-6 py-3 text-blue-800 border border-blue-800 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800 dark:focus:ring-blue-800 delay-200"
                    >
                        View Pricing
                    </Link>

                </motion.div>
            </div>

            {/* Testimonials & scroll arrow stay the same */}
            <div className="relative mt-12 overflow-hidden">
                {/* fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white dark:from-[#0f172a] to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white dark:from-[#0f172a] to-transparent z-10" />

                {/* scrolling container */}
                <div
                    ref={containerRef}
                    className="whitespace-nowrap overflow-hidden flex gap-12 text-gray-400 text-sm px-12"
                >
                    {/* duplicated testimonials to loop smoothly */}
                    {[...testimonials, ...testimonials].map((text, index) => (
                        <div key={index} className="shrink-0">
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            <div
                id="scrollIndicator"
                className="absolute left-0 right-0 bottom-4 mx-auto flex justify-center transition-opacity duration-300 opacity-100"
            >
                <div className="animate-bounce text-gray-600 text-sm">
                    <span>Scroll to Learn More</span>
                    <div className="flex justify-center mt-1">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>

    );
}