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

    const plans = [
        {
            title: "Starter",
            price: "$0",
            period: "/month",
            features: [
                "Integration with 3rd party services",
                "No credit card required",
                "Free forever plan"
            ],
            button: "Get started"
        },
        {
            title: "Company",
            price: "$79",
            period: "/month",
            features: [
                "Advanced analytics",
                "Priority support",
                "Up to 10 projects",
                "Collaboration tools"
            ],
            button: "Get started",
            popular: true
        },
        {
            title: "Enterprise",
            price: "$149",
            period: "/month",
            features: [
                "Unlimited projects",
                "Custom integrations",
                "Dedicated support",
                "24/7 service"
            ],
            button: "Contact us"
        }
    ];

    return (
        <NextThemesProvider defaultTheme='system' attribute='class'>
            <Navbar />
            <main className="pt-32 px-6 md:px-16 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white"
                >
                    Flexible Pricing for All Teams
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-gray-600 dark:text-gray-300 mb-16 text-lg"
                >
                    Pick a plan that fits your needs. Upgrade or downgrade anytime.
                </motion.p>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-6 rounded-2xl border shadow-md dark:shadow-none transition hover:scale-[1.02] ${plan.popular
                                ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-gray-800'
                                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute top-4 right-4 text-xs text-blue-600 dark:text-blue-400 font-medium">
                                    Most Popular
                                </span>
                            )}
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                {plan.title}
                            </h3>
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                                {plan.price}
                                <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                                    {plan.period}
                                </span>
                            </p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                                {plan.features.map((f, i) => (
                                    <li key={i}>✓ {f}</li>
                                ))}
                            </ul>
                            <button className="w-full text-white bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg dark:bg-blue-500 dark:hover:bg-blue-600">
                                {plan.button}
                            </button>
                        </motion.div>
                    ))}
                </section>
            </main>
            <Footer />
        </NextThemesProvider>

    );
}
