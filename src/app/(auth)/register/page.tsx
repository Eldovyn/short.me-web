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
import { useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner"
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from "react-icons/fa"
import { Progress } from "@/components/ui/progress"


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

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}


export default function RegisterPage() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await axiosInstance.post('/short.me/register', {
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
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
            const response = await axiosInstance.post('/short.me/register', data);
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
                toast(err?.response?.data?.message)
                return
            }
            if (err.response?.status === 403) {
                toast("user is inactive")
            }
            toast(err?.response?.data?.message)
            return
        },
        onSuccess: async (data) => {
            const dataApi = data.data
            toast(dataApi.message)
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
                <Card className="w-[30%]">
                    <CardHeader>
                        <CardTitle className="text-black text-center text-2xl font-bold">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold">Register With</h2>
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
                        <form action="" className="flex flex-col items-center gap-2" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                            <div className="flex-row w-full">
                                <Input className={`w-[70%] ${formErrors.username.length > 0 ? "border-red-500" : "border-gray-900"} text-black mx-auto mb-1`} placeholder="Username" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} />
                                {formErrors.username.map((error, index) => (
                                    error === 'FIELD_REQUIRED' ? (
                                        <p key={index} className="text-red-500 text-sm ms-19">username is required</p>
                                    ) : null
                                ))}
                            </div>
                            <div className="flex-row w-full">
                                <Input className={`w-[70%] ${formErrors.email.length > 0 ? "border-red-500" : "border-gray-900"} text-black mx-auto mb-1`} placeholder="email" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
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
                            </div>
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
                                <Progress
                                    className="w-[70%] mx-auto"
                                    value={formErrors.password_security && formErrors.password_security.length > 0
                                        ? Math.max(0, 100 - formErrors.password_security.length * 20)
                                        : 0}
                                />
                                {formErrors.password.map((error, index) => (
                                    error === 'FIELD_REQUIRED' ? (
                                        <p key={index} className="text-red-500 text-sm ms-19">password is required</p>
                                    ) : null
                                ))}
                            </div>
                            <div className="flex-row w-full">
                                <div className="relative w-[70%] mx-auto">
                                    <Input
                                        className={`${formErrors.confirm_password.length > 0 || formErrors.password_security.length > 0 ? "border-red-500" : "border-gray-900"} text-black mx-auto mb-1`}
                                        type={showConfirmPassword ? "text" : "password"}
                                        name='confirm_password'
                                        placeholder='Password'
                                        value={formik.values.confirm_password}
                                        onChange={formik.handleChange}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                <Progress
                                    className="w-[70%] mx-auto"
                                    value={formErrors.password_security && formErrors.password_security.length > 0
                                        ? Math.max(0, 100 - formErrors.password_security.length * 20)
                                        : 0}
                                />
                                {formErrors.confirm_password.map((error, index) => (
                                    error === 'FIELD_REQUIRED' ? (
                                        <p key={index} className="text-red-500 text-sm ms-19">confirm password is required</p>
                                    ) : null
                                ))}
                                {formErrors.password_match.map((error, index) => (
                                    error === 'PASSWORD_MISMATCH' ? (
                                        <p key={index} className="text-red-500 text-sm ms-19">password is not match</p>
                                    ) : null
                                ))}
                            </div>
                            <Button className="w-[70%] mx-auto" type="submit">Register</Button>
                        </form>
                    </CardContent>
                    <hr className="w-[75%] mx-auto" />
                    <CardFooter>
                        <div className="w-full flex flex-col justify-center items-center">
                            <p className="text-sm text-center mb-3">
                                Already have an account?
                            </p>
                            <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white">Login</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
