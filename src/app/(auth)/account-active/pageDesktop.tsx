'use client';
import Image from "next/image";
import IconApp1 from "@/../public/icon software (1).png";
import React from "react";
import { formatTime } from "@/utils/formatTime";
import { ArrowRight } from "lucide-react";


const PageDesktop: React.FC<UserActivationProps> = ({ HandleResend, remaining, handleChange, formErrors, formik, data, isOtpError, isLoading }) => {
    return (
        <>
            <div className="flex h-screen bg-[#EEF1F7]">
                <div className="flex items-center justify-center w-1/2 bg-black">
                    <Image
                        src={IconApp1}
                        alt="logo-trenalyze"
                        width={600}
                        height={600}
                        className="mb-4"
                    />
                </div>

                <div className="flex flex-col items-center justify-center w-1/2 p-8">
                    <h2 className="text-[25px] font-semibold">Enter the code</h2>
                    <div className="flex flex-row gap-1 text-[15px]">
                        <p>Enter the 4-digit code sent to your email</p>
                    </div>
                    <br />
                    <br />

                    <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                        <div className='flex'>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <>
                                    {index === 2 && (
                                        <div
                                            key={`divider-${index}`}
                                            className="w-[60px] h-[1px] bg-gray-300 rounded self-center ms-5 me-5"
                                        />
                                    )}
                                    <input
                                        key={`otp-${index}`}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={formik.values.otp[index] || ""}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        className="w-[60px] h-[60px] border border-gray-300 rounded text-center text-lg mx-auto bg-[#fff] ms-5 me-5"
                                    />
                                </>
                            ))}
                        </div>
                        <div className="flex justify-end me-[2%]">
                            {isOtpError && (
                                <p className={`text-[12px] me-3 text-[#C10007] ${isOtpError ? 'mb-2' : 'hidden'}`}>
                                    {(() => {
                                        switch (formErrors.otp?.[0]) {
                                            case "IS_REQUIRED":
                                                return "otp is required";
                                            case "IS_INVALID":
                                                return "invalid otp";
                                            default:
                                                return "otp error";
                                        }
                                    })()}
                                </p>
                            )}
                        </div>
                        <br />
                        <div className="flex justify-center">
                            <button
                                className="bg-[#1447E6] text-white w-[317px] h-[60px] rounded-lg hover:bg-blue-600 transition text-[20px] font-semibold flex justify-between items-center ps-10 pe-10"
                                type="submit"
                            >
                                Continue
                                <ArrowRight size={25} />
                            </button>
                        </div>
                        <div className="flex mt-5 justify-between ps-[18.8%] pe-[18.8%]">
                            <p className="text-[15px] text-[#1447E6] cursor-pointer" onClick={HandleResend}>Resend code</p>
                            <p className="text-[15px] text-[#C10007]">{remaining !== null ? formatTime(remaining) : "0:00"}</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PageDesktop