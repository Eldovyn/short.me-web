import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { User } from "@/interfaces/User";

interface ApiResponse {
    user: User
    message: string
    errors?: {
        [field: string]: string[];
    }
    data?: {
        [field: string]: string[];
    }
}


const usePageEmailVerification = (token: string) => {
    return useQuery({
        queryKey: ["page-email-verification", token],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>("/short.me/account-active/email-verification", {
                params: { token },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        },
        enabled: !!token,
        refetchOnWindowFocus: false,
        retry: false,
    });
};

const useEmailVerification = (token: string) => {
    return useQuery({
        queryKey: ["page-email-verification"],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>("/short.me/account-active/verification/email-verification", {
                params: { token },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const apa = response.data;
            console.log(apa)
            return apa
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
};

const useUserVerification = (token: string) => {
    return useQuery({
        queryKey: ["page-email-verification", token],
        queryFn: async () => {
            const response = await axiosInstance.patch<ApiResponse>(
                "/short.me/account-active/verification/email-verification",
                {token},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
};

export { usePageEmailVerification, useEmailVerification, useUserVerification };