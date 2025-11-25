import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosClient';

interface AIState {
    forecast: any | null;
    expiryRisk: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: AIState = {
    forecast: null,
    expiryRisk: null,
    loading: false,
    error: null,
};

// Async Thunks
export const fetchDemandForecast = createAsyncThunk(
    'ai/fetchDemandForecast',
    async (medicineId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/ai/forecast/${medicineId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch forecast');
        }
    }
);

export const fetchExpiryRisk = createAsyncThunk(
    'ai/fetchExpiryRisk',
    async (hospitalId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/ai/expiry-risk/${hospitalId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch expiry risk');
        }
    }
);

const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDemandForecast.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDemandForecast.fulfilled, (state, action) => {
                state.loading = false;
                state.forecast = action.payload;
            })
            .addCase(fetchDemandForecast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchExpiryRisk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExpiryRisk.fulfilled, (state, action) => {
                state.loading = false;
                state.expiryRisk = action.payload;
            })
            .addCase(fetchExpiryRisk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default aiSlice.reducer;
