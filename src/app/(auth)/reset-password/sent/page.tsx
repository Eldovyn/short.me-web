'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import IconApp from "@/../public/icon-software.png";
import IconApp1 from "@/../public/icon software (1).png";
import { useMediaQuery } from 'react-responsive';
import { useGetResetPasswordSent } from '@/hooks/reset-password/reset_password_sent';
import { useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { io, Socket } from "socket.io-client";

const EmailVerification = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(false);
    const [remaining, setRemaining] = useState<number | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { replace, push } = useRouter();

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const { data } = useGetResetPasswordSent(token as string);

    const handleResend = async () => {
        setIsLoading(true);
        const response = await axiosInstance.post(`/auth/reset-password/request`, { email: data?.user.email });
        if (response.status === 201) {
            toast.success(response.data.message);
            replace('/reset-password/sent?token=' + response.data.data.token_web);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!token) return;

        socketRef.current = io("http://localhost:5000/reset-password-sent", {
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("Connected to socket");
            socketRef.current?.emit("join", { token });
        });

        socketRef.current.on("countdown", (data: { remaining: number }) => {
            setRemaining(data.remaining);
        });

        socketRef.current.on("expired", () => {
            setRemaining(0);
            toast.error("Your session expired, please request a new reset password.");
            push('/login');
        });

        socketRef.current.on("disconnect", () => {
            console.log("Disconnected from socket");
        });

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            socketRef.current?.disconnect();
        };
    }, [token, push]);

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
                    <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
                    <p className="text-[15px] text-black">You’re almost there! We sent an email to</p>
                    <p className="text-gray-800 font-semibold mb-20">{data?.user.email}</p>

                    <p className="text-black mb-5 text-[15px]">Just click on the link to complete your reset password.</p>

                    {/* Countdown display */}
                    <h1 className="text-red-500 mb-4">
                        {remaining !== null
                            ? `Countdown: ${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')}`
                            : ""}
                    </h1>

                    <button
                        className="w-[314px] py-2 text-white bg-[#1447E6] rounded-md hover:bg-blue-700"
                        type='button'
                        onClick={isLoading ? () => {} : handleResend}
                    >
                        <p className='text-[16px]'>
                            Resend reset password
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
                <h2 className="text-[37.74px] font-semibold">Reset Password</h2>
                <p className="mt-2 text-center text-[22.64px] text-black">
                    You’re almost there! We sent an email to
                </p>
                <p className='text-black font-semibold text-[22.64px]'>{data?.user.email}</p>
                <br />
                <br />
                <br />
                <br />
                <p className="mt-1 text-center text-black text-[22.64px]">
                    Just click on the link to complete your reset password
                </p>

                {/* Countdown display */}
                <h1 className="text-red-500 text-center mb-4">
                    {remaining !== null
                        ? `Countdown: ${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')}`
                        : ""}
                </h1>

                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 w-[473px]"
                    type='button'
                    onClick={isLoading ? () => {} : handleResend}
                >
                    Resend reset password
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
