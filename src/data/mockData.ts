import { Medicine, Batch, Order, Alert, Hospital } from '../types';
import { addDays, subDays, format } from 'date-fns';

// Helper to generate random date
const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// 1. Medicines (1000 items simulated by generating variations)
const baseMedicines = [
    { name: 'Insulin Glargine', generic: 'Insulin', type: 'critical', category: 'Diabetes' },
    { name: 'Paracetamol 500mg', generic: 'Acetaminophen', type: 'essential', category: 'Pain Relief' },
    { name: 'Amoxicillin 500mg', generic: 'Amoxicillin', type: 'essential', category: 'Antibiotics' },
    { name: 'Atorvastatin 10mg', generic: 'Atorvastatin', type: 'routine', category: 'Cardiovascular' },
    { name: 'Metformin 500mg', generic: 'Metformin', type: 'essential', category: 'Diabetes' },
    { name: 'Morphine Sulfate', generic: 'Morphine', type: 'critical', category: 'Pain Relief' },
    { name: 'Epinephrine Injection', generic: 'Epinephrine', type: 'critical', category: 'Emergency' },
    { name: 'Omeprazole 20mg', generic: 'Omeprazole', type: 'routine', category: 'Gastrointestinal' },
    { name: 'Losartan 50mg', generic: 'Losartan', type: 'routine', category: 'Cardiovascular' },
    { name: 'Azithromycin 250mg', generic: 'Azithromycin', type: 'essential', category: 'Antibiotics' },
];

export const medicines: Medicine[] = Array.from({ length: 1000 }).map((_, i) => {
    const base = baseMedicines[i % baseMedicines.length];
    return {
        id: `MED-${i + 1}`,
        name: `${base.name} ${i > 9 ? `(Var ${Math.floor(i / 10)})` : ''}`,
        genericName: base.generic,
        category: base.category,
        type: base.type as 'critical' | 'essential' | 'routine',
        manufacturer: ['Pfizer', 'Sun Pharma', 'Cipla', 'Dr. Reddys', 'Abbott'][Math.floor(Math.random() * 5)],
        description: `Standard dosage form for ${base.name}`,
        requiresRefrigeration: base.type === 'critical',
    };
});

// 2. Batches (Inventory)
export const generateBatches = (count: number): Batch[] => {
    return Array.from({ length: count }).map((_, i) => {
        const med = medicines[Math.floor(Math.random() * medicines.length)];
        const expiryDate = randomDate(new Date(), addDays(new Date(), 365));
        const daysToExpiry = Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

        let status: Batch['status'] = 'In Stock';
        let quantity = Math.floor(Math.random() * 500);

        if (daysToExpiry < 30) status = 'Critical'; // Expiring soon
        else if (daysToExpiry < 90) status = 'Low Stock'; // Warning
        else if (quantity < 50) status = 'Low Stock';

        return {
            id: `BATCH-${i + 1000}`,
            medicineId: med.id,
            batchNumber: `${med.name.substring(0, 3).toUpperCase()}${2024 + Math.floor(Math.random() * 2)}-${Math.floor(Math.random() * 999)}`,
            expiryDate: format(expiryDate, 'MM/yyyy'),
            quantity,
            status,
            location: ['Main Pharmacy', 'ICU', 'Emergency', 'Ward 3'][Math.floor(Math.random() * 4)],
        };
    });
};

export const hospitalBatches = generateBatches(150); // 150 batches for the active hospital

// 3. Orders
export const orders: Order[] = Array.from({ length: 25 }).map((_, i) => {
    const med = medicines[Math.floor(Math.random() * medicines.length)];
    return {
        id: `ORD-${2024000 + i}`,
        orderNumber: `PO-${2024000 + i}`,
        hospitalName: ['City General Hospital', 'Northside Medical', 'Westwood Clinic'][Math.floor(Math.random() * 3)],
        medicineName: med.name,
        quantity: Math.floor(Math.random() * 200) + 50,
        status: ['New', 'Confirmed', 'Dispatched', 'Delivered'][Math.floor(Math.random() * 4)] as Order['status'],
        priority: ['Urgent', 'Normal', 'Routine'][Math.floor(Math.random() * 3)] as Order['priority'],
        date: format(subDays(new Date(), Math.floor(Math.random() * 10)), 'MMM dd, yyyy'),
    };
});

// 4. Alerts
export const alerts: Alert[] = [
    { id: '1', type: 'critical', message: 'Insulin Glargine Batch #INS-089 expiring in 5 days', timestamp: '2m ago' },
    { id: '2', type: 'warning', message: 'Paracetamol stock below reorder level (80 units)', timestamp: '15m ago' },
    { id: '3', type: 'info', message: 'New shipment received from MedPlus Pharma', timestamp: '1h ago' },
    { id: '4', type: 'critical', message: 'Morphine Sulfate stockout in Emergency Dept', timestamp: '2h ago' },
    { id: '5', type: 'warning', message: 'Seasonal demand spike detected for Antibiotics', timestamp: '4h ago' },
];

// 5. Hospitals (Network)
export const hospitals: Hospital[] = [
    { id: '1', name: 'City General Hospital', location: 'Mumbai', type: 'General', status: 'Healthy', complianceScore: 98 },
    { id: '2', name: 'Northside Medical Center', location: 'Delhi', type: 'Specialty', status: 'Critical', complianceScore: 85 },
    { id: '3', name: 'Westwood Clinic', location: 'Bangalore', type: 'Clinic', status: 'Warning', complianceScore: 92 },
    { id: '4', name: 'Apollo Health City', location: 'Hyderabad', type: 'Super Specialty', status: 'Healthy', complianceScore: 99 },
];
