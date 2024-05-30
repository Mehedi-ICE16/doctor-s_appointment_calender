import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getOneAppointment } from "../services/appointment";

const initialState = {
    isLoading: false,
    isError: false,
    appointment: {},
    error: '' 
}

export const fetchAppointment = createAsyncThunk( 'fetchAppointment', async (id: string | undefined) => {
    try {
        const response = getOneAppointment(id);
        console.log(response);
        return response;
    } catch(err) {
        console.log(err);
        throw err;
    }
});

const fetchAppointmentSlice = createSlice({
    name: 'fetchAppointment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAppointment.pending,(state) => {
            state.isLoading = true;
            state.isError = false,
            state.error = ''
        }
        )
        .addCase(fetchAppointment.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.appointment = action.payload;
        })
        .addCase( fetchAppointment.rejected, (state,action) => {
            state.isLoading = false;
            state.appointment = {};
            state.isError = true;
            state.error = action.error?.message as string;
        })
    }
})

export default fetchAppointmentSlice.reducer;