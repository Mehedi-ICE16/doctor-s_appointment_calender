import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box,Text } from "@chakra-ui/react";
import { fetchAppointment } from "../features/getOneAppointment"; 
export const AppointmentDetails = () => {

    const { id } = useParams();
    console.log(id);
    const { appointment } = useSelector( (state: any) => state.fetchAppointment);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchAppointment(id) as any)
    },[dispatch]);
    appointment &&  console.log(appointment);
    return (
        <Box >
            <Text m="5dvh" fontSize={'2xl'}>Patient's Name: {appointment && appointment.name}</Text>
            <Text m="1dvh" fontSize={'xl'}>Patient's Gender: {appointment && appointment.gender}</Text>
            <Text m="1dvh" fontSize={'xl'}>Patient's age: {appointment && appointment.age}</Text>
            <Text m="1dvh" fontSize={'xl'}>Appointment Date: {appointment && appointment.date}</Text>
            <Text m="1dvh" fontSize={'xl'}>Appointment Time: {appointment && appointment.time}</Text>
        </Box>
    )
}