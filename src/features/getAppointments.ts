import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAppointments } from "../services/appointment";

const initialState = {
    appointments: [],
    isError: false,
    isLoading: false,
    error: ''
}

export const fetchAppointments = createAsyncThunk(
    'appointment/fetchAppointments',
    async () => {
        const response = await getAppointments();
        return response;
    }
);

const getAppointmentsSlice = createSlice({
    name: 'getAppointments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAppointments.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = '';
            state.appointments = [];
        })
        .addCase(fetchAppointments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.appointments = action.payload;
        })
        .addCase(fetchAppointments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message as string;
            state.appointments = [];
        })
    }
})

export default getAppointmentsSlice.reducer;