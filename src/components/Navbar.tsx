'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from 'next-themes';
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import LogoLight from '../../public/logo-light.png';
import LogoDark from '../../public/logo-dark.png';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <nav className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 fixed w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={mounted && theme === "light" ? LogoLight : LogoDark} width={50} height={50} quality={100} className="h-auto" alt="Inventory Tracker Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Inventory Tracker</span>
                </Link>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={menuOpen ? 'true' : 'false'}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:items-center md:space-x-6 md:order-2">
                    <button
                        onClick={toggleTheme}
                        className="text-gray-700 dark:text-gray-200"
                    >
                        {mounted && theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                    </button>
                    <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800">
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:hidden mt-4`} id="navbar-sticky">
                    <ul className="flex flex-col gap-2 font-medium border border-gray-100 rounded-lg p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <li>
                            <Link href="#" className="block py-2 px-3 text-white bg-primary-700 rounded md:bg-transparent md:text-blue-700 dark:text-white">Home</Link>
                        </li>
                        <li>
                            <Link href="#features" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500">Features</Link>
                        </li>
                        <li>
                            <Link href="#pricing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500">Pricing</Link>
                        </li>
                        <li>
                            <Link href="#contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500">Contact</Link>
                        </li>
                        {/* Theme toggle & CTA in mobile */}
                        <li className="flex items-center gap-4 mt-2">
                            <button
                                onClick={toggleTheme}
                                className="text-gray-700 dark:text-gray-200"
                            >
                                {mounted && theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                            </button>
                            <button className="w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800">
                                Get Started
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
