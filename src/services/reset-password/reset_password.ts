import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

const getResetPasswordPage = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/auth/reset-password/status/${token}`, {
            headers: { "Content-Type": "application/json" },
        });
        return response;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        return error;
    }
};

const getResetPasswordEmail = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/auth/reset-password/password-changed/${token}`, {
            headers: { "Content-Type": "application/json" },
        });
        return response;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        return error;
    }
};


export { getResetPasswordPage, getResetPasswordEmail };