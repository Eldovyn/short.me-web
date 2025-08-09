'use client';
import React, { useState } from "react";
import IconApp from "@/../public/icon-software.png";
import IconApp1 from "@/../public/icon software (1).png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMediaQuery } from 'react-responsive'
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

export default function RegisterComponent() {
    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const { push } = useRouter();

    const [formErrors, setFormErrors] = useState<FormErrorsForgotPassword>({
        email: [],
    });

    const handleValidation = (errors: { email: string[] }) => {
        setFormErrors({
            email: errors.email || [],
        });
    };

    const isEmailError = (formErrors.email ?? []).length > 0;

    const { mutate } = useMutation({
        mutationFn: async (data: ForgotPasswordInput) => {
            const response = await axiosInstance.post("/auth/reset-password/request", data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ApiResponse>;
            handleValidation({
                email: [],
            });
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    email: err.response?.data?.errors?.email ?? [],
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
            push('/reset-password/sent?token=' + dataApi.data.token_web);
        },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { email } = values;
                mutate({
                    email,
                } as ForgotPasswordInput);
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

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
                            Reset password your account
                        </h1>
                        <form action="">
                            <div className={`relative rounded-md ${isEmailError ? 'mb-0' : ''}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    placeholder="email"
                                    className={`block w-full rounded-md border ${isEmailError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                                />
                            </div>
                            {isEmailError && (
                                <p className={`text-[10px] text-right me-3 text-[#C10007] ${isEmailError ? 'mb-2' : ''}`}>
                                    {(() => {
                                        switch (formErrors.email?.[0]) {
                                            case "IS_REQUIRED":
                                                return "email is required";
                                            case "IS_INVALID":
                                                return "invalid email";
                                            default:
                                                return "invalid email";
                                        }
                                    })()}
                                </p>
                            )}

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-1">
                                Reset Password
                            </Button>
                        </form>
                        <div className="text-left text-[#000000] mt-0 text-[12px]">
                            Dont have an account?{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Register
                            </a>
                        </div>
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
                    <h1 className="text-[25px] font-semibold mb-8 self-start">Reset password your account</h1>
                    <div className={`relative rounded-md ${isEmailError ? 'mb-0' : ''}`}>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail size={20} />
                        </div>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            autoComplete="email"
                            placeholder="email"
                            className={`block w-full rounded-md border ${isEmailError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                        />
                    </div>
                    {isEmailError && (
                        <p className={`text-[10px] text-right me-3 text-[#C10007] ${isEmailError ? 'mb-2' : ''}`}>
                            {(() => {
                                switch (formErrors.email?.[0]) {
                                    case "IS_REQUIRED":
                                        return "email is required";
                                    case "IS_INVALID":
                                        return "invalid email";
                                    default:
                                        return "invalid email";
                                }
                            })()}
                        </p>
                    )}

                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg mb-0" type="submit">
                        Reset Password
                    </button>

                    <p className="text-[12px] text-left w-full">
                        Dont have an account?{" "}
                        <a href="/register" className="text-blue-600 font-semibold">
                            register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};
