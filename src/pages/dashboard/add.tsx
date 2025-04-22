import '@/app/globals.css';
import { useState, useEffect, FormEvent } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { sidebarGroups } from '@/lib/sidebarConfig';
import { useBarcode } from '@/lib/useBarcode';
import { Barcode } from 'lucide-react';

interface InventoryItem { name: string; quantity: number; category: string; expirationDate?: string; }
const categories = ['Electronics', 'Furniture', 'Office', 'Food', 'Other'];

const formVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
const fieldVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };
const buttonVariants = { hover: { scale: 1.05, transition: { duration: 0.2 } }, tap: { scale: 0.95 } };

export default function AddItemPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [name, setName] = useState('');
    const { scan } = useBarcode();
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('inventoryItems');
        if (stored) setItems(JSON.parse(stored));
    }, []);
    useEffect(() => {
        localStorage.setItem('inventoryItems', JSON.stringify(items));
    }, [items]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setItems([...items, { name, quantity, category, expirationDate }]);
        setName(''); setQuantity(0); setCategory(''); setExpirationDate('');
    };

    return (
        <NextThemesProvider defaultTheme="system" attribute="class">
            <Navbar relative />
            <div className="relative flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animate-blob-delay pointer-events-none" />
                <Sidebar activePage="add" setActivePage={() => { }} groups={sidebarGroups} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div variants={formVariants} initial="hidden" animate="visible" className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
                        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add New Item</h2>
                        <motion.form onSubmit={handleSubmit} className="space-y-5">
                            <motion.div variants={fieldVariants}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Item Name</label>
                                <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500" />
                                <motion.button type="button" onClick={scan} variants={buttonVariants} whileHover="hover" whileTap="tap" className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md">
                                    <Barcode className="w-4 h-4" /> Scan Barcode
                                </motion.button>
                            </motion.div>
                            <motion.div variants={fieldVariants}>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Quantity</label>
                                <input id="quantity" type="number" required min={0} value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 0)} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500" />
                            </motion.div>
                            <motion.div variants={fieldVariants}>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Category</label>
                                <select id="category" required value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500">
                                    <option value="">Select a category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </motion.div>
                            <motion.div variants={fieldVariants}>
                                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Expiration Date</label>
                                <input id="expirationDate" type="date" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500" />
                            </motion.div>
                            <motion.button type="submit" variants={buttonVariants} whileHover="hover" whileTap="tap" className="cursor-pointer w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md">Add Item</motion.button>
                        </motion.form>
                    </motion.div>
                </main>
            </div>
        </NextThemesProvider>
    );
}