import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const useGetAccountActiveActivation = (
    token: string,
) => {
    const cacheKey = 'account-active-activation';

    const initialETag = typeof window !== "undefined" ? localStorage.getItem(`${cacheKey}-etag`) : null;
    const initialCachedData = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem(`${cacheKey}-data`) || "null")
        : null;

    const [etag, setETag] = useState<string | null>(initialETag);
    const [cachedData, setCachedData] = useState<ApiResponse | null>(initialCachedData);

    return useQuery<ApiResponse>({
        queryKey: ["useGetAccountActiveActivation", token],
        queryFn: async () => {
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (etag) headers["If-None-Match"] = etag;

            const response = await axiosInstance.get<ApiResponse>(`/auth/account-active/activation/${token}`, {
                headers,
                validateStatus: () => true,
            });

            if (response.status === 304 && cachedData) return cachedData;

            if (response.status === 200) {
                const newETag = response.headers["etag"];
                const newData = response.data;

                if (newETag && newETag !== etag) {
                    localStorage.setItem(`${cacheKey}-etag`, newETag);
                    setETag(newETag);
                }

                localStorage.setItem(`${cacheKey}-data`, JSON.stringify(newData));
                setCachedData(newData);

                return newData;
            }

            throw new Error("Failed to fetch testimoni data");
        },
        enabled: typeof window !== "undefined",
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 0,
    });
};

export { useGetAccountActiveActivation };
