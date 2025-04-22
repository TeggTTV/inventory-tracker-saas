import { useState, useEffect, useRef } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import '@/app/globals.css';
import { sidebarGroups } from '@/lib/sidebarConfig';
import { exportToCSV } from '@/lib/utils';

interface InventoryItem {
	name: string;
	quantity: number;
	category: string;
	expirationDate?: string;
}

const buttonVariants = {
	hover: { scale: 1.05, transition: { duration: 0.2 } },
	tap: { scale: 0.95 },
};

export default function ViewInventory() {
	const [filter, setFilter] = useState('');
	const [items, setItems] = useState<InventoryItem[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const stored = localStorage.getItem('inventoryItems');
		if (stored) setItems(JSON.parse(stored));
	}, []);
	useEffect(() => {
		localStorage.setItem('inventoryItems', JSON.stringify(items));
	}, [items]);

	const filteredItems = items.filter((item) =>
		item.name.toLowerCase().includes(filter.toLowerCase())
	);

	const handleImportClick = () => {
		fileInputRef.current?.click();
	};
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const text = await file.text();
		const lines = text
			.split('\n')
			.map((l) => l.trim())
			.filter((l) => l);
		const headers = lines[0].replace(/"/g, '').split(',');
		const newItems: InventoryItem[] = lines.slice(1).map((line) => {
			const cols = line.replace(/"/g, '').split(',');
			const obj: Record<string, string> = {};
			headers.forEach((h, i) => {
				obj[h] = cols[i];
			});
			return {
				name: obj.name,
				quantity: Number(obj.quantity),
				category: obj.category,
				expirationDate: obj.expirationDate,
			};
		});
		setItems((prev) => [...prev, ...newItems]);
		e.target.value = '';
	};
	const handleExport = () => {
		exportToCSV(
			items.map((item) => ({ ...item })),
			'inventory_export.csv'
		);
	};

	return (
		<NextThemesProvider defaultTheme="system" attribute="class">
			<Navbar relative />
			<div className="relative flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
				<div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob pointer-events-none" />
				<div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animate-blob-delay pointer-events-none" />
				<Sidebar
					activePage="view"
					setActivePage={() => {}}
					groups={sidebarGroups}
				/>{' '}
				{/* using shared sidebarGroups */}
				<main className="flex-1 p-6 overflow-y-auto">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<h2 className="text-2xl font-semibold mb-4 dark:text-white">
							View Inventory
						</h2>
						<div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
							{/* Search and Clear grouped */}
							<div className="flex w-full sm:w-auto gap-2">
								<input
									type="text"
									placeholder="Search..."
									value={filter}
									onChange={(e) => setFilter(e.target.value)}
									className="flex-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
								/>
								<button
									onClick={() => setFilter('')}
									className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-md"
								>
									Clear
								</button>
							</div>
							{/* Import and Export buttons styled as primary gradient */}
							<div className="flex gap-2">
								<button
									onClick={handleImportClick}
									className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-md"
								>
									Import CSV
								</button>
								<button
									onClick={handleExport}
									className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-md"
								>
									Export CSV
								</button>
							</div>
							<input
								type="file"
								accept=".csv"
								ref={fileInputRef}
								onChange={handleFileChange}
								className="hidden"
							/>
						</div>
						<div className="overflow-x-auto rounded-lg shadow bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-gray-50 dark:bg-gray-700">
									<tr>
										<th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
											Name
										</th>
										<th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
											Quantity
										</th>
										<th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
											Category
										</th>
										<th className="px-4 py-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
									{filteredItems.map((item, i) => (
										<tr
											key={i}
											className="even:bg-gray-100 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800"
										>
											<td className="px-4 py-3 text-gray-800 dark:text-gray-100">
												{item.name}
											</td>
											<td className="px-4 py-3 text-gray-800 dark:text-gray-100">
												{item.quantity}
											</td>
											<td className="px-4 py-3 text-gray-800 dark:text-gray-100">
												{item.category}
											</td>
											<td className="px-4 py-3 text-center space-x-2">
												<motion.button
													variants={buttonVariants}
													whileHover="hover"
													whileTap="tap"
													onClick={() => {
														/* TODO: Edit handler */
													}}
													className="cursor-pointer inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm rounded-md"
												>
													<Edit2 className="w-4 h-4" />{' '}
													Edit
												</motion.button>
												<motion.button
													variants={buttonVariants}
													whileHover="hover"
													whileTap="tap"
													onClick={() =>
														setItems(
															items.filter(
																(_, idx) =>
																	idx !== i
															)
														)
													}
													className="cursor-pointer inline-flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
												>
													<Trash2 className="w-4 h-4" />{' '}
													Delete
												</motion.button>
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
