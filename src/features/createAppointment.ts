import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAppointment } from "../services/appointment";

const initialState = {
    appointment: {},
    isError: false,
    isLoading: false,
    error: ''
}

export const addAppointment = createAsyncThunk(
    'appointment/addAppointment',
    async (data: any) => {
        const response = await createAppointment(data);
        return response.data;
    }
);

const createAppointmentSlice = createSlice({
    name: 'createAppointment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAppointment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.appointment = action.payload;
            })
            .addCase(addAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message as string;
            })
    }
});

export default createAppointmentSlice.reducer;