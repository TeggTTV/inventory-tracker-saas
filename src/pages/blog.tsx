import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const posts = [
    { title: 'How to Optimize Your Inventory', excerpt: 'Learn strategies to keep your stock levels balanced...', href: '#' },
    { title: 'Top 10 Warehouse Management Tips', excerpt: 'Best practices to streamline your warehouse operations...', href: '#' },
    { title: 'Using Data Insights Effectively', excerpt: 'Turn raw data into actionable inventory decisions...', href: '#' },
];

export default function BlogPage() {
    return (
        <NextThemesProvider defaultTheme="system" attribute="class">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 pt-32 px-6 md:px-16 max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white"
                    >
                        Blog
                    </motion.h1>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, idx) => (
                            <motion.a
                                key={idx}
                                href={post.href}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                viewport={{ once: true }}
                                className="block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:scale-[1.03] transition-transform"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{post.excerpt}</p>
                            </motion.a>
                        ))}
                    </section>
                </main>
                <Footer />
            </div>
        </NextThemesProvider>
    );
}