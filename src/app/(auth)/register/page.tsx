'use client';
import React, { useState } from "react";
import IconApp from "@/../public/icon-software.png";
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
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageDesktop from "./pageDesktop";

export default function RegisterComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formErrors, setFormErrors] = useState<FormErrorsRegister>({
        username: [],
        email: [],
        password: [],
        confirm_password: [],
        password_security: [],
        password_match: [],
    });

    const { push } = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const isUsernameError = (formErrors.username ?? []).length > 0;
    const isEmailError = (formErrors.email ?? []).length > 0;
    const isPasswordError = (formErrors.password ?? []).length > 0;
    const isConfirmPasswordError = (formErrors.confirm_password ?? []).length > 0;

    const handleValidation = (errors: { email: string[]; password: string[]; confirm_password: string[]; username: string[]; password_security: string[]; password_match: string[] }) => {
        setFormErrors({
            username: errors.username || [],
            email: errors.email || [],
            password: errors.password || [],
            confirm_password: errors.confirm_password || [],
            password_security: errors.password_security || [],
            password_match: errors.password_match || [],
        });
    };


    const { mutate } = useMutation({
        mutationFn: async (data: RegisterInput) => {
            const response = await axiosInstance.post("/auth/register", data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            handleValidation({
                username: [],
                email: [],
                password: [],
                confirm_password: [],
                password_security: [],
                password_match: [],
            })
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    username: err.response?.data?.errors?.username ?? [],
                    email: err.response?.data?.errors?.email ?? [],
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
            push('/account-active/sent?token=' + dataApi.token.token_web);
        },
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            provider: "auth_internal",
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { username, email, password, confirm_password } = values;
                mutate({
                    username,
                    email,
                    password,
                    confirm_password,
                    provider: "auth_internal",
                } as RegisterInput);
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
                        <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                            <div className={`relative rounded-md ${!isUsernameError ? 'mb-3' : ''}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User size={20} />
                                </div>

                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    placeholder="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    className={`block w-full rounded-md border ${isUsernameError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                                />
                            </div>

                            {isUsernameError && (
                                <p className="text-[10px] text-right me-3 text-[#C10007] mb-1">Username is required</p>
                            )}

                            <div className={`relative rounded-md ${!isEmailError ? 'mb-3' : ''}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    placeholder="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className={`block w-full rounded-md border ${isEmailError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                                />
                            </div>
                            {isEmailError && (
                                <p className="text-[10px] text-right me-3 text-[#C10007] mb-1">Email is required</p>
                            )}

                            <div className={`relative rounded-md ${!isPasswordError ? 'mb-3' : ''}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className={`block w-full rounded-md border ${isPasswordError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                                />
                                <button
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                                    type="button"
                                >
                                    {!showPassword ? (
                                        <Eye size={20} />
                                    ) : (
                                        <EyeOff size={20} />
                                    )}
                                </button>
                            </div>
                            {isPasswordError && (
                                <p className="text-[10px] text-right me-3 text-[#C10007] mb-1">Password is required</p>
                            )}

                            <div className={`relative rounded-md ${!isConfirmPasswordError ? 'mb-5' : ''}`}>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
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
                                    {!showPassword ? (
                                        <Eye size={20} />
                                    ) : (
                                        <EyeOff size={20} />
                                    )}
                                </button>
                            </div>
                            {isConfirmPasswordError && (
                                <p className="text-[10px] text-right me-3 text-[#C10007] mb-4">Password is required</p>
                            )}

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-1" type="submit">
                                Register
                            </Button>
                        </form>
                        <div className="text-left text-[#000000] mt-0 text-[12px] flex flex-row gap-1">
                            Already have an account?{" "}
                            <Link href="/login">
                                <p className="text-blue-600 hover:underline">Login</p>
                            </Link>
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
        <PageDesktop RegisterFormik={formik} showPassword={showPassword} showConfirmPassword={showConfirmPassword} togglePasswordVisibility={togglePasswordVisibility} toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility} />
    );
};
