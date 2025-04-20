import { useEffect, useState } from 'react';

const stats = [
    { label: 'Items Tracked', value: 12458 },
    { label: 'Retailers Onboarded', value: 342 },
    { label: 'Inventory Accuracy', value: 99.7, suffix: '%' },
];

export default function HeroStats() {
    const [counts, setCounts] = useState(stats.map(() => 0));
    const [selectedStat, setSelectedStat] = useState<string | null>(null);

    const handleSelectedStat = (label: string) => {
        if (selectedStat === label) return;
        setSelectedStat(label);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCounts((prev) =>
                prev.map((num, i) => {
                    const target = stats[i].value;
                    const step = Math.max(1, Math.ceil(target / 60));
                    return num < target ? Math.min(num + step, target) : num;
                })
            );
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (

        <>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 text-center gap-6 text-white">
                {stats.map((stat, i) => (
                    <div key={stat.label} onClick={() => handleSelectedStat(stat.label)}
                        className="cursor-pointer transition-all duration-300 hover:text-blue-500">
                        <div className="text-3xl font-bold">
                            {counts[i]}
                            {stat.suffix || ''}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
