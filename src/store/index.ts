import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role, Medicine, Batch, Order, Alert } from '../types';
import { hospitalBatches, orders, alerts, medicines } from '../data/mockData';

// 1. Role Slice
interface RoleState {
    currentRole: Role;
    entityName: string;
}

const initialRoleState: RoleState = {
    currentRole: 'hospital',
    entityName: 'City General Hospital',
};

const roleSlice = createSlice({
    name: 'role',
    initialState: initialRoleState,
    reducers: {
        setRole: (state, action: PayloadAction<Role>) => {
            state.currentRole = action.payload;
            if (action.payload === 'hospital') state.entityName = 'City General Hospital';
            else if (action.payload === 'retailer') state.entityName = 'MedPlus Pharma';
            else if (action.payload === 'super_admin') state.entityName = 'Network Command Center';
        },
    },
});

// 2. Inventory Slice
interface InventoryState {
    medicines: Medicine[];
    batches: Batch[];
    searchQuery: string;
}

const initialInventoryState: InventoryState = {
    medicines: medicines,
    batches: hospitalBatches,
    searchQuery: '',
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialInventoryState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

// 3. Order Slice
interface OrderState {
    orders: Order[];
}

const initialOrderState: OrderState = {
    orders: orders,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState: initialOrderState,
    reducers: {
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
            const order = state.orders.find(o => o.id === action.payload.id);
            if (order) order.status = action.payload.status;
        },
    },
});

// 4. Alert Slice
interface AlertState {
    alerts: Alert[];
}

const initialAlertState: AlertState = {
    alerts: alerts,
};

const alertSlice = createSlice({
    name: 'alerts',
    initialState: initialAlertState,
    reducers: {
        addAlert: (state, action: PayloadAction<Alert>) => {
            state.alerts.unshift(action.payload);
        },
    },
});

// Store Config
export const store = configureStore({
    reducer: {
        role: roleSlice.reducer,
        inventory: inventorySlice.reducer,
        orders: orderSlice.reducer,
        alerts: alertSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { setRole } = roleSlice.actions;
export const { setSearchQuery } = inventorySlice.actions;
export const { updateOrderStatus } = orderSlice.actions;
export const { addAlert } = alertSlice.actions;
