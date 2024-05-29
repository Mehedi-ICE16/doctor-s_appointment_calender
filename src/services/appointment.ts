import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000"
});

export const createAppointment = async (data: any) => {
    try {
        const response = await client.post("/appointments", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getAppointments = async () => {
    try {
        const response = await client.get("/appointments");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}