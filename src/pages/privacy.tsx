import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function PrivacyPage() {
    return (
        <NextThemesProvider defaultTheme="system" attribute="class">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 pt-32 px-6 md:px-16 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-extrabold text-center mb-6 text-gray-900 dark:text-white"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert"
                    >
                        <p>Last updated: April 21, 2025</p>
                        <p>We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.</p>
                        <h2>1. Information We Collect</h2>
                        <p>We may collect personal information you provide when you register, subscribe, or contact us, including name, email, and usage data.</p>
                        <h2>2. How We Use Your Information</h2>
                        <p>Your data is used to deliver our services, communicate updates, and improve your experience. We do not sell your information to third parties.</p>
                        <h2>3. Data Security</h2>
                        <p>We implement industry-standard security measures to protect your information. However, no method of transmission is completely secure.</p>
                        <h2>4. Your Rights</h2>
                        <p>You may access, update, or delete your personal data at any time by contacting us.</p>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </NextThemesProvider>
    );
}