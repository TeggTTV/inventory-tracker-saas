import { motion } from "framer-motion";

export default function PricingSection() {
    return (
        <section className="relative bg-gray-900  overflow-hidden">
            {/* Floating Icons Background */}

            <div className="relative py-16 px-4 mx-auto max-w-screen-xl lg:px-6 z-10">
                <div className="mx-auto max-w-screen-md text-center mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Flexible Plans for Every Team
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Choose a plan that fits your team&apos;s needs and scale your business with confidence.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3 xl:gap-12">
                    {/* Starter Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col p-6 text-center text-gray-900 bg-white rounded-2xl border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                        <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            Perfect for individuals and small projects.
                        </p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$0</span>
                            <span className="text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                        <ul className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Integration with 3rd party services</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>No Credit Card required</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Get started for free and upgrade anytime</span>
                            </li>
                        </ul>
                        <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                            Get started
                        </a>
                    </motion.div>

                    {/* Company Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="relative flex flex-col p-6 text-center text-gray-900 bg-white border-2 border-primary-600 rounded-2xl shadow-md dark:bg-gray-800 dark:text-white"
                    >
                        <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                            Most Popular
                        </span>
                        <h3 className="mb-4 text-2xl font-semibold">Company</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            Ideal for growing teams and businesses.
                        </p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$79</span>
                            <span className="text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                        <ul className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Advanced analytics</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Priority email support</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Up to 10 projects</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Team collaboration tools</span>
                            </li>
                        </ul>
                        <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                            Get started
                        </a>
                    </motion.div>

                    {/* Enterprise Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col p-6 text-center text-gray-900 bg-white rounded-2xl border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                        <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            Custom solutions for large organizations.
                        </p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$149</span>
                            <span className="text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                        <ul className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Custom analytics</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Dedicated support</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Unlimited projects</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>Custom integrations</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-green-500">✔</span>
                                <span>24/7 support</span>
                            </li>
                        </ul>
                        <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                            Contact us
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
