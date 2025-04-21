'use client';

import '@/app/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function FeaturesPage() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;


    return (
        <NextThemesProvider defaultTheme='system' attribute='class'>
            <Navbar />
            <main className="pt-32 px-6 md:px-16 max-w-3xl mx-auto">
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
                    Have questions? Send us a message and we’ll get back to you within 24 hours.
                </motion.p>

                <form className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-800 dark:text-white">Name</label>
                        <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-800 dark:text-white">Email</label>
                        <input type="email" placeholder="you@example.com" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-800 dark:text-white">Message</label>
                        <textarea rows={5} placeholder="Your message..." className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded-lg transition"
                    >
                        Send Message
                    </motion.button>
                </form>
            </main>
            <Footer />
        </NextThemesProvider>

    );
}
