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
            const response = await axiosInstance.get<ApiResponse>(`/short.me/auth/account-active/status/${token}`, {
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

const useUserVerification = (token: string) => {
    return useQuery({
        queryKey: ["page-email-verification", token],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>(
                `/short.me/auth/account-active/verify/${token}`,
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

export { usePageEmailVerification, useUserVerification };