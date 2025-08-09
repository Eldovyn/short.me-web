'use client';
import React, { useState, useEffect, useRef } from "react";
import IconApp from "@/../public/icon-software.png";
import IconApp1 from "@/../public/icon software (1).png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMediaQuery } from 'react-responsive'
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

export default function RegisterComponent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [remaining, setRemaining] = useState<number | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { push } = useRouter();

    useEffect(() => {
        if (!token) return;

        socketRef.current = io("http://localhost:5000/reset-password-changed", {
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("Connected to socket");
            socketRef.current?.emit("join", { token });
        });

        socketRef.current.on("countdown", (data: { remaining: number }) => {
            console.log(data.remaining);
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

    const [formErrors, setFormErrors] = useState<FormErrorsResetPassword>({
        password: [],
        confirm_password: [],
        password_security: [],
        password_match: [],
    });

    const handleValidation = (errors: FormErrorsResetPassword) => {
        setFormErrors({
            password: errors.password,
            confirm_password: errors.confirm_password,
            password_security: errors.password_security,
            password_match: errors.password_match,
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: ResetPasswordInput) => {
            const response = await axiosInstance.post(`/auth/reset-password/password-changed/${token}`, data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ApiResponse>;
            handleValidation({
                password: [],
                confirm_password: [],
                password_security: [],
                password_match: [],
            })
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    password: err.response?.data?.errors?.password ?? [],
                    confirm_password: err.response?.data?.errors?.confirm_password ?? [],
                    password_security: err.response?.data?.errors?.password_security ?? [],
                    password_match: err.response?.data?.errors?.password_match ?? [],
                });
                toast.error(err.response?.data?.message);
                return;
            }
            toast.error(err.response?.data?.message);
            return;
        },
        onSuccess: async (data) => {
            const dataApi = data.data;
            toast(dataApi.message);
            push('/login');
        },
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            confirm_password: "",
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { password, confirm_password } = values;
                mutate({
                    password,
                    confirm_password
                } as ResetPasswordInput);
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const isPasswordError = (formErrors.password ?? []).length > 0;;
    const isConfirmPasswordError = (formErrors.confirm_password ?? []).length > 0;;
    const isPasswordSecurityError = (formErrors.password_security ?? []).length > 0;;
    const isPasswordMatchError = (formErrors.password_match ?? []).length > 0;;

    if ((isSm || isMd || isDefault) && !isLg) {
        return (
            <div className={`${isMd ? 'min-h-screen' : 'h-screen'} bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6`}>
                <Card className="w-full max-w-sm sm:max-w-md bg-gray-50 border-none shadow-none">
                    <CardHeader className="flex flex-col space-y-4 mt-10 relative">
                        <div className="mx-auto w-50 h-50 relative">
                            <Image
                                src={IconApp}
                                alt="icon-app"
                                fill
                                className="object-contain object-top"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                            />
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <h1 className="text-lg font-semibold text-gray-900 text-left mb-4">
                            Reset your password
                        </h1>
                        <form action="" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                            <div className={`relative rounded-md ${isPasswordError ? 'mb-0' : 'mb-3'}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    name="password"
                                    placeholder="password"
                                    className={`block w-full rounded-md border ${isPasswordError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                                />
                                <button
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                                    type="button"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                            {isPasswordError && (
                                <p className={`text-[10px] text-right me-3 text-[#C10007] ${isPasswordError ? 'mb-2' : ''}`}>
                                    {(() => {
                                        switch (formErrors.password?.[0]) {
                                            case "IS_REQUIRED":
                                                return "password is required";
                                            default:
                                                return "password is invalid";
                                        }
                                    })()}
                                </p>
                            )}

                            <div className={`relative rounded-md ${(isConfirmPasswordError || isPasswordMatchError || isPasswordSecurityError) ? 'mb-0' : 'mb-5'}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formik.values.confirm_password}
                                    name="confirm_password"
                                    onChange={formik.handleChange}
                                    placeholder="confirm password"
                                    className={`block w-full rounded-md border ${isConfirmPasswordError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                                />
                                <button
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                                    type="button"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                            {(isPasswordError || isPasswordSecurityError || isPasswordMatchError) && (
                                <p className={`text-[10px] text-right me-3 text-[#C10007] mb-3`}>
                                    {(() => {
                                        if (formErrors.password?.[0] === "IS_REQUIRED") {
                                            return "password is required";
                                        } else if (formErrors.password_security?.[0] === "NO_CAPITAL") {
                                            return "password at least one capital letter";
                                        } else if (formErrors.password_security?.[0] === "NO_LOWERCASE") {
                                            return "password at least one lowercase letter";
                                        } else if (formErrors.password_security?.[0] === "NO_NUMBER") {
                                            return "password at least one number";
                                        } else if (formErrors.password_security?.[0] === "NO_SYMBOL") {
                                            return "password at least one symbol";
                                        } else if (formErrors.password_match?.[0] === "IS_MISMATCH") {
                                            return "passwords do not match";
                                        } else {
                                            return "password invalid";
                                        }
                                    })()}
                                </p>
                            )}

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-1" type="submit">
                                Update Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex items-center justify-center bg-black">
                <Image
                    src={IconApp1}
                    alt="logo-trenalyze"
                    width={600}
                    height={600}
                    className="mb-4"
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">

                <form className="w-full max-w-md space-y-4" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                    <p className="text-[15px] mb-2 self-start">Welcome to short.me</p>
                    <h1 className="text-[25px] font-semibold mb-8 self-start">Reset your password</h1>
                    <div className={`relative rounded-md ${isPasswordError ? 'mb-0' : ''}`}>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock size={20} />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="password"
                            name="password"
                            className={`block w-full rounded-md border ${isPasswordError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                        />
                        <button
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                            type="button"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                    {isPasswordError && (
                        <p className={`text-[10px] text-right me-3 text-[#C10007] ${isPasswordError ? 'mb-2' : ''}`}>
                            {(() => {
                                switch (formErrors.password?.[0]) {
                                    case "IS_REQUIRED":
                                        return "password is required";
                                    default:
                                        return "password invalid";
                                }
                            })()}
                        </p>
                    )}
                    <div className={`relative rounded-md ${(isConfirmPasswordError || isPasswordMatchError || isPasswordSecurityError) ? 'mb-0' : 'mb-5'}`}>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock size={20} />
                        </div>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            name="confirm_password"
                            placeholder="confirm password"
                            className={`block w-full rounded-md border ${isConfirmPasswordError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                        />
                        <button
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                            type="button"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                    {(isPasswordError || isPasswordSecurityError || isPasswordMatchError) && (
                        <p
                            className={`text-[10px] text-right me-3 text-[#C10007] mb-3`}
                        >
                            {(() => {
                                if (formErrors.password?.[0] === "IS_REQUIRED") {
                                    return "password is required";
                                } else if (formErrors.password_security?.[0] === "NO_CAPITAL") {
                                    return "password at least one capital letter";
                                } else if (formErrors.password_security?.[0] === "NO_LOWERCASE") {
                                    return "password at least one lowercase letter";
                                } else if (formErrors.password_security?.[0] === "NO_NUMBER") {
                                    return "password at least one number";
                                } else if (formErrors.password_security?.[0] === "NO_SYMBOL") {
                                    return "password at least one symbol";
                                } else if (formErrors.password_match?.[0] === "IS_MISMATCH") {
                                    return "passwords do not match";
                                } else {
                                    return "password invalid";
                                }
                            })()}
                        </p>
                    )}


                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg" type="submit">
                        Update Password
                    </button>
                    {remaining !== null
                        ? `Countdown: ${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')}`
                        : ""}
                </form>
            </div>
        </div>
    );
};
