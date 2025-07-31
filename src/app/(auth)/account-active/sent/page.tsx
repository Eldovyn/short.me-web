'use client';
import React from 'react';
import Image from 'next/image';
import IconApp from "@/../public/icon-software.png";
import IconApp1 from "@/../public/icon software (1).png";
import { useMediaQuery } from 'react-responsive';

const EmailVerification = () => {
    const email = 'example@example.com';

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    console.log(isMd);

    if ((isSm || isMd || isDefault) && !isLg) {
        return (    
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F7]">
                <div className="mb-8">
                    <Image
                        src={IconApp}
                        alt="icon-app"
                        width={200}
                        height={200}
                    />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Please Verify Your Email</h2>
                    <p className="text-[15px] text-black">You’re almost there! We sent an email to</p>
                    <p className="text-gray-800 font-semibold mb-20">{email}</p>
                    <p className="text-black mb-5 text-[15px]">Just click on the link to complete your reset password.</p>
                    <button className="w-[314px] py-2 text-white bg-[#1447E6] rounded-md hover:bg-blue-700">
                        <p className='text-[16px]'>
                            Resend Verification Email
                        </p>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 bg-black flex items-center justify-center">
                <Image
                    src={IconApp1}
                    alt="logo-trenalyze"
                    width={600}
                    height={600}
                    className="mb-4"
                />
            </div>

            <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-8">
                <h2 className="text-[37.74px] font-semibold">Please Verify Your Email</h2>
                <p className="mt-2 text-center text-[22.64px] text-black">
                    You’re almost there! We sent an email to
                </p>
                <p className='text-black font-semibold text-[22.64px]'>example@gmail.com</p>
                <br />
                <br />
                <br />
                <br />
                <p className="mt-1 text-center text-black text-[22.64px]">
                    Just click on the link to complete your reset password
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 w-[473px]">
                    Resend Verification Email
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
