import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../store/index';
import { Building2, Store, Shield, User } from 'lucide-react';

const RoleSelectionPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roles = [
        {
            id: 'hospital',
            title: 'Hospital Manager',
            description: 'Manage inventory, track medicines, and view AI insights',
            icon: Building2,
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            id: 'retailer',
            title: 'Retailer',
            description: 'Process orders, manage stock, and fulfill requests',
            icon: Store,
            color: 'from-orange-500 to-orange-600',
            hoverColor: 'hover:from-orange-600 hover:to-orange-700',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
        },
        {
            id: 'superadmin',
            title: 'Super Admin',
            description: 'Full system access, analytics, and user management',
            icon: Shield,
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            id: 'patient',
            title: 'Patient',
            description: 'View prescriptions and medicine availability',
            icon: User,
            color: 'from-green-500 to-green-600',
            hoverColor: 'hover:from-green-600 hover:to-green-700',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
        },
    ];

    const handleRoleSelect = (roleId: string) => {
        dispatch(setRole(roleId as any));
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-xl">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Welcome to MedFlow
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Intelligent Drug Inventory Management System
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Select your role to continue
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                            <button
                                key={role.id}
                                onClick={() => handleRoleSelect(role.id)}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-transparent"
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icon */}
                                    <div className={`${role.iconBg} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-8 h-8 ${role.iconColor}`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {role.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                        {role.description}
                                    </p>

                                    {/* Button */}
                                    <div className={`w-full py-3 px-4 bg-gradient-to-r ${role.color} ${role.hoverColor} text-white font-semibold rounded-xl transition-all duration-300 shadow-md group-hover:shadow-lg`}>
                                        Enter Dashboard
                                    </div>
                                </div>

                                {/* Decorative corner */}
                                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${role.color} opacity-10 rounded-bl-full rounded-tr-2xl`}></div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500">
                        © 2024 MedFlow Inc. All rights reserved.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            HIPAA Compliant
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            99.9% Uptime
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionPage;
