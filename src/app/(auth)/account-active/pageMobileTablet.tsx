import React from "react"
import { formatTime } from "@/utils/formatTime";
import { useMediaQuery } from "react-responsive";
import { ArrowRight } from "lucide-react";

const PageMobileTablet: React.FC<UserActivationProps> = ({ HandleResend, remaining, handleChange, formErrors, formik, data, isOtpError, isLoading }) => {
    const isMd = useMediaQuery({ minWidth: 768 });

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-[#EEF1F7]">
                <div className="flex bg-white p-10 rounded-[10px] flex-col w-[80%] border-[#D9D9D9] border">
                    <form
                        onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}
                        className="flex flex-col w-[80%] mx-auto"
                    >
                        <div className="flex flex-col items-center">
                            <h2
                                className={`${isMd ? "text-[31px]" : "text-[10px]"} font-bold text-left`}
                            >
                                Check your email for OTP
                            </h2>
                            <p
                                className={`${isMd ? "text-[17px]" : "text-[10px]"} text-left`}
                            >
                                Enter the code sent to your email
                            </p>
                        </div>

                        <br />
                        <br />

                        <div className="relative flex items-center justify-center space-x-15">
                            {Array.from({ length: 5 }).map((_, index) =>
                                index === 2 ? (
                                    isMd ? (
                                        <div
                                            key={index}
                                            className="w-[60px] h-[1px] bg-gray-300 rounded self-center ms-5 me-5"
                                        />
                                    ) : null
                                ) : (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={formik.values.otp[index] || ""}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        className="md:w-[60px] md:h-[60px] w-[35px] h-[35px] border border-gray-300 rounded text-center text-lg mx-auto bg-[#fff] md:ms-5 md:me-5 ms-2 me-2"
                                    />
                                )
                            )}
                        </div>

                        {isOtpError && (
                            <p
                                className={`${isMd ? "text-[18px]" : "text-[12px]"} text-center me-3 text-[#C10007] ${isOtpError ? "mb-2 me-[13.5%]" : "hidden"
                                    }`}
                            >
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

                        <div className="flex justify-center mt-10">
                            <button
                                className="bg-[#1447E6] text-white w-full max-w-[317px] md:h-[60px] h-[35px] rounded-lg hover:bg-blue-600 transition sm:text-[10px] md:text-[20px] font-semibold flex md:justify-between justify-center items-center md:ps-10 md:pe-10"
                                type="submit"
                            >
                                Continue
                                <ArrowRight size={25} className="md:flex md:block hidden" />
                            </button>
                        </div>

                        <div className="flex mt-5 justify-between w-full max-w-[317px] mx-auto">
                            <p
                                className="md:text-[15px] text-[10px] text-[#1447E6] cursor-pointer"
                                onClick={HandleResend}
                            >
                                Resend code
                            </p>
                            <p className="md:text-[15px] text-[10px] text-[#C10007]">
                                {remaining !== null ? formatTime(remaining) : "0:00"}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PageMobileTablet