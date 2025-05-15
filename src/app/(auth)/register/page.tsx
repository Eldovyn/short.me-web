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


interface FormErrors {
    username: string[];
    email: string[];
    password: string[];
    confirm_password: string[];
}


interface FormData {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}


export default function RegisterPage() {
    const [formErrors, setFormErrors] = useState<FormErrors>({
        username: [],
        email: [],
        password: [],
        confirm_password: [],
    });

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleValidation = (errors: { email: string[]; password: string[], confirm_password: string[], username: string[] }) => {
        setFormErrors({
            username: errors.username || [],
            email: errors.email || [],
            password: errors.password || [],
            confirm_password: errors.confirm_password || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.post('/short.me/register', data);
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            const data = err?.response?.data
            console.log(data)
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    username: err.response?.data?.errors?.username ?? [],
                    email: err.response?.data?.errors?.email ?? [],
                    password: err.response?.data?.errors?.password ?? [],
                    confirm_password: err.response?.data?.errors?.confirm_password ?? [],
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
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { username, email, password, confirm_password } = values
                mutate({
                    username,
                    email,
                    password,
                    confirm_password
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
                        <CardTitle className="text-black text-center text-2xl font-bold">Create your account</CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto" />
                    <CardContent>
                        <form action="" className="flex flex-col items-center gap-2" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                            <Input className="w-[70%] border-gray-900 text-black" placeholder="Username" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} />
                            <Input className="w-[70%] border-gray-900 text-black" placeholder="Email" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
                            <div className="relative w-[70%]">
                                <Input
                                    className="border-gray-900 text-black pr-10"
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
                            <div className="relative w-[70%]">
                                <Input
                                    className="border-gray-900 text-black pr-10"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirm_password'
                                    placeholder='Confirm Password'
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
