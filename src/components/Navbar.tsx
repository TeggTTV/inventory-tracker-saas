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

    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    return (
        <>
            <nav className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 fixed w-full z-20 top-0 start-0">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={mounted && theme === "light" ? LogoLight : LogoDark} width={50} height={50} quality={100} className="h-auto" alt="Inventory Tracker Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text dark:text-white">Inventory Tracker</span>
                    </Link>
                    <div className="flex justify-between gap-8 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <div className="cursor-pointer flex items-center justify-center">
                            {mounted && theme === 'dark' ? (
                                <Moon onClick={toggleTheme} className="font-medium rounded-lg text-center w-6 h-6">Light Mode</Moon>
                            ) : (

                                <Sun onClick={toggleTheme} className="font-medium rounded-lg text-center w-6 h-6">Dark Mode</Sun>
                            )}
                        </div>
                        <button type="button" className="cursor-pointer text-white transition-all delay-75 focus:ring-4 focus:ring-blue-300 bg-primary-700 hover:bg-primary-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800">Get Started</button>

                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                            <li>
                                <Link href="#" className="transition-all delay-75 block py-2 px-3 text-white bg-primary-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="#features" className="transition-all delay-75 block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Features</Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="transition-all delay-75 block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</Link>
                            </li>
                            <li>
                                <Link href="#contact" className="transition-all delay-75 block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}