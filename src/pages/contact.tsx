'use client';

import '@/app/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { User, Mail, MessageSquare } from 'lucide-react';

import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function ContactPage() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;


    return (
        <NextThemesProvider defaultTheme='system' attribute='class'>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 pt-32 px-6 md:px-16 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg"
                    >
                        Have questions? Send us a message and we&apos;ll get back to you within 24 hours.
                    </motion.p>

                    <form className="space-y-6">
                        {/* Name input with icon */}
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        {/* Email input with icon */}
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        {/* Message textarea with icon */}
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 text-gray-400" />
                            <textarea
                                rows={5}
                                placeholder="Your message..."
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full whitespace-nowrap px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </main>
                <Footer />
            </div>
        </NextThemesProvider>

    );
}
