import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setRole } from '../../store/index';
import { Bell, Search, ChevronDown, Building2, Store } from 'lucide-react';
import { Role } from '../../types';

export const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentRole, entityName } = useAppSelector((state) => state.role);

    const handleRoleChange = (role: Role) => {
        dispatch(setRole(role));
    };

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-6 sm:px-10 h-16 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <button className="flex items-center gap-2 p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                        {currentRole === 'hospital' ? <Building2 className="text-blue-600" size={20} /> : <Store className="text-orange-500" size={20} />}
                        <span className="text-sm font-medium text-gray-800">{currentRole === 'hospital' ? 'Hospital Manager' : 'Retailer Portal'}</span>
                        <ChevronDown className="text-gray-500" size={16} />
                    </button>

                    {/* Role Switcher Dropdown */}
                    <div className="hidden group-hover:block absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                        <button
                            onClick={() => handleRoleChange('hospital')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                            <Building2 size={16} className="text-blue-600" /> Hospital
                        </button>
                        <button
                            onClick={() => handleRoleChange('retailer')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                            <Store size={16} className="text-orange-500" /> Retailer
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
                    />
                </div>

                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                    <div className="hidden md:block text-sm">
                        <p className="font-medium text-gray-700">{entityName}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
