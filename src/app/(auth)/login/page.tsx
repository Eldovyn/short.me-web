'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import IconApp from "@/../public/icon-software.png";
import IconEmail from "@/../public/istockphoto-654095766-170667a-removebg-preview 3.png";
import IconLock from "@/../public/551dd8fa41261ccbb71bb70bc0b92013__1_-removebg-preview 2.png";
import IconEye from "@/../public/view 4.png";
import { useMediaQuery } from 'react-responsive'
import IconGoogle from "@/../public/images__1_-removebg-preview 2.png";
import IconDiscord from "@/../public/discord-icon-blue-discord-logo-for-chatting-and-communication-RA6Qd2f8_t-removebg-preview 2.png";

export default function LoginComponent() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isEmailError = true;
    const isPasswordError = true;

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
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

            <form className="w-[336px] max-w-sm space-y-6">
                <h2 className="text-black text-lg font-medium mb-3 select-none">Login to your account</h2>

                <div className={`relative rounded-md ${isEmailError ? 'mb-0' : ''}`}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Image
                            src={IconEmail}
                            alt="icon-username"
                            width={25}
                            height={25}
                            className="text-gray-400"
                        />
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
                    <p className="text-[10px] text-right me-3 text-[#C10007] mb-[0.2px]">Email is required</p>
                )}

                <div className={`relative rounded-md ${isPasswordError ? 'mb-0' : ''}`}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Image
                            src={IconLock}
                            alt="icon-lock-password"
                            width={25}
                            height={25}
                            className="text-gray-400"
                        />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className={`block w-full rounded-md border ${isPasswordError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                    />
                    <button
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                    >
                        {showPassword ? (
                            <Image
                                src={IconEye}
                                alt="icon-lock-password"
                                width={20}
                                height={20}
                                className="text-gray-400"
                            />
                        ) : (
                            <Image
                                src={IconEye}
                                alt="icon-lock-password"
                                width={20}
                                height={20}
                                className="text-gray-400"
                            />
                        )}
                    </button>
                </div>
                {isPasswordError && (
                    <p className="text-[10px] text-right me-3 text-[#C10007] mb-[0.2px]">Email is required</p>
                )}

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                    Login
                </Button>

                <p className="text-[12px] text-gray-600 text-left select-none">
                    dont have an account ?{" "}
                    <a href="#" className="text-blue-600 hover:underline">register</a>
                </p>

                <div className="flex items-center w-full max-w-sm text-gray-500 my-6 space-x-3 select-none">
                    <hr className="flex-grow me-9 border-[#000000]" />
                    <span className="text-[#000000]">OR</span>
                    <hr className="flex-grow ms-9 border-[#000000]" />
                </div>
            </form>

            <div className="flex justify-center space-x-16 w-full max-w-sm mb-12">
                <Button
                    type="button"
                    variant="outline"
                    aria-label="Sign in with Google"
                    className="border-gray-300 me-13 bg-white p-2 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-600"
                >
                    <Image
                        src={IconGoogle}
                        alt="icon-google"
                        width={25}
                        height={25}
                        className="text-gray-400"
                    />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    aria-label="Sign in with Discord"
                    className="border-gray-300 ms-13 bg-white p-2 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-600"
                >
                    <Image
                        src={IconDiscord}
                        alt="icon-discord"
                        width={25}
                        height={25}
                        className="text-gray-400"
                    />
                </Button>
            </div>
        </div>
    );
}
