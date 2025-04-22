import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="dark:bg-gray-900/50 dark:text-white py-6">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Inventory Tracker. All rights reserved.</p>
                <nav className="mt-4 flex justify-center space-x-6">
                    <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
                    <Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link>
                    <Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
                </nav>
            </div>
        </footer>
    );
}