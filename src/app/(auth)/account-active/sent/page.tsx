'use client';
import React, { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import IconApp from "@/../public/icon-software.png";
import IconApp1 from "@/../public/icon software (1).png";
import { useMediaQuery } from 'react-responsive';
import { useGetAccountActiveSent } from '@/hooks/account-active/account_active_sent';
import { useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { io, Socket } from "socket.io-client";
import { formatTime } from "@/utils/formatTime";

const EmailVerification = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [remaining, setRemaining] = useState<number | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const { replace, push } = useRouter();
    const { data } = useGetAccountActiveSent(token as string);

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const handleResend = async () => {
        setIsLoading(true);
        const response = await axiosInstance.post(`/auth/account-active/request`, { email: data?.user.email });
        if (response.status === 201) {
            toast.success(response.data.message);
            replace('/account-active/sent?token=' + response.data.data.token_web);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!token) return;

        socketRef.current = io("http://localhost:5000/account-active-sent", {
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("Connected to socket");
            socketRef.current?.emit("join", { token });
        });

        socketRef.current.on("countdown", (data: { remaining: number }) => {
            console.log(data);
            setRemaining(data.remaining);
        });

        socketRef.current.on("expired", () => {
            setRemaining(0);
            toast.error("your session expired, please request a new session.");
            push('/login')
        });

        socketRef.current.on("disconnect", () => {
            console.log("Disconnected from socket");
        });

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            socketRef.current?.disconnect();
        };
    }, [token]);

    useEffect(() => {
        if (remaining === null) return;

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setRemaining((prev) => {
                if (prev === null || prev <= 0) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [remaining]);

    if ((isSm || isMd || isDefault) && !isLg) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F7]">
                <div className="mb-8">
                    <Image
                        src={IconApp}
                        alt="icon-app"
                        width={200}
                        height={200}
                    />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Please Verify Your Email</h2>
                    <p className="text-[15px] text-black">You’re almost there! We sent an email to</p>
                    <p className="text-gray-800 font-semibold mb-5">{data?.user.email}</p>

                    <p className="text-black mb-5 text-[15px]">Just click on the link to complete your reset password.</p>
                    <button
                        className="w-[314px] py-2 text-white bg-[#1447E6] rounded-md hover:bg-blue-700"
                        type='button'
                        onClick={isLoading ? () => { } : handleResend}
                    >
                        <p className='text-[16px]'>
                            Resend Verification Email
                        </p>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 bg-black flex items-center justify-center">
                <Image
                    src={IconApp1}
                    alt="logo-trenalyze"
                    width={600}
                    height={600}
                    className="mb-4"
                />
            </div>

            <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-8">
                <h2 className="text-[25px] font-semibold">Please Check Your Email</h2>
                <div className="flex flex-row gap-1 text-[15px]">
                    <p className="text-[#595959]">We’ve sent a code to</p>
                    <p className="font-semibold">{data?.user.email}o</p>
                </div>

                <p className="mt-6 text-center text-black text-[22.64px]">
                    Just click on the link to complete your reset password
                </p>

                <h1 className="text-red-500">Countdown: {remaining !== null ? formatTime(remaining) : "0:00"}</h1>
                <button
                    className="mt-4 bg-[#1447E6] text-white font-semibold rounded-lg hover:bg-[#1447E6] w-[473px] h-[66px] text-[25px]"
                    type='button'
                    onClick={isLoading ? () => { } : handleResend}
                >
                    Resend Verification Email
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
