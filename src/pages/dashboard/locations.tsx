import '@/app/globals.css';
import { useState, useEffect, FormEvent } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import {
    Plus,
    Trash2
} from 'lucide-react';
import { sidebarGroups } from '@/lib/sidebarConfig';

interface Location { name: string; address: string; capacity: number; }

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
};
const fieldVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };
const buttonVariants = { hover: { scale: 1.05, transition: { duration: 0.2 } }, tap: { scale: 0.95 } };

export default function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newLoc, setNewLoc] = useState<Location>({ name: '', address: '', capacity: 0 });

    useEffect(() => {
        const stored = localStorage.getItem('locations');
        if (stored) setLocations(JSON.parse(stored));
    }, []);
    useEffect(() => {
        localStorage.setItem('locations', JSON.stringify(locations));
    }, [locations]);

    const openModal = () => {
        setNewLoc({ name: '', address: '', capacity: 0 });
        setShowModal(true);
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLocations([...locations, newLoc]);
        setShowModal(false);
    };
    const handleDelete = (idx: number) => {
        setLocations(locations.filter((_, i) => i !== idx));
    };

    return (
        <NextThemesProvider defaultTheme="system" attribute="class">
            <Navbar relative />
            <div className="relative flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animate-blob-delay pointer-events-none" />
                <Sidebar activePage="locations" setActivePage={() => { }} groups={sidebarGroups} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold dark:text-white">Locations</h2>
                        <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={openModal} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md">
                            <Plus className="w-4 h-4 mr-1" /> Add Location
                        </motion.button>
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 dark:text-white">Add Location</h3>
                                <motion.form onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible" className="space-y-4">
                                    <motion.div variants={fieldVariants}>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
                                        <input type="text" required value={newLoc.name} onChange={e => setNewLoc({ ...newLoc, name: e.target.value })} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500" />
                                    </motion.div>
                                    <motion.div variants={fieldVariants}>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Address</label>
                                        <input type="text" required value={newLoc.address} onChange={e => setNewLoc({ ...newLoc, address: e.target.value })} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500" />
                                    </motion.div>
                                    <motion.div variants={fieldVariants}>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Capacity</label>
                                        <input type="number" required min={0} value={newLoc.capacity} onChange={e => setNewLoc({ ...newLoc, capacity: parseInt(e.target.value) || 0 })} className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500" />
                                    </motion.div>
                                    <div className="flex space-x-2">
                                        <motion.button type="submit" variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md">Save</motion.button>
                                        <motion.button type="button" variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-md">Cancel</motion.button>
                                    </div>
                                </motion.form>
                            </motion.div>
                        </div>
                    )}

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {locations.map((loc, i) => (
                            <motion.div key={i} initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative p-6 rounded-2xl shadow bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 animate-float">
                                <h3 className="text-lg font-semibold dark:text-white mb-2">{loc.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-1">{loc.address}</p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Capacity: {loc.capacity}</p>
                                <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={() => handleDelete(i)} className="absolute top-4 right-4 text-red-500 hover:text-red-600">
                                    <Trash2 className="w-5 h-5" />
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>
        </NextThemesProvider>
    );
}
