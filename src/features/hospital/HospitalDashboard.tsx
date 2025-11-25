import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMedicines } from '../../store/inventorySlice';
import { fetchDemandForecast, fetchExpiryRisk } from '../../store/aiSlice';
import {
    Package,
    AlertTriangle,
    TrendingUp,
    Activity,
    Search,
    Filter,
    Calendar,
    ArrowUpRight,
    Sparkles,
    Brain,
    Clock
} from 'lucide-react';

export const HospitalDashboard = () => {
    const dispatch = useAppDispatch();
    const { medicines, loading } = useAppSelector((state) => state.inventory);
    const { forecast, expiryRisk, loading: aiLoading } = useAppSelector((state) => state.ai);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchMedicines());
        dispatch(fetchDemandForecast('MED-1'));
        dispatch(fetchExpiryRisk('HOSP-1'));
    }, [dispatch]);

    // Calculate KPIs
    const totalMedicines = medicines.length;
    const expiringSoon = medicines.filter(m =>
        m.batches?.some(b => {
            const daysUntilExpiry = Math.floor((new Date(b.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
        })
    ).length;
    const lowStock = medicines.filter(m =>
        (m.batches?.reduce((sum, b) => sum + b.quantity, 0) || 0) < 100
    ).length;

    const kpis = [
        {
            title: 'Total Medicines',
            value: totalMedicines,
            change: '+12%',
            trend: 'up',
            icon: Package,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
        },
        {
            title: 'Expiring Soon',
            value: expiringSoon,
            change: '-8%',
            trend: 'down',
            icon: Clock,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50',
        },
        {
            title: 'Low Stock Alerts',
            value: lowStock,
            change: '+5%',
            trend: 'up',
            icon: AlertTriangle,
            gradient: 'from-yellow-500 to-orange-500',
            bgGradient: 'from-yellow-50 to-orange-50',
        },
        {
            title: 'Active Batches',
            value: medicines.reduce((sum, m) => sum + (m.batches?.length || 0), 0),
            change: '+18%',
            trend: 'up',
            icon: Activity,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50',
        },
    ];

    const filteredMedicines = medicines.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Hospital Dashboard
                            </h1>
                            <p className="text-gray-600 mt-1">Real-time inventory management & AI insights</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Today</span>
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
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
                                {/* Background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-gradient-to-br ${kpi.gradient} rounded-xl shadow-lg`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${kpi.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            <ArrowUpRight className={`w-3 h-3 ${kpi.trend === 'down' ? 'rotate-90' : ''}`} />
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

                {/* AI Insights Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Demand Forecast */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">AI Demand Forecast</h3>
                                <p className="text-sm text-gray-500">Predictive analytics</p>
                            </div>
                        </div>
                        {aiLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : forecast ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                    <div>
                                        <p className="text-sm text-gray-600">Predicted Demand</p>
                                        <p className="text-2xl font-bold text-gray-900">{forecast.predictedDemand} units</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Confidence</p>
                                        <p className="text-2xl font-bold text-purple-600">{forecast.confidence}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Sparkles className="w-4 h-4 text-purple-500" />
                                    <span>{forecast.trend}</span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No forecast data available</p>
                        )}
                    </div>

                    {/* Expiry Risk */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                                <AlertTriangle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Expiry Risk Analysis</h3>
                                <p className="text-sm text-gray-500">AI-powered alerts</p>
                            </div>
                        </div>
                        {aiLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : expiryRisk ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                                    <div>
                                        <p className="text-sm text-gray-600">At Risk Items</p>
                                        <p className="text-2xl font-bold text-gray-900">{expiryRisk.atRiskCount}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Total Value</p>
                                        <p className="text-2xl font-bold text-orange-600">₹{expiryRisk.totalValue?.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <TrendingUp className="w-4 h-4 text-orange-500" />
                                    <span>{expiryRisk.recommendation}</span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No expiry risk data available</p>
                        )}
                    </div>
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Medicine Inventory</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search medicines..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Medicine</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Batches</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredMedicines.slice(0, 10).map((medicine) => {
                                    const totalStock = medicine.batches?.reduce((sum, b) => sum + b.quantity, 0) || 0;
                                    const stockStatus = totalStock < 50 ? 'critical' : totalStock < 100 ? 'low' : 'good';

                                    return (
                                        <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{medicine.name}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                    {medicine.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-gray-900">{totalStock}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-600">{medicine.batches?.length || 0}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus === 'critical' ? 'bg-red-100 text-red-700' :
                                                        stockStatus === 'low' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-green-100 text-green-700'
                                                    }`}>
                                                    {stockStatus === 'critical' ? 'Critical' : stockStatus === 'low' ? 'Low Stock' : 'In Stock'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
