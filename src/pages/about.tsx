import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function AboutPage() {
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
                        About Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-700 dark:text-gray-300 mb-8"
                    >
                        We are committed to providing the best inventory tracking solution to businesses of all sizes. Our mission is to streamline your operations and give you the insights you need to succeed.
                    </motion.p>
                </main>
                <Footer />
            </div>
        </NextThemesProvider>
    );
}
