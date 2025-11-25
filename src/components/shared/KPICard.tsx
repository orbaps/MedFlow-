import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { clsx } from 'clsx';

interface KPICardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendDirection?: 'up' | 'down';
    icon?: React.ReactNode;
    color?: 'blue' | 'orange' | 'red' | 'green';
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendDirection, icon, color = 'blue' }) => {
    const colorClasses = {
        blue: 'text-blue-600 bg-blue-50',
        orange: 'text-orange-600 bg-orange-50',
        red: 'text-red-600 bg-red-50',
        green: 'text-green-600 bg-green-50',
    };

    return (
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <p className="text-gray-600 text-sm font-medium leading-normal">{title}</p>
                {icon && (
                    <div className={clsx("p-2 rounded-lg", colorClasses[color])}>
                        {icon}
                    </div>
                )}
            </div>
            <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">{value}</p>
            {trend && (
                <p className={clsx("text-sm font-medium leading-normal flex items-center gap-1",
                    trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                )}>
                    {trendDirection === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {trend}
                </p>
            )}
        </div>
    );
};
