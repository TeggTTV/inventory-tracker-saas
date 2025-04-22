import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function FAQPage() {
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
                        Frequently Asked Questions
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">What is this inventory tracker?</h2>
                            <p className="text-gray-700 dark:text-gray-300">This tool helps you manage your stock, suppliers, locations, and track expirations in an intuitive dashboard.</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">How do I import or export data?</h2>
                            <p className="text-gray-700 dark:text-gray-300">Use the CSV Import/Export buttons on the View Inventory page to upload or download your inventory data.</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Can I scan barcodes?</h2>
                            <p className="text-gray-700 dark:text-gray-300">Yes. Click the Scan Barcode button in the Add Item form to use the integrated scanner (placeholder function for now).</p>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </NextThemesProvider>
    );
}