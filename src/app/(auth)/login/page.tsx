'use client';
import React, { useState } from "react";
import IconApp from "@/../public/icon-software.png";
import IconApp1 from "@/../public/icon software (1).png";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import IconGoogle from "@/../public/images__1_-removebg-preview 2.png";
import IconDiscord from "@/../public/discord-icon-blue-discord-logo-for-chatting-and-communication-RA6Qd2f8_t-removebg-preview 2.png";
import Image from "next/image";
import { useMediaQuery } from 'react-responsive'
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const { push } = useRouter();

    const [formErrors, setFormErrors] = useState<FormErrorsLogin>({
        email: [],
        password: [],
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const isEmailError = (formErrors.email ?? []).length > 0;
    const isPasswordError = (formErrors.password ?? []).length > 0;

    const handleValidation = (errors: { email: string[]; password: string[]; }) => {
        setFormErrors({
            email: errors.email || [],
            password: errors.password || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: LoginInput) => {
            const response = await axiosInstance.post("/auth/login", data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ApiResponse>;
            handleValidation({
                email: [],
                password: [],
            })
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    email: err.response?.data?.errors?.email ?? [],
                    password: err.response?.data?.errors?.password ?? [],
                });
                toast.error(err.response?.data?.message);
                return;
            }
            if (err.response?.status === 403) {
                toast.error(err.response?.data?.message);
                push('/account-active/sent?token=' + err.response?.data?.token?.token_web);
                return;
            }
            toast.error(err.response?.data?.message);
            return;
        },
        onSuccess: async (data) => {
            const dataApi = data.data;
            toast(dataApi.message);
        },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            provider: "auth_internal",
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { email, password } = values;
                mutate({
                    email,
                    password,
                    provider: "auth_internal",
                } as LoginInput);
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
                            Create your account
                        </h1>
                        <form action="" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                            <div className={`relative rounded-md ${isEmailError ? '' : 'mb-3'}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    placeholder="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className={`block w-full rounded-md border ${isEmailError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                                />
                            </div>
                            {isEmailError && (
                                <p className="text-[10px] text-right me-3 text-[#C10007] mb-1">Email is required</p>
                            )}

                            <div className={`relative rounded-md ${isPasswordError ? '' : 'mb-3'}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
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
                                <p className="text-[10px] text-right me-3 text-[#C10007] mb-4">Password is required</p>
                            )}

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-1" type="submit">
                                Login
                            </Button>
                        </form>
                        <div className="text-left text-[#000000] mt-0 text-[12px]">
                            Dont have an account?{" "}
                            <a href="/register" className="text-blue-600 hover:underline">
                                Register
                            </a>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col items-center gap-4 mt-2">
                        <div className="flex items-center w-full gap-2 text-gray-400 text-sm font-semibold">
                            <hr className="flex-grow me-9 border-[#000000]" />
                            <span className="text-[#000000]">OR</span>
                            <hr className="flex-grow ms-9 border-[#000000]" />
                        </div>

                        {(isSm || isDefault) && !isMd ? (
                            <div className="flex justify-center gap-6 w-full">
                                <button className="flex me-10 items-center justify-center w-[49.72px] h-[37px] border border-[#D9D9D9] rounded-[3.47px] shadow-sm hover:bg-gray-100">
                                    <Image
                                        src={IconGoogle}
                                        alt="icon-google"
                                        width={25}
                                        height={25}
                                        className="text-gray-400"
                                    />
                                </button>
                                <button className="flex ms-10 items-center justify-center w-[49.72px] h-[37px] border border-[#D9D9D9] rounded-[3.47px] shadow-sm hover:bg-gray-100">
                                    <Image
                                        src={IconDiscord}
                                        alt="icon-google"
                                        width={25}
                                        height={25}
                                        className="text-gray-400"
                                    />
                                </button>
                            </div>
                        ) : ''}
                        {isMd ? (
                            <div className="flex flex-col space-y-6 w-full">
                                <button
                                    className="flex gap-2 items-center justify-center border border-[#525252] rounded-[14.9px] h-[46px] w-full hover:bg-gray-100 transition"
                                >
                                    <Image
                                        src={IconGoogle}
                                        alt="icon-google"
                                        width={25}
                                        height={25}
                                        className="text-[#000000]"
                                    />
                                    Continue with Google
                                </button>
                                <button
                                    className="flex gap-2 items-center justify-center border border-[#525252] rounded-[14.9px] h-[46px] w-full hover:bg-gray-100 transition"
                                >
                                    <Image
                                        src={IconDiscord}
                                        alt="icon-discord"
                                        width={25}
                                        height={25}
                                        className="text-[#000000]"
                                    />
                                    Continue with Discord
                                </button>
                            </div>
                        ) : ''}
                    </CardFooter>
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
                    <h1 className="text-[25px] font-semibold mb-8 self-start">Login to your account</h1>
                    <div className={`relative rounded-md ${isEmailError ? 'mb-0' : ''}`}>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail size={20} />
                        </div>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            autoComplete="email"
                            placeholder="email"
                            className={`block w-full rounded-md border ${isEmailError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                        />
                    </div>
                    {isEmailError && (
                        <p className="text-[10px] text-right me-3 text-[#C10007]">Email is required</p>
                    )}
                    <div className={`relative rounded-md ${isPasswordError ? 'mb-0' : ''}`}>
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
                        <p className="text-[10px] text-right me-3 text-[#C10007]">Password is required</p>
                    )}

                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg mb-0" type="submit">
                        Login
                    </button>

                    <p className="text-[12px] text-left w-full">
                        Dont have an account?{" "}
                        <Link href="/register" className="text-blue-600 font-semibold underline">
                            Register
                        </Link>
                    </p>

                    <div className="flex items-center my-4 w-full mb-0 justify-center">
                        <hr className="border-[#000] w-[163px] me-10" />
                        <span className="mx-2 text-[#000] text-[18px]">OR</span>
                        <hr className="border-[#000] w-[163px] ms-10" />
                    </div>
                    <p className="text-[12px] text-right text-blue-600 cursor-pointer font-semibold w-full underline">
                        <Link href="/reset-password">Reset Password</Link>
                    </p>
                </form>

                <div className="flex space-x-4 mt-5">
                    <button className="w-[272px] me-8 border border-gray-300 h-[38.11px] rounded-lg flex items-center justify-center gap-2">
                        <Image
                            src={IconGoogle}
                            alt="icon-google"
                            width={25}
                            height={25}
                            className="text-gray-400"
                        />
                        Continue with Google
                    </button>
                    <button className="w-[272px] ms-8 border border-gray-300 h-[38.11px] rounded-lg flex items-center justify-center gap-2">
                        <Image
                            src={IconDiscord}
                            alt="icon-google"
                            width={25}
                            height={25}
                            className="text-gray-400"
                        />
                        Continue with Discord
                    </button>
                </div>
            </div>
        </div>
    );
};
