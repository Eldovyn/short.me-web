'use client';
import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive'
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PageDesktop from "./pageDesktop";
import PageMobileTablet from "./pageMobileTablet";
import { io, Socket } from "socket.io-client";

export default function RegisterComponent() {
    const [showPassword, setShowPassword] = useState(false);

    const [socket, setSocket] = useState<Socket | null>(null);

    const [formErrors, setFormErrors] = useState<FormErrorsLogin>({
        email: [],
        password: [],
    });

    const { push } = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const isLg = useMediaQuery({ minWidth: 1024 });

    const isEmailError = (formErrors.email ?? []).length > 0;
    const isPasswordError = (formErrors.password ?? []).length > 0;

    const handleValidation = (errors: FormErrorsLogin) => {
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
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    email: err.response?.data?.errors?.email ?? [],
                    password: err.response?.data?.errors?.password ?? [],
                });
                toast.error(err.response?.data?.message);
                return;
            }
            toast.error(err.response?.data?.message);
            return;
        },
        onSuccess: async (data) => {
            toast('check your email to activate your account');
            push('/login');
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

    useEffect(() => {
        const newSocket = io("http://localhost:5000/validate-login");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to /validate-login namespace");
        });

        newSocket.on("validation", (data) => {
            console.log(data);
            setFormErrors(data.errors);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const validateField = (fieldValues: any) => {
        if (socket) {
            socket.emit("validation", fieldValues);
        }
    };

    const redirectToLogin = () => {
        push("/login");
    };

    const redirectToRegister = () => {
        push("/register");
    };


    if (isLg) {
        return <PageDesktop redirectToRegister={redirectToRegister} redirectToLogin={redirectToLogin} validateField={validateField} isPasswordError={isPasswordError} isEmailError={isEmailError} formErrors={formErrors} formik={formik} showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />
    }

    return <PageMobileTablet redirectToRegister={redirectToRegister} redirectToLogin={redirectToLogin} validateField={validateField} isPasswordError={isPasswordError} isEmailError={isEmailError} formErrors={formErrors} formik={formik} showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />
};
