import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function TermsPage() {
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
                        Terms of Service
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert"
                    >
                        <p>Last updated: April 21, 2025</p>
                        <p>Welcome to our inventory tracking service. These Terms of Service govern your use of our platform. By accessing or using the Service, you agree to these terms.</p>
                        <h2>1. Use of Service</h2>
                        <p>You must follow any policies made available to you within the Service.</p>
                        <h2>2. User Accounts</h2>
                        <p>You are responsible for safeguarding your account credentials.</p>
                        <h2>3. Termination</h2>
                        <p>We may suspend or terminate your access if you violate these Terms.</p>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </NextThemesProvider>
    );
}