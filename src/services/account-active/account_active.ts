import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

const getAccountActivePage = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/auth/account-active/status/${token}`, {
            headers: { "Content-Type": "application/json" },
        });
        return response;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        return error;
    }
};

const getAccountActiveEmail = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/auth/account-active/activation/${token}`, {
            headers: { "Content-Type": "application/json" },
        });
        return response;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        return error;
    }
};


export { getAccountActivePage, getAccountActiveEmail };