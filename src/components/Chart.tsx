'use client';
import { LineChart, Line, XAxis, Tooltip, YAxis, ResponsiveContainer } from 'recharts';

export default function Chart({ data }: { data: { name: string, items: number }[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <Tooltip labelClassName='dark:!white !text-gray-800' wrapperClassName='dark:!bg-gray-800 !bg-white !border-none shadow-lg' />
                    <Line type="monotone" dataKey="items" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
