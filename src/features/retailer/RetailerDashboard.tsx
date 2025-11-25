import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchOrders, updateOrderStatusAPI } from '../../store/ordersSlice';
import { KPICard } from '../../components/shared/KPICard';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Package, Truck, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RetailerDashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders('retailer'));
    }, [dispatch]);

    const handleStatusUpdate = (orderId: string, status: 'Confirmed' | 'Cancelled') => {
        dispatch(updateOrderStatusAPI({ orderId, status }));
    };

    // KPI Calcs (Mock)
    const pendingOrders = orders.filter(o => o.status === 'New').length;
    const dispatchedToday = orders.filter(o => o.status === 'Dispatched').length;

    return (
        <div className="flex flex-col gap-8">
            <div className="mb-2">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Retailer Portal</h1>
                <p className="text-gray-500">Manage stock and fulfill hospital orders.</p>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <KPICard title="Total Stock Items" value="342" trend="Stable" trendDirection="up" color="orange" />
                <KPICard title="Pending Orders" value={pendingOrders} trend="+3 New" trendDirection="up" color="blue" />
                <KPICard title="Dispatched Today" value={dispatchedToday} trend="₹12.4L" trendDirection="up" color="green" />
                <KPICard title="Expiring Batches" value="8" trend="Action Req" trendDirection="down" color="red" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Orders Panel (Left - Priority for Retailer) */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Incoming Orders</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            </div>
                        ) : orders.length > 0 ? (
                            orders.slice(0, 5).map(order => (
                                <div key={order.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-full ${order.priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900">{order.hospitalName}</h3>
                                                <StatusBadge status={order.priority} />
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                <span className="font-medium">{order.medicineName}</span> • {order.quantity} units
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Ordered: {order.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        {order.status === 'New' ? (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'Confirmed')}
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                                                >
                                                    <CheckCircle size={16} /> Confirm
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'Cancelled')}
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                                                >
                                                    <XCircle size={16} /> Reject
                                                </button>
                                            </>
                                        ) : (
                                            <StatusBadge status={order.status} />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">No orders found.</div>
                        )}
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 text-center">
                        <button className="text-blue-600 font-medium text-sm hover:underline">View All Orders</button>
                    </div>
                </div>

                {/* Stock Overview (Right) */}
                <div className="w-full lg:w-96 bg-white rounded-xl border border-gray-200 shadow-sm h-fit">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Stock Alerts</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border-l-4 border-red-500">
                            <AlertTriangle className="text-red-500 mt-0.5" size={18} />
                            <div>
                                <p className="font-semibold text-sm text-red-800">Critical Stockout</p>
                                <p className="text-xs text-red-600">Insulin Glargine (0 units)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border-l-4 border-orange-400">
                            <AlertTriangle className="text-orange-500 mt-0.5" size={18} />
                            <div>
                                <p className="font-semibold text-sm text-orange-800">Expiring Soon</p>
                                <p className="text-xs text-orange-600">Amoxicillin Batch #AMX-992</p>
                            </div>
                        </div>

                        <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                            <Truck size={18} /> Manage Shipments
                        </button>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Top Requested Medicines</h2>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Insulin', orders: 45 },
                            { name: 'Paracetamol', orders: 38 },
                            { name: 'Amoxicillin', orders: 32 },
                            { name: 'Metformin', orders: 28 },
                            { name: 'Omeprazole', orders: 25 },
                            { name: 'Atorvastatin', orders: 22 },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#F3F4F6' }} />
                            <Bar dataKey="orders" fill="#F97316" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
