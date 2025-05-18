'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Tick from '@/../public/tick.png'
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useUserVerification } from "@/api/account-active/AccountActive";

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}


const AccountActiveSentPage = () => {
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const token = searchParams.get("token");

    const { data: dataPageEmailVerification } = useUserVerification(token || "");

    console.log(dataPageEmailVerification);

    useEffect(() => {
        const checkVerification = async () => {
            if (!token) return push("/login");

            try {
                const response = await axiosInstance.patch(`/short.me/auth/account-active/active/${token}`, {
                    headers: { "Content-Type": "application/json" }
                })
                push("/login");
                return response.data?.data
            } catch (err) {
                const error = err as AxiosError<ErrorResponse>
                console.error('Terjadi kesalahan:', error);
                push("/login");
            }
        };

        const timer = setTimeout(() => {
            checkVerification();
        }, 5000);

        return () => clearTimeout(timer);
    }, [token, push]);

    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
                <Card className="sm:w-[50%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
                    <CardHeader>
                        <CardTitle className="flex flex-col justify-center items-center">
                            <Image src={Tick} alt="tick" width={100} height={100} />
                            <h1 className="text-2xl font-bold text-center">{`success verification ${dataPageEmailVerification?.user?.username}`}</h1>
                        </CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto text-gray-500" />
                    <CardContent className="w-full text-center">
                        <p className="text-sm">{`your email ${dataPageEmailVerification?.user?.email} has been verified`}</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AccountActiveSentPage