import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role, Batch, Order, Alert } from '../types';
import { hospitalBatches as mockBatches, orders as mockOrders, alerts as mockAlerts } from '../data/mockData';
import authReducer from './authSlice';

// --- Slices ---

// Role Slice
interface RoleState {
    currentRole: Role;
}

const initialRoleState: RoleState = {
    currentRole: 'hospital', // Default
};

const roleSlice = createSlice({
    name: 'role',
    initialState: initialRoleState,
    reducers: {
        setRole: (state, action: PayloadAction<Role>) => {
            state.currentRole = action.payload;
        },
    },
});

export const { setRole } = roleSlice.actions;

// Inventory Slice
interface InventoryState {
    batches: Batch[];
    searchQuery: string;
}

const initialInventoryState: InventoryState = {
    batches: mockBatches,
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

export const { setSearchQuery } = inventorySlice.actions;

// Orders Slice
interface OrdersState {
    orders: Order[];
}

const initialOrdersState: OrdersState = {
    orders: mockOrders,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialOrdersState,
    reducers: {
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
            const order = state.orders.find(o => o.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
            }
        },
    },
});

export const { updateOrderStatus } = ordersSlice.actions;

// Alerts Slice
interface AlertsState {
    alerts: Alert[];
}

const initialAlertsState: AlertsState = {
    alerts: mockAlerts,
};

const alertsSlice = createSlice({
    name: 'alerts',
    initialState: initialAlertsState,
    reducers: {
        addAlert: (state, action: PayloadAction<Alert>) => {
            state.alerts.unshift(action.payload);
        },
    },
});

export const { addAlert } = alertsSlice.actions;

// --- Store Configuration ---

export const store = configureStore({
    reducer: {
        auth: authReducer,
        role: roleSlice.reducer,
        inventory: inventorySlice.reducer,
        orders: ordersSlice.reducer,
        alerts: alertsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
