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
            <main className="pt-32 px-6 md:px-16 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white"
                >
                    Features That Make a Difference
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center text-lg text-gray-700 dark:text-gray-300 mb-16"
                >
                    Everything you need to manage your inventory with ease and clarity.
                </motion.p>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Real-Time Alerts",
                            desc: "Instant notifications for stock changes, expiration, and more.",
                            icon: "⚡️"
                        },
                        {
                            title: "Smart Organization",
                            desc: "Group items by category, batch, or priority.",
                            icon: "📦"
                        },
                        {
                            title: "Analytics Dashboard",
                            desc: "Understand trends and sales with simple data visuals.",
                            icon: "📊"
                        },
                        {
                            title: "CSV Integration",
                            desc: "Import/export inventory easily using CSV files.",
                            icon: "🗂️"
                        },
                        {
                            title: "Multi-Device Sync",
                            desc: "Access your inventory from phone, tablet, or desktop.",
                            icon: "📱"
                        },
                        {
                            title: "User Permissions",
                            desc: "Control who can see and edit inventory.",
                            icon: "🔒"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-transform"
                        >
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
                        </motion.div>
                    ))}
                </section>
            </main>
            <Footer />
        </NextThemesProvider>

    );
}
