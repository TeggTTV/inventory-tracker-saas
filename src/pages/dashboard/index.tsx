// File: app/dashboard/page.jsx
import '@/app/globals.css';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from '@/components/Chart';
import { exportToCSV } from '@/lib/utils';
import { Home, Eye, Plus, FileText, Settings, LogOut, Package, Edit2, Trash2 } from 'lucide-react';

// Inventory item type
type InventoryItem = { name: string; quantity: number; category: string; };

const week = [
    { name: 'Monday', items: 10 },
    { name: 'Tuesday', items: 20 },
    { name: 'Wednesday', items: 15 },
    { name: 'Thursday', items: 25 },
    { name: 'Friday', items: 30 },
    { name: 'Saturday', items: 5 },
    { name: 'Sunday', items: 12 },
];

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
};
const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};
const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
};

export default function Dashboard() {
    const [activePage, setActivePage] = useState('home');
    const [filter, setFilter] = useState('');
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [newName, setNewName] = useState('');
    const [newQuantity, setNewQuantity] = useState<number>(0);
    const [newCategory, setNewCategory] = useState('');

    // Load items from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('inventoryItems');
        if (stored) setItems(JSON.parse(stored));
    }, []);
    // Save items to localStorage
    useEffect(() => {
        localStorage.setItem('inventoryItems', JSON.stringify(items));
    }, [items]);

    // Sidebar groups configuration
    const sidebarGroups = [
        { id: 'home', title: 'Home', icon: Home },
        {
            id: 'inventory', title: 'Inventory', icon: Package, items: [
                { key: 'view', label: 'View Items', icon: Eye },
                { key: 'add', label: 'Add Item', icon: Plus }
            ]
        },
        { id: 'reports', title: 'Reports', icon: FileText, items: [{ key: 'overview', label: 'Overview', icon: FileText }] },
        { id: 'settings', title: 'Settings', icon: Settings },
        { id: 'logs', title: 'Logs', icon: LogOut }
    ];

    const categories = ['Electronics', 'Furniture', 'Office', 'Food', 'Other'];

    const handleExport = () => {
        exportToCSV(items, 'inventory_report.csv');
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <NextThemesProvider defaultTheme='system' attribute='class'>
            <Navbar relative={true} />
            <div className="relative overflow-hidden flex min-h-screen bg-white dark:bg-gray-900">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animate-blob-delay pointer-events-none" />
                <Sidebar
                    activePage={activePage}
                    setActivePage={setActivePage}
                    groups={sidebarGroups}
                />
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        {activePage === 'home' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-900 dark:text-white">
                                <h1 className="text-2xl font-bold mb-4">Welcome Back 👋</h1>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">Here’s a snapshot of your inventory today.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <motion.div className="p-4 rounded-xl shadow bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                        <h2 className="text-sm text-gray-500 dark:text-gray-400">Total Items</h2>
                                        <p className="text-2xl font-semibold">1,234</p>
                                    </motion.div>
                                </div>
                                <div className="mt-6">
                                    <Chart data={week} />
                                </div>
                            </motion.div>
                        )}
                        {activePage === 'view' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-semibold mb-4 dark:text-white">View Inventory</h2>
                                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={filter}
                                        onChange={e => setFilter(e.target.value)}
                                        className="p-2 rounded-md w-full sm:w-1/3 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                                    />
                                    <button
                                        onClick={() => setFilter('')}
                                        className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-md"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="overflow-x-auto rounded-lg shadow bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Quantity</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Category</th>
                                                <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {filteredItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className="even:bg-gray-100 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800"
                                                >
                                                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{item.name}</td>
                                                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{item.category}</td>
                                                    <td className="px-4 py-3 text-center space-x-2">
                                                        <motion.button
                                                            variants={buttonVariants}
                                                            whileHover="hover"
                                                            whileTap="tap"
                                                            onClick={() => {/* TODO: handle edit */}}
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm rounded-md"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                            Edit
                                                        </motion.button>
                                                        <motion.button
                                                            variants={buttonVariants}
                                                            whileHover="hover"
                                                            whileTap="tap"
                                                            onClick={() => setItems(items.filter((_, i) => i !== index))}
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </motion.button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                        {activePage === 'add' && (
                            <motion.div
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                className="max-w-md mx-auto w-full p-6 rounded-lg shadow-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20"
                            >
                                <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                                    Add New Item
                                </h2>

                                {/* 2) swap <form> → <motion.form> so it picks up the stagger */}
                                <motion.form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        const newItem: InventoryItem = { name: newName, quantity: newQuantity, category: newCategory };
                                        setItems([...items, newItem]);
                                        setNewName(''); setNewQuantity(0); setNewCategory('');
                                    }}
                                    variants={formVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-5"
                                >
                                    {/* 3) wrap each field in a motion.div */}
                                    <motion.div variants={fieldVariants}>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Item Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={newName}
                                            onChange={e => setNewName(e.target.value)}
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                                        />
                                    </motion.div>

                                    <motion.div variants={fieldVariants}>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Quantity
                                        </label>
                                        <input
                                            id="quantity"
                                            type="number"
                                            value={newQuantity}
                                            onChange={e => setNewQuantity(parseInt(e.target.value) || 0)}
                                            min={0}
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                                        />
                                    </motion.div>

                                    <motion.div variants={fieldVariants}>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            value={newCategory}
                                            onChange={e => setNewCategory(e.target.value)}
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="">Select a category</option>
                                            {['Electronics', 'Furniture', 'Office', 'Food', 'Other'].map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </motion.div>

                                    {/* 4) make the button animate on hover/tap */}
                                    <motion.button
                                        type="submit"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="cursor-pointer w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-md"
                                    >
                                        Add Item
                                    </motion.button>
                                </motion.form>
                            </motion.div>
                        )}
                        {activePage === 'overview' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-lg shadow bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
                                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Reports</h2>
                                <Chart data={week} />
                                <button onClick={handleExport} className="mt-6 bg-primary-600 text-white px-4 py-2 rounded-md">Export CSV</button>
                            </motion.div>
                        )}
                        {activePage === 'settings' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Settings</h2>
                                <p className="dark:text-white">Manage user preferences and themes.</p>
                            </motion.div>
                        )}
                        {activePage === 'logs' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Logs</h2>
                                <p className="dark:text-white">View system and inventory change logs.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </main>
            </div>
        </NextThemesProvider>
    );
}
