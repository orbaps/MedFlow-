import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role, Alert } from '../types';
import { alerts as mockAlerts } from '../data/mockData';
import authReducer from './authSlice';
import inventoryReducer, { setSearchQuery } from './inventorySlice';
import ordersReducer, { updateOrderStatusAPI } from './ordersSlice';

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
export { setSearchQuery };
export { updateOrderStatusAPI };

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

import aiReducer from './aiSlice';

// ...

export const store = configureStore({
    reducer: {
        auth: authReducer,
        role: roleSlice.reducer,
        inventory: inventoryReducer,
        orders: ordersReducer,
        alerts: alertsSlice.reducer,
        ai: aiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
