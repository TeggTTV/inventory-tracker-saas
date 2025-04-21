import { Mail } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="relative isolate overflow-hidden bg-white dark:bg-gray-900 py-20 sm:py-24">
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[10%] top-[30%] w-96 h-96 bg-blue-300 dark:bg-blue-800 rounded-full blur-3xl opacity-40 animate-pulse" />
                <div className="absolute right-[5%] bottom-[10%] w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full blur-2xl opacity-30 animate-blob" />
            </div>

            <div className="container mx-auto px-6 lg:px-20 text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                    Stay in Control
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
                    Get real-time insights and updates straight to your inbox.
                </p>

                <form className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-2xl mx-auto">
                    <div className="relative w-full">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full pl-12 pr-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="whitespace-nowrap px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Subscribe
                    </button>
                </form>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-5">
                    No credit card required. Read our{" "}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms</a> and{" "}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </section>
    );
}
