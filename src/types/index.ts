export type Role = 'super_admin' | 'hospital' | 'retailer' | 'patient';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatarUrl?: string;
    entityId?: string; // ID of the hospital or retailer they belong to
}

export interface Medicine {
    id: string;
    name: string;
    genericName: string;
    category: string;
    type: 'critical' | 'essential' | 'routine';
    manufacturer: string;
    description: string;
    requiresRefrigeration: boolean;
}

export interface Batch {
    id: string;
    medicineId: string;
    batchNumber: string;
    expiryDate: string;
    quantity: number;
    status: 'In Stock' | 'Low Stock' | 'Critical' | 'Expired';
    location: string; // Department name
}

export interface Hospital {
    id: string;
    name: string;
    location: string;
    type: string;
    status: 'Healthy' | 'Warning' | 'Critical';
    complianceScore: number;
}

export interface Retailer {
    id: string;
    name: string;
    location: string;
    type: string;
    stockItems: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    hospitalName: string;
    medicineName: string;
    quantity: number;
    status: 'New' | 'Confirmed' | 'Dispatched' | 'Delivered';
    priority: 'Urgent' | 'Normal' | 'Routine';
    date: string;
}

export interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    timestamp: string;
    entityName?: string;
}
