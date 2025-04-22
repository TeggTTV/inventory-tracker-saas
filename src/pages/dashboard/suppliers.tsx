import '@/app/globals.css';

import { useState, useEffect, FormEvent } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { sidebarGroups } from '@/lib/sidebarConfig';

interface Supplier { name: string; contact: string; phone: string; email: string; }

const formVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
const fieldVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };
const buttonVariants = { hover: { scale: 1.05, transition: { duration: 0.2 } }, tap: { scale: 0.95 } };

export default function SuppliersDashboard() {
    const [activePage, setActivePage] = useState('suppliers');
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<Supplier>({ name: '', contact: '', phone: '', email: '' });

    useEffect(() => { const stored = localStorage.getItem('suppliers'); if (stored) setSuppliers(JSON.parse(stored)); }, []);
    useEffect(() => { localStorage.setItem('suppliers', JSON.stringify(suppliers)); }, [suppliers]);

    const openAdd = () => { setEditingIndex(null); setFormData({ name: '', contact: '', phone: '', email: '' }); setShowModal(true); };
    const openEdit = (i: number) => { setEditingIndex(i); setFormData(suppliers[i]); setShowModal(true); };
    const handleDelete = (i: number) => setSuppliers(suppliers.filter((_, idx) => idx !== i));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (editingIndex !== null) {
            const arr = [...suppliers]; arr[editingIndex] = formData; setSuppliers(arr);
        } else {
            setSuppliers([...suppliers, formData]);
        }
        setShowModal(false);
    };

    return (
        <NextThemesProvider defaultTheme="system" attribute="class">
            <Navbar relative />
            <div className="relative flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animate-blob-delay pointer-events-none" />
                <Sidebar activePage={activePage} setActivePage={setActivePage} groups={sidebarGroups} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold dark:text-white">Suppliers</h2>
                            <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={openAdd} className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md">
                                <Plus className="w-4 h-4" /> Add Supplier
                            </motion.button>
                        </div>

                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{editingIndex !== null ? 'Edit' : 'Add'} Supplier</h3>
                                    <motion.form onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible" className="space-y-4">
                                        {(['name', 'contact', 'phone', 'email'] as (keyof Supplier)[]).map(key => (
                                            <motion.div key={key} variants={fieldVariants}>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                                <input type={key === 'email' ? 'email' : 'text'} value={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.value })} required className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500" />
                                            </motion.div>
                                        ))}
                                        <motion.button type="submit" variants={buttonVariants} whileHover="hover" whileTap="tap" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md">{editingIndex !== null ? 'Save' : 'Create'}</motion.button>
                                        <motion.button type="button" variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={() => setShowModal(false)} className="w-full py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-md">Cancel</motion.button>
                                    </motion.form>
                                </motion.div>
                            </div>
                        )}

                        <div className="overflow-x-auto rounded-lg shadow bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {['Name', 'Contact', 'Phone', 'Email', 'Actions'].map((h, i) => <th key={i} className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {suppliers.map((s, i) => (
                                        <tr key={i} className="even:bg-gray-100 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800">
                                            <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{s.name}</td>
                                            <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{s.contact}</td>
                                            <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{s.phone}</td>
                                            <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{s.email}</td>
                                            <td className="px-4 py-3 text-center space-x-2">
                                                <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={() => openEdit(i)} className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm rounded-md"><Edit2 className="w-4 h-4" /> Edit</motion.button>
                                                <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={() => handleDelete(i)} className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"><Trash2 className="w-4 h-4" /> Delete</motion.button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </main>
            </div>
        </NextThemesProvider>
    );
}