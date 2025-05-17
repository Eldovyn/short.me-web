'use client'
import {
    Card,
    CardFooter,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Email from '@/../public/email.png'
import { Button } from "@/components/ui/button"
import { usePageEmailVerification } from "@/api/account-active/AccountActive"
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}


const AccountActiveSentPage = () => {
    const { push } = useRouter();

    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const urlToken = searchParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, [searchParams]);

    const { data: dataPageEmailVerification } = usePageEmailVerification(token || "");

    const handleResendVerification = async () => {
        setIsLoading(true);
        if (!dataPageEmailVerification?.user?.email) {
            console.warn("Email belum tersedia");
            return;
        }

        try {
            const response = await axiosInstance.post(
                "/short.me/account-active",
                { email: dataPageEmailVerification.user.email },
                { headers: { "Content-Type": "application/json" } }
            );
            const data = response.data;
            setTimeout(() => {
                push(`/account-active/sent?token=${data.data.token_web}`);
            }, 5000);
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            console.error("Terjadi kesalahan:", error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
                <Card className="sm:w-[50%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
                    <CardHeader>
                        <CardTitle className="flex flex-col justify-center items-center">
                            <Image src={Email} alt="Email" width={100} height={100} />
                            <h1 className="text-2xl font-bold">Verify your email address</h1>
                        </CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto text-gray-500" />
                    <CardContent className="w-full text-center">
                        <p className="text-sm">{`we have sent a verification link to your email ${dataPageEmailVerification?.user?.email}`}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white cursor-pointer" onClick={isLoading ? () => { } : handleResendVerification }>Resend</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default AccountActiveSentPage