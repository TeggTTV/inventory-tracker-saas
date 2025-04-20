import { AlertTriangle, BarChart, Package, Upload } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: AlertTriangle,
        title: "Real-Time Alerts",
        description: "Stay informed with instant notifications for low stock, overstock, and expiration dates.",
        color: "text-red-500"
    },
    {
        icon: Package,
        title: "Smart Organization",
        description: "Categorize items into batches and subcategories for seamless inventory management.",
        color: "text-purple-500"
    },
    {
        icon: BarChart,
        title: "Data Insights",
        description: "Analyze sales trends and make data-driven decisions to optimize your inventory.",
        color: "text-green-500"
    },
    {
        icon: Upload,
        title: "CSV Integration",
        description: "Import and export inventory data effortlessly with CSV file support.",
        color: "text-yellow-500"
    }
];

export default function Features() {
    return (
        <section className="relative py-24 bg-gray-900 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#0f172a] dark:to-[#1e293b] overflow-hidden">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-4xl font-extrabold text-center mb-20 text-gray-900 dark:text-white">
                    Why Choose Our Inventory Tracker?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl backdrop-blur-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center shadow-md hover:scale-[1.03] transition-transform"
                        >
                            <div className={`mb-4 ${f.color}`}>
                                <f.icon className="animate-float w-10 h-10 mx-auto drop-shadow" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {f.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{f.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}