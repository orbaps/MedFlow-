import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setSearchQuery } from '../../store/index';
import { fetchMedicines } from '../../store/inventorySlice';
import { fetchDemandForecast, fetchExpiryRisk } from '../../store/aiSlice';
import { KPICard } from '../../components/shared/KPICard';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Search, MoreVertical, AlertTriangle, AlertCircle, Plus, Package, RefreshCw } from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { batches, searchQuery, loading } = useAppSelector((state) => state.inventory);
    const { forecast, expiryRisk } = useAppSelector((state) => state.ai);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        dispatch(fetchMedicines());
        // Mock IDs for demo
        dispatch(fetchDemandForecast('MED-1'));
        dispatch(fetchExpiryRisk('HOSP-1'));
    }, [dispatch]);

    // Filter logic
    const filteredBatches = batches.filter(batch => {
        const matchesSearch = batch.medicineId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            batch.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' || batch.location === activeTab;
        return matchesSearch && matchesTab;
    });

    // KPI Calculations
    const totalMedicines = batches.length;
    const expiringSoon = batches.filter(b => b.status === 'Critical').length;
    const lowStock = batches.filter(b => b.status === 'Low Stock').length;

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hospital Dashboard</h1>
                    <p className="text-gray-500">Overview of drug inventory and supply chain status.</p>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    <KPICard title="Total Batches" value={totalMedicines} trend="+1.2%" trendDirection="up" color="blue" />
                    <KPICard title="Expiring Soon (< 30 days)" value={expiringSoon} trend="+5%" trendDirection="up" color="orange" />
                    <KPICard title="Low Stock Alerts" value={lowStock} trend="-2%" trendDirection="down" color="red" />
                    <KPICard title="Recent Activity" value="32" trend="+10%" trendDirection="up" color="green" />
                </div>

                {/* Inventory Table Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-900">Department Inventory</h2>

                        {/* Search Bar */}
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search medicine or batch..."
                                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                value={searchQuery}
                                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-6 pt-4 flex gap-4 border-b border-gray-200 overflow-x-auto">
                        {['All', 'Main Pharmacy', 'ICU', 'Emergency', 'Ward 3'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Batch No</th>
                                        <th className="px-6 py-3 font-medium">Medicine ID</th>
                                        <th className="px-6 py-3 font-medium text-right">Quantity</th>
                                        <th className="px-6 py-3 font-medium">Expiry</th>
                                        <th className="px-6 py-3 font-medium">Location</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredBatches.length > 0 ? (
                                        filteredBatches.slice(0, 10).map((batch) => (
                                            <tr key={batch.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">{batch.batchNumber}</td>
                                                <td className="px-6 py-4 text-gray-600">{batch.medicineId}</td>
                                                <td className="px-6 py-4 text-gray-600 text-right">{batch.quantity} units</td>
                                                <td className="px-6 py-4 text-gray-600">{batch.expiryDate}</td>
                                                <td className="px-6 py-4 text-gray-600">{batch.location}</td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={batch.status} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                                No inventory found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Pagination (Mock) */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-sm text-gray-500">Showing 1 to 10 of {filteredBatches.length} results</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">Previous</button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
                        </div>
                    </div>
                </div>

                {/* AI Insights Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-600">auto_awesome</span>
                        AI Insights & Forecasts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Insight 1: Seasonal Trend */}
                        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                    <span className="material-symbols-outlined text-xl">show_chart</span>
                                </span>
                                <h3 className="font-bold text-gray-900">Seasonal Trend Detected</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>Dengue Season</strong> pattern detected in your region. Historical data suggests a <strong>40% spike</strong> in IV Fluids demand.
                            </p>
                            <div className="bg-white p-3 rounded-lg border border-purple-100 text-sm">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">IV Fluids (RL/NS)</span>
                                    <span className="text-green-600 font-medium">+40% Rec.</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Insight 2: Demand Forecast (Dynamic) */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <span className="material-symbols-outlined text-xl">trending_up</span>
                                </span>
                                <h3 className="font-bold text-gray-900">Demand Forecast</h3>
                            </div>
                            {forecast ? (
                                <>
                                    <p className="text-sm text-gray-600 mb-3">
                                        <strong>{forecast.medicineId}</strong> consumption is trending up <strong>{forecast.confidenceScore}%</strong>. Predicted demand: {forecast.predictedDemand} units.
                                    </p>
                                    <button className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                        Auto-Generate Reorder
                                    </button>
                                </>
                            ) : (
                                <div className="flex justify-center py-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                </div>
                            )}
                        </div>

                        {/* Insight 3: Expiry Optimization (Dynamic) */}
                        <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                    <span className="material-symbols-outlined text-xl">inventory_2</span>
                                </span>
                                <h3 className="font-bold text-gray-900">Expiry Risk Optimization</h3>
                            </div>
                            {expiryRisk ? (
                                <>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {expiryRisk.riskLevel === 'High' ? (
                                            <><strong>High Risk:</strong> {expiryRisk.expiringBatches.length} batches expiring soon. Value: ₹{expiryRisk.totalValue}.</>
                                        ) : (
                                            <>Risk Level: {expiryRisk.riskLevel}. {expiryRisk.expiringBatches.length} batches expiring.</>
                                        )}
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 bg-white border border-orange-200 text-orange-700 text-sm font-medium rounded-lg hover:bg-orange-50 transition-colors">
                                            Transfer
                                        </button>
                                        <button className="flex-1 py-2 bg-white border border-orange-200 text-orange-700 text-sm font-medium rounded-lg hover:bg-orange-50 transition-colors">
                                            Discount
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-center py-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Alerts & Actions) */}
            <aside className="w-full lg:w-80 space-y-8">
                {/* Alerts Panel */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Alerts Panel</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border-l-4 border-red-500">
                            <AlertCircle className="text-red-500 mt-0.5" size={18} />
                            <div>
                                <p className="font-semibold text-sm text-red-800">Insulin Batch Expiring</p>
                                <p className="text-xs text-red-600">Batch #INS-089 expires in 5 days</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border-l-4 border-orange-400">
                            <AlertTriangle className="text-orange-500 mt-0.5" size={18} />
                            <div>
                                <p className="font-semibold text-sm text-orange-800">Paracetamol Low Stock</p>
                                <p className="text-xs text-orange-600">Only 80 units remaining in Pharmacy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus size={18} /> Generate Purchase Order
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                            <Package size={18} /> Receive Stock
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                            <RefreshCw size={18} /> Transfer Stock
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};
