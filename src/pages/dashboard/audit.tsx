import '@/app/globals.css';

import { useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { sidebarGroups } from '@/lib/sidebarConfig';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface AuditLog { type: 'add' | 'edit' | 'delete'; description: string; date: string; }

const listVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

export default function AuditPage() {
    const [logs, setLogs] = useState<AuditLog[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('auditLogs');
        if (stored) setLogs(JSON.parse(stored));
    }, []);

    return (
        <NextThemesProvider defaultTheme="system" attribute="class">
            <Navbar relative />
            <div className="relative flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
                {/* background blobs */}
                <Sidebar activePage="audit" setActivePage={() => { }} groups={sidebarGroups} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Audit Logs</h2>
                        <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
                            {logs.map((log, idx) => (
                                <motion.div key={idx} variants={itemVariants} className="flex items-start p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-lg shadow">
                                    {log.type === 'add' && <Plus className="w-6 h-6 text-green-500 flex-none mr-3" />}
                                    {log.type === 'edit' && <Edit2 className="w-6 h-6 text-blue-500 flex-none mr-3" />}
                                    {log.type === 'delete' && <Trash2 className="w-6 h-6 text-red-500 flex-none mr-3" />}
                                    <div>
                                        <p className="text-gray-800 dark:text-gray-100">{log.description}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date(log.date).toLocaleString()}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </NextThemesProvider>
    );
}