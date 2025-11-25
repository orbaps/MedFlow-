import React from 'react';
import { clsx } from 'clsx';

interface StatusBadgeProps {
    status: 'In Stock' | 'Low Stock' | 'Critical' | 'Expired' | 'Healthy' | 'Warning' | 'New' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Urgent' | 'Normal' | 'Routine' | 'Cancelled';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const styles = {
        'In Stock': 'bg-green-100 text-green-800',
        'Healthy': 'bg-green-100 text-green-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Confirmed': 'bg-blue-100 text-blue-800',
        'Dispatched': 'bg-purple-100 text-purple-800',
        'New': 'bg-gray-100 text-gray-800',
        'Low Stock': 'bg-orange-100 text-orange-800',
        'Warning': 'bg-orange-100 text-orange-800',
        'Normal': 'bg-blue-100 text-blue-800',
        'Routine': 'bg-gray-100 text-gray-800',
        'Critical': 'bg-red-100 text-red-800',
        'Expired': 'bg-red-100 text-red-800',
        'Urgent': 'bg-red-100 text-red-800',
        'Cancelled': 'bg-red-100 text-red-800',
    };

    return (
        <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", styles[status] || 'bg-gray-100 text-gray-800')}>
            {status}
        </span>
    );
};
