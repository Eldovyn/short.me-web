'use client'
import {
    Card,
    CardFooter,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGoogleLogin } from '@react-oauth/google';
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { FaGoogle } from "react-icons/fa";
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";


interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
    account_active?: {
        [field: string]: string[];
    };
}


interface FormErrors {
    username: string[];
    email: string[];
    password: string[];
    confirm_password: string[];
    password_security: string[];
    password_match: string[];
}


interface FormData {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    provider: string;
}


export default function LoginPage() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await axiosInstance.post('/short.me/login', {
                    provider: "google",
                    token: tokenResponse.access_token,
                })
                toast.success(response.data.message)
            } catch (err) {
                const error = err as AxiosError<ErrorResponse>
                toast.error(error.response?.data.message)
            }
        },
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        username: [],
        email: [],
        password: [],
        confirm_password: [],
        password_security: [],
        password_match: [],
    });

    const [showPassword, setShowPassword] = useState(false)

    const handleValidation = (errors: { email: string[]; password: string[], confirm_password: string[], username: string[], password_security: string[], password_match: string[] }) => {
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
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.post('/short.me/login', data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    username: err.response?.data?.errors?.username ?? [],
                    email: err.response?.data?.errors?.email ?? [],
                    password: err.response?.data?.errors?.password ?? [],
                    confirm_password: err.response?.data?.errors?.confirm_password ?? [],
                    password_security: err.response?.data?.errors?.password_security ?? [],
                    password_match: err.response?.data?.errors?.password_match ?? [],
                });
                toast.error(err?.response?.data?.message)
                return
            }
            if (err.response?.status === 403) {
                toast.error("user is inactive")
                return
            }
            toast.error(err?.response?.data?.message)
            return
        },
        onSuccess: async (data) => {
            const dataApi = data.data
            toast.success(dataApi.message)
        },
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            provider: "auth_internal",
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { username, email, password, confirm_password } = values
                mutate({
                    username,
                    email,
                    password,
                    confirm_password,
                    provider: "auth_internal",
                })
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    })

    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
                <Card className="sm:w-[50%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
                    <CardHeader>
                        <CardTitle className="text-black text-center text-2xl font-bold">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold">Login With</h2>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => login()}
                                        className="w-10 h-10 rounded-md border-black cursor-pointer hover:bg-black hover:text-white"
                                    >
                                        <FaGoogle className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div >
                        </CardTitle>
                    </CardHeader>
                    <div className="flex items-center justify-center w-[75%] mx-auto">
                        <div className="w-full h-px bg-gray-300"></div>
                        <span className="px-3 text-sm text-gray-500">or</span>
                        <div className="w-full h-px bg-gray-300"></div>
                    </div>
                    <CardContent>
                        <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit} className="flex flex-col gap-1">
                            <Input className={`${formErrors.password.length > 0 || formErrors.password_security.length > 0 ? "border-red-500" : "border-gray-900"} text-black mx-auto mb-1 w-[70%]`} placeholder="Email" name="email" onChange={formik.handleChange} value={formik.values.email} type="text" />
                            {formErrors.email.map((error, index) => (
                                error === 'FIELD_REQUIRED' ? (
                                    <p key={index} className="text-red-500 text-sm ms-19">email is required</p>
                                ) : null
                            ))}
                            {formErrors.email.map((error, index) => (
                                error === 'FIELD_INVALID' ? (
                                    <p key={index} className="text-red-500 text-sm ms-19">email is invalid</p>
                                ) : null
                            ))}
                            <div className="flex-row w-full">
                                <div className="relative w-[70%] mx-auto">
                                    <Input
                                        className={`${formErrors.password.length > 0 || formErrors.password_security.length > 0 ? "border-red-500" : "border-gray-900"} text-black mx-auto mb-1`}
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        placeholder='Password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                {formErrors.password.map((error, index) => (
                                    error === 'FIELD_REQUIRED' ? (
                                        <p key={index} className="text-red-500 text-sm ms-19">password is required</p>
                                    ) : null
                                ))}
                            </div>
                            <Button className="w-[70%] mx-auto">Login</Button>
                        </form>
                        <p className="text-sm text-right me-20 mt-2 underline text-blue-500 cursor-pointer" onClick={() => { window.location.href = "/reset-password" }}>reset password</p>
                    </CardContent>
                    <hr className="w-[75%] mx-auto" />
                    <CardFooter>
                        <div className="w-full flex flex-col justify-center items-center">
                            <p className="text-sm text-center mb-3">
                                Don&apos;t have an account?
                            </p>
                            <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white cursor-pointer" onClick={() => { window.location.href = "/register" }}>Register</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
