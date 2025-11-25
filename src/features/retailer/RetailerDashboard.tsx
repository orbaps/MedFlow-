import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOrders, updateOrderStatusAPI } from '../../store/ordersSlice';
import {
    Package,
    TrendingUp,
    Clock,
    CheckCircle,
    XCircle,
    Search,
    Filter,
    Calendar,
    ShoppingCart,
    ArrowUpRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export const RetailerDashboard = () => {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector((state) => state.orders);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        dispatch(fetchOrders('retailer'));
    }, [dispatch]);

    const handleStatusUpdate = async (orderId: string, status: 'Confirmed' | 'Rejected') => {
        try {
            await dispatch(updateOrderStatusAPI({ orderId, status })).unwrap();
            toast.success(`Order ${status.toLowerCase()} successfully!`);
        } catch (error) {
            toast.error('Failed to update order status');
        }
    };

    // Calculate KPIs
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const confirmedOrders = orders.filter(o => o.status === 'Confirmed').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;

    const kpis = [
        {
            title: 'Total Orders',
            value: totalOrders,
            change: '+23%',
            trend: 'up',
            icon: ShoppingCart,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
        },
        {
            title: 'Pending Orders',
            value: pendingOrders,
            change: '+12%',
            trend: 'up',
            icon: Clock,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50',
        },
        {
            title: 'Confirmed',
            value: confirmedOrders,
            change: '+18%',
            trend: 'up',
            icon: CheckCircle,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50',
        },
        {
            title: 'Completed',
            value: completedOrders,
            change: '+15%',
            trend: 'up',
            icon: Package,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
        },
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.medicineName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-orange-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                Retailer Dashboard
                            </h1>
                            <p className="text-gray-600 mt-1">Manage orders and fulfill hospital requests</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Today</span>
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                <span className="text-sm font-medium">Filters</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, index) => {
                        const Icon = kpi.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-gradient-to-br ${kpi.gradient} rounded-xl shadow-lg`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            <ArrowUpRight className="w-3 h-3" />
                                            {kpi.change}
                                        </div>
                                    </div>
                                    <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
                                    <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="text-xl font-bold text-gray-900">Order Management</h3>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                                    />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-12">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 font-medium">No orders found</p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="group bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                                                    <Package className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900">{order.medicineName}</h4>
                                                    <p className="text-sm text-gray-500">{order.hospitalName}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Quantity</p>
                                                    <p className="text-sm font-semibold text-gray-900">{order.quantity} units</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Priority</p>
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${order.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                            order.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-green-100 text-green-700'
                                                        }`}>
                                                        {order.priority}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Status</p>
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                                                            order.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                                order.status === 'Delivered' ? 'bg-purple-100 text-purple-700' :
                                                                    'bg-red-100 text-red-700'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Order Date</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {order.status === 'Pending' && (
                                            <div className="flex flex-col gap-2 ml-4">
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'Confirmed')}
                                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 text-sm font-semibold"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'Rejected')}
                                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 text-sm font-semibold"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
