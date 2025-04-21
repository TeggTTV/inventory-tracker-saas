// components/Sidebar.tsx
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, SVGProps } from 'react';

interface SidebarGroupItem { key: string; label: string; icon: React.FC<SVGProps<SVGSVGElement>>; }
interface SidebarGroup { id: string; title: string; icon?: React.FC<SVGProps<SVGSVGElement>>; items?: SidebarGroupItem[]; }
interface SidebarProps { activePage: string; setActivePage: (page: string) => void; groups: SidebarGroup[]; }

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, groups }) => {
    const firstCollapsible = groups.find(g => g.items && g.items.length > 0)?.id || null;
    const [openDropdown, setOpenDropdown] = useState<string | null>(firstCollapsible);

    const handleDropdown = (menu: string) => setOpenDropdown(openDropdown === menu ? null : menu);

    const isActive = (page: string) => activePage === page;

    return (
        <aside className="w-64 shadow-xl p-4">
            <div className="space-y-4">
                {groups.map(group => (
                    group.items && group.items.length > 0 ? (
                        <div key={group.id}>
                            <button
                                onClick={() => handleDropdown(group.id)}
                                className="flex items-center w-full px-3 py-2 text-left rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                            >
                                {group.icon && <group.icon className="w-5 h-5 mr-2" />}{group.title}
                                <ChevronDown className={`ml-auto w-4 h-4 transform transition-transform ${openDropdown === group.id ? 'rotate-180' : ''}`} />
                            </button>
                            {openDropdown === group.id && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pl-6 space-y-1 mt-1">
                                    {group.items!.map(item => (
                                        <button
                                            key={item.key}
                                            onClick={() => setActivePage(item.key)}
                                            className={`flex items-center w-full px-3 py-1 rounded-md transition-colors ${isActive(item.key) ? 'bg-primary-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white'}`}
                                        >
                                            <item.icon className="w-4 h-4 mr-2 inline" /> {item.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <button
                            key={group.id}
                            onClick={() => setActivePage(group.id)}
                            className={`flex items-center w-full px-3 py-2 rounded-md text-left transition-colors ${isActive(group.id) ? 'bg-primary-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white'}`}
                        >
                            {group.icon && <group.icon className="w-5 h-5 mr-2" />}{group.title}
                        </button>
                    )
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
