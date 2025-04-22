import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { sidebarGroups } from '@/lib/sidebarConfig';

export default function SettingsPage() {

    return (
        <NextThemesProvider defaultTheme="system" attribute="class">
            <Navbar relative />
            <div className="relative flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animate-blob-delay pointer-events-none" />
                <Sidebar activePage="settings" setActivePage={() => { }} groups={sidebarGroups} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Settings</h2>
                        <p className="dark:text-white">Manage user preferences, themes, and application settings here.</p>
                    </motion.div>
                </main>
            </div>
        </NextThemesProvider>
    );
}