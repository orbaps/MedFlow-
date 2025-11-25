import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosClient';
import { Batch, Medicine } from '../types';

interface InventoryState {
    medicines: Medicine[];
    batches: Batch[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: InventoryState = {
    medicines: [],
    batches: [],
    loading: false,
    error: null,
    searchQuery: '',
};

// Async Thunks
export const fetchMedicines = createAsyncThunk(
    'inventory/fetchMedicines',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/inventory/medicines');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch medicines');
        }
    }
);

// Note: In a real app, we would fetch batches separately or nested. 
// For this MVP, we'll assume the medicine endpoint returns batches or we mock it for now if the backend structure differs.
// Based on my backend controller, getMedicines includes batches.

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMedicines.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines = action.payload;
                // Flatten batches from medicines for the table view if needed, or keep as is.
                // The backend returns medicines with nested batches.
                // Let's extract all batches for the "Department Inventory" table.
                const allBatches: Batch[] = [];
                action.payload.forEach((med: any) => {
                    if (med.batches) {
                        med.batches.forEach((b: any) => {
                            // Enrich batch with medicine info for display
                            allBatches.push({
                                ...b,
                                medicine: { name: med.name, genericName: med.genericName, category: med.category }
                            });
                        });
                    }
                });
                state.batches = allBatches;
            })
            .addCase(fetchMedicines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery } = inventorySlice.actions;
export default inventorySlice.reducer;
