import '@/app/globals.css';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import Chart from '@/components/Chart';
import { useState, useEffect } from 'react';
import { sidebarGroups } from '@/lib/sidebarConfig';
import { AlertTriangle, X } from 'lucide-react';

interface InventoryItem { name: string; quantity: number; category: string; expirationDate?: string; }

const week = [
    { name: 'Monday', items: 10 },
    { name: 'Tuesday', items: 20 },
    { name: 'Wednesday', items: 15 },
    { name: 'Thursday', items: 25 },
    { name: 'Friday', items: 30 },
    { name: 'Saturday', items: 5 },
    { name: 'Sunday', items: 12 },
];

export default function Dashboard() {
    const [itemCount, setItemCount] = useState(0);
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [showExpiring, setShowExpiring] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('inventoryItems');
        if (stored) {
            const parsed: InventoryItem[] = JSON.parse(stored);
            setItems(parsed);
            setItemCount(parsed.length);
        }
    }, []);

    const lowExpiry = items.filter(it => {
        if (!it.expirationDate) return false;
        const exp = new Date(it.expirationDate);
        const diff = (exp.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff < 7;
    });

    return (
        <NextThemesProvider defaultTheme='system' attribute='class'>
            <Navbar relative={true} />
            <div className="relative overflow-hidden flex min-h-screen bg-white dark:bg-gray-900">
                {/* background blobs */}
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animate-blob-delay pointer-events-none" />

                <Sidebar activePage="home" setActivePage={() => {}} groups={sidebarGroups} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <motion.div className="text-gray-900 dark:text-white">
                            <h1 className="text-2xl font-bold mb-4">Welcome Back 👋</h1>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">Here&apos;s a snapshot of your inventory today.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <motion.div className="p-4 rounded-xl shadow bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                    <h2 className="text-sm text-gray-500 dark:text-gray-400">Total Items</h2>
                                    <p className="text-2xl font-semibold">{itemCount}</p>
                                </motion.div>
                                <motion.div onClick={() => setShowExpiring(true)} className="p-4 rounded-xl shadow cursor-pointer bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 flex flex-col justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <h2 className="text-sm text-gray-500 dark:text-gray-400">Expiring Soon</h2>
                                    <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{lowExpiry.length}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Click to view</p>
                                </motion.div>
                            </div>
                            {/* Expiration alert banner */}
                            {lowExpiry.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-800/30 backdrop-blur-md border border-red-200 dark:border-red-700 flex items-center gap-3">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                    <p className="text-red-700 dark:text-red-200 text-sm">
                                        {lowExpiry.map(i => i.name).join(', ')} {lowExpiry.length > 1 ? 'are' : 'is'} expiring in less than 7 days.
                                    </p>
                                </motion.div>
                            )}
                            <Chart data={week} />
                        </motion.div>
                    </motion.div>
                </main>
            </div>
            {/* modal for expiring items */}
            {showExpiring && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto backdrop-blur-md border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold dark:text-white">Items Expiring Soon</h3>
                            <button onClick={() => setShowExpiring(false)} className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <ul className="space-y-2">
                            {lowExpiry.length === 0 && (
                                <li className="text-gray-500 dark:text-gray-400">No items expiring soon</li>   
                            )}
                            {lowExpiry.map((it, idx) => (
                                <li key={idx} className="flex justify-between text-gray-800 dark:text-gray-100">
                                    <span>{it.name}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{it.expirationDate}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </NextThemesProvider>
    );
}
