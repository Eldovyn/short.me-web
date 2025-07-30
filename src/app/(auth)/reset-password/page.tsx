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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

interface FormErrors {
    email: string[];
}


interface FormData {
    email: string;
}


export default function ResetPasswordPage() {
    const { push } = useRouter();

    const [formErrors, setFormErrors] = useState<FormErrors>({
            email: [],
        });

    const handleValidation = (errors: { email: string[]; }) => {
        setFormErrors({
            email: errors.email || [],
        });
    };

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.post('/short.me/auth/reset-password/request', data);
            return response;
        },
        onError: async (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    email: err.response?.data?.errors?.email ?? [],
                });
                toast.error(err?.response?.data?.message)
                return
            }
            toast.error(err?.response?.data?.message)
            return
        },
        onSuccess: async (data) => {
            const dataApi = data.data
            toast.success(dataApi.message)
            push(`/reset-password/sent?token=${dataApi.data.token_web}`)
        },
    })

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { email } = values
                mutate({
                    email,
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
                                <h2 className="text-2xl font-bold">Reset Password</h2>
                            </div >
                        </CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto text-gray-500"/>
                    <CardContent>
                        <form onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit} className="flex flex-col">
                            <Input className={`w-[70%] border-gray-900 text-black mx-auto ${formErrors.email.length > 0 ? 'border-red-500' : ''}`} placeholder="Email" type="text" name="email" onChange={formik.handleChange} value={formik.values.email} />
                            {formErrors.email.map((error, index) => (
                                error === 'IS_REQUIRED' ? (
                                    <p key={index} className="text-red-500 text-sm ms-19">email is required</p>
                                ) : null
                            ))}
                            {formErrors.email.map((error, index) => (
                                error === 'IS_INVALID' ? (
                                    <p key={index} className="text-red-500 text-sm ms-19">email is invalid</p>
                                ) : null
                            ))}
                            <Button className="w-[70%] mx-auto mt-1" type="submit">Reset Password</Button>
                        </form>
                    </CardContent>
                    <hr className="w-[75%] mx-auto" />
                    <CardFooter>
                        <div className="w-full flex flex-col justify-center items-center">
                            <p className="text-sm text-center mb-3">
                                Already have an account?
                            </p>
                            <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white cursor-pointer" onClick={() => { window.location.href = "/login" }}>Login</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
