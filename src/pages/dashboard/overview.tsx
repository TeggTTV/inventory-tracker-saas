import '@/app/globals.css';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import Chart from '@/components/Chart';
import { exportToCSV } from '@/lib/utils';
import { sidebarGroups } from '@/lib/sidebarConfig';

const week = [
    { name: 'Monday', items: 10 },
    { name: 'Tuesday', items: 20 },
    { name: 'Wednesday', items: 15 },
    { name: 'Thursday', items: 25 },
    { name: 'Friday', items: 30 },
    { name: 'Saturday', items: 5 },
    { name: 'Sunday', items: 12 },
];

export default function OverviewPage() {
    const handleExport = () => {
        exportToCSV(week.map(d => ({ name: d.name, items: d.items })), 'report.csv');
    };

    return (
        <NextThemesProvider defaultTheme="system" attribute="class">
            <Navbar relative />
            <div className="relative flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animate-blob-delay pointer-events-none" />
                <Sidebar activePage="overview" setActivePage={() => { }} groups={sidebarGroups} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Reports</h2>
                        <Chart data={week} />
                        <motion.button
                            className="mt-6 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleExport}
                        >
                            Export CSV
                        </motion.button>
                    </motion.div>
                </main>
            </div>
        </NextThemesProvider>
    );
}