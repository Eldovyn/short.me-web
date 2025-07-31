'use client';
import React, { useState } from "react";
import IconApp from "@/../public/icon-software.png";
import IconApp1 from "@/../public/icon software (1).png";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";


const EmailVerification = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const email = 'example@gmail.com';

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };


    if ((isSm || isDefault || isMd) && !isLg) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
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
                            transform: "translateX(calc(-50% - 10px))",
                        }}
                    />
                </div>
                <h2 className={`${isMd ? 'text-3xl' : 'text-lg'} font-bold text-center`}>Verify Your Email</h2>
                <p className={`text-center ${isMd ? 'text-[25px]' : ''}`}>An 4-digit code has been sent to</p>
                <p className={`text-center font-semibold mb-30 ${isMd ? 'text-[20px]' : ''}`}>{email}</p>
                <div className="flex space-x-2">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e.target.value, index)}
                            className="w-12 h-12 border border-gray-300 rounded text-center text-lg"
                        />
                    ))}
                </div>
                <button className={`mt-6 text-white bg-blue-600 ${isMd ? 'w-[444px]' : 'w-[314px]'} rounded-[10px] py-2`}>
                    Verify
                </button>
                <p className="mt-4 text-sm">
                    Didn't you receive the otp? <a href="#" className="text-blue-600">Resend OTP</a>
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <div className="flex items-center justify-center w-1/2 bg-black">
                <Image
                    src={IconApp1}
                    alt="logo-trenalyze"
                    width={600}
                    height={600}
                    className="mb-4"
                />
            </div>

            <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 p-8">
                <h2 className="text-[37px] font-bold">Check Your Email</h2>
                <p className="text-black text-[22px]">
                    Please enter the four digit verification code we sent to{' '}
                </p>
                <p className="font-semibold mb-30 text-[22px]">example@gmail.com</p>
                <div className="flex space-x-2 mb-5">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e.target.value, index)}
                            className="w-12 h-12 border border-gray-300 rounded text-center text-lg"
                        />
                    ))}
                </div>
                <button
                    className="bg-blue-500 text-white w-[314px] py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Verify
                </button>
                <p className="text-black">
                    Didn't you receive the otp?{' '}
                    <button className="text-blue-500 hover:underline">
                        Resend OTP
                    </button>
                </p>
            </div>
        </div>
    );

};

export default EmailVerification;
