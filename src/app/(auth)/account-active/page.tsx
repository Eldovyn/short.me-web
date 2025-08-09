'use client';
import React, { useState, useEffect, useRef } from "react";
import IconApp1 from "@/../public/icon software (1).png";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "next/navigation";
import { useGetAccountActiveActivation } from "@/hooks/account-active/account_active_activation";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { io, Socket } from "socket.io-client";
import { formatTime } from "@/utils/formatTime";

const EmailVerification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [remaining, setRemaining] = useState<number | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { push } = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { data } = useGetAccountActiveActivation(token as string);

    const [formErrors, setFormErrors] = useState<{ otp: string[] }>({
        otp: [],
    });

    const handleValidation = (errors: { otp: string[] }) => {
        setFormErrors({
            otp: errors.otp || [],
        });
    };

    const isOtpError = (formErrors.otp ?? []).length > 0;

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        if (!token) return;

        socketRef.current = io("http://localhost:5000/account-activation", {
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
            toast.error("your session expired, please request a new session.");
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

    const { mutate } = useMutation({
        mutationFn: async (data: { otp: string }) => {
            const response = await axiosInstance.post(`/auth/account-active/activation/${token}`, data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<any>;
            handleValidation({ otp: [] });
            if ((err.response?.status === 400 && err.response.data.errors) || (err.response?.status === 422 && err.response.data.errors)) {
                handleValidation({ otp: err.response?.data?.errors?.otp ?? [] });
                if (isMd) {
                    
                }
                toast.error(err.response?.data?.message);
                return;
            }
            toast.error(err.response?.data?.message);
            return;
        },
        onSuccess: (data) => {
            toast(data.data.message);
            push('/login');
        },
    });

    const formik = useFormik({
        initialValues: {
            otp: Array(4).fill(""),
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { otp } = values;
                mutate({ otp: otp.join("") });
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleChange = (value: string, index: number) => {
        const newOtp = [...formik.values.otp];
        newOtp[index] = value;
        formik.setFieldValue("otp", newOtp);

        if (value && index < newOtp.length - 1) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const HandleResend = async () => {
        setIsLoading(true);
        const response = await axiosInstance.post(`/auth/account-active/activation/${token}/re-send`);
        if (response.status === 201) {
            toast(response.data.message);
            push('/account-active/sent?token=' + response.data.data.token_web);
        }
        setIsLoading(false);
    };

    if ((isSm || isDefault || isMd) && !isLg) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="flex bg-white p-10 rounded-[10px] flex-col">
                    <h2 className={`${isMd ? 'text-3xl' : 'text-lg'} font-bold text-center`}>Verification Code</h2>
                    <div className="flex flex-row gap-1 text-[15px] justify-center">
                        <p className="text-[#595959]">We’ve sent a code to</p>
                        <p className="font-semibold">{data?.user.email}o</p>
                    </div>
                    <br />
                    <br />

                    <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                        <div className={`flex space-x-2 ${isOtpError ? '' : 'mb-4'}`}>
                            {formik.values.otp.map((value, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    className="w-[60px] h-[60px] border border-gray-300 rounded text-center text-lg mx-auto"
                                />
                            ))}
                        </div>
                        <button
                            className={`mt-6 text-white bg-blue-600 ${isMd ? 'w-[444px]' : 'w-[314px]'} rounded-[10px] py-2`}
                            type="submit"
                        >
                            Verify
                        </button>
                        <div className="flex justify-between items-center w-full mt-4">
                            <p className="m-0">
                                Didn't you receive the otp?{" "}
                                <a
                                    href="#"
                                    className="text-blue-600"
                                    onClick={isLoading ? () => { } : HandleResend}
                                >
                                    Resend OTP
                                </a>
                            </p>
                            <h1 className="text-red-500 m-0 leading-none">
                                {remaining !== null ? formatTime(remaining) : "0:00"}
                            </h1>
                        </div>
                    </form>
                </div>

            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <div className="flex items-center justify-center w-1/2 bg-black">
                <Image
                    src={IconApp1}
                    alt="logo-trenalyze"
                    width={600}
                    height={600}
                    className="mb-4"
                />
            </div>

            <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 p-8">
                <h2 className="text-[25px] font-semibold">Please Check Your Email</h2>
                <div className="flex flex-row gap-1 text-[15px]">
                    <p className="text-[#595959]">We’ve sent a code to</p>
                    <p className="font-semibold">{data?.user.email}o</p>
                </div>
                <br />
                <br />

                <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                    <div className={`flex space-x-2 ${isOtpError ? 'mb-4' : ''}`}>
                        {formik.values.otp.map((value, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(e.target.value, index)}
                                className="w-[60px] h-[60px] border border-gray-300 rounded text-center text-lg mx-auto"
                            />
                        ))}
                    </div>
                    <div className="flex justify-between me-3 ms-3">
                        {isOtpError && (
                            <p className={`text-[12px] text-right me-3 text-red-500 ${isOtpError ? 'mb-2' : 'hidden'}`}>
                                {(() => {
                                    switch (formErrors.otp?.[0]) {
                                        case "IS_REQUIRED":
                                            return "otp is required";
                                        case "INVALID":
                                            return "invalid otp";
                                        default:
                                            return "otp error";
                                    }
                                })()}
                            </p>
                        )}

                        <h1 className="text-red-500 text-[12px] mb-2 text-right">
                            {remaining !== null ? formatTime(remaining) : "0:00"}
                        </h1>
                    </div>
                    <br />
                    <button
                        className="bg-[#1447E6] text-white w-[305px] h-[60px] rounded-lg hover:bg-blue-600 transition"
                        type="submit"
                    >
                        Verify
                    </button>
                </form>
                <p className="text-black" onClick={isLoading ? () => { } : HandleResend}>
                    Didn't you receive the otp?{' '}
                    <button className="text-[#1447E6] hover:underline cursor-pointer">
                        Resend OTP
                    </button>
                </p>
            </div>
        </div>
    );
};

export default EmailVerification;
