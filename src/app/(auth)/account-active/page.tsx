'use client';
import React, { useState, useEffect, useRef } from "react";
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
import PageDesktop from "./pageDesktop";
import PageMobileTablet from "./pageMobileTablet";

const EmailVerification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [remaining, setRemaining] = useState<number | null>(null);

    const [socket, setSocket] = useState<Socket | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { push } = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { data, isError } = useGetAccountActiveActivation(token as string);

    if (isError) {
        push('/login');
    }

    const [formErrors, setFormErrors] = useState<FormErrorsOtp>({
        otp: [],
    });

    const handleValidation = (errors: FormErrorsOtp) => {
        setFormErrors({
            otp: errors.otp || [],
        });
    };

    const isOtpError = (formErrors.otp ?? []).length > 0;

    const isLg = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const newSocket = io("http://localhost:5000/otp-activation");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to /otp-activation namespace");
        });

        newSocket.on("validation", (data) => {
            const onSuccess = data.success;
            console.log(data);
            if (onSuccess) {
                toast.success(data.message);
                push("/login");
                return;
            }
            handleValidation({ otp: data?.errors?.otp ?? [] });
            toast.success(data.message);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

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

        socketRef.current.on("expired", (data) => {
            setRemaining(0);
            toast.error(data.message);
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
            const nextIndex = index + 1 === 2 ? index + 2 : index + 1;
            document.getElementById(`otp-${nextIndex}`)?.focus();
        }

        if (newOtp.filter((_, i) => i !== 2).every((digit) => digit !== "")) {
            const otpString = newOtp.filter((_, i) => i !== 2).join("");
            console.log("emitting OTP:", otpString);
            socket?.emit("validation", { otp: otpString, token });
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

    if (isLg) {
        return <PageDesktop HandleResend={HandleResend} remaining={remaining} handleChange={handleChange} formErrors={formErrors} data={data ?? null} formik={formik} isOtpError={isOtpError} isLoading={isLoading} />
    }

    return <PageMobileTablet HandleResend={HandleResend} remaining={remaining} handleChange={handleChange} formErrors={formErrors} data={data ?? null} formik={formik} isOtpError={isOtpError} isLoading={isLoading} />
};

export default EmailVerification;
