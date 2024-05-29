import { configureStore } from '@reduxjs/toolkit';
import createAppointmentSlice from '../features/createAppointment';
import getAppointmentsSlice from '../features/getAppointments';

export const store = configureStore({
    reducer: {
        createAppointment: createAppointmentSlice,
        getAppointments: getAppointmentsSlice
    },
})