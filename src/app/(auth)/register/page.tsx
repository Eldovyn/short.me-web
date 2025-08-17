'use client';
import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive'
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PageDesktop from "./pageDesktop";
import PageMobileDesktop from "./PageMobileDesktop";

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


    if (isLg) {
        return <PageDesktop RegisterFormik={formik} showPassword={showPassword} showConfirmPassword={showConfirmPassword} togglePasswordVisibility={togglePasswordVisibility} toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility} /> 
    }

    return <PageMobileDesktop RegisterFormik={formik} showPassword={showPassword} showConfirmPassword={showConfirmPassword} togglePasswordVisibility={togglePasswordVisibility} toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility} />
};
