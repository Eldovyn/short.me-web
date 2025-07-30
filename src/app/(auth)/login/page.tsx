'use client';
import React, { useState } from "react";
import IconApp from "@/../public/icon-software.png";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import IconGoogle from "@/../public/images__1_-removebg-preview 2.png";
import IconDiscord from "@/../public/discord-icon-blue-discord-logo-for-chatting-and-communication-RA6Qd2f8_t-removebg-preview 2.png";
import Image from "next/image";
import IconUsername from "@/../public/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y-removebg-preview 3.png";
import IconEmail from "@/../public/istockphoto-654095766-170667a-removebg-preview 3.png";
import IconLock from "@/../public/551dd8fa41261ccbb71bb70bc0b92013__1_-removebg-preview 2.png";
import IconEye from "@/../public/view 4.png";
import { useMediaQuery } from 'react-responsive'

export default function RegisterComponent() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });

    const isUsernameError = true;
    const isEmailError = true;
    const isPasswordError = true;
    const isConfirmPasswordError = true;

    if (isSm || isMd || isDefault) {
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
                        <div className={`relative rounded-md ${isUsernameError ? 'mb-0' : ''}`}>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Image
                                    src={IconUsername}
                                    alt="icon-username"
                                    width={25}
                                    height={25}
                                    className="text-gray-400 translate-y-[2px]"
                                />
                            </div>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                placeholder="username"
                                className={`block w-full rounded-md border ${isUsernameError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                            />
                        </div>
                        {isUsernameError && (
                            <p className="text-[10px] text-right me-3 text-[#C10007]">Username is required</p>
                        )}

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
                            <p className="text-[10px] text-right me-3 text-[#C10007]">Email is required</p>
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
                            <p className="text-[10px] text-right me-3 text-[#C10007]">Password is required</p>
                        )}

                        <div className={`relative rounded-md ${isConfirmPasswordError ? 'mb-0' : ''}`}>
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
                                className={`block w-full rounded-md border ${isConfirmPasswordError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
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
                        {isConfirmPasswordError && (
                            <p className="text-[10px] text-right me-3 text-[#C10007]">Password is required</p>
                        )}

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-1">
                            Register
                        </Button>
                        <div className="text-left text-[#000000] mt-0 text-[12px]">
                            Already have an account?{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Login
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
}
