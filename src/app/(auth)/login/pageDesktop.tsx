import Image from "next/image"
import IconApp1 from "@/../public/icon software (1).png";
import IconEmail from "@/../public/Icon Email.png";
import IconLock from "@/../public/IconLock.png";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import IconDiscord from "@/../public/discord-icon-blue-discord-logo-for-chatting-and-communication-RA6Qd2f8_t-removebg-preview 2.png";
import IconGoogle from "@/../public/images__1_-removebg-preview 2.png";
import IconGithub from "@/../public/25231 1.png";
import { ClipLoader } from "react-spinners";

const PageDesktop: React.FC<LoginProps> = ({ validateField, isEmailError, isPasswordError, formErrors, formik, showPassword, togglePasswordVisibility }) => {
    return (
        <>
            <div className="flex h-screen bg-[#282828]">
                <div className="flex-1 flex items-center justify-center bg-[#282828]">
                    <Image
                        src={IconApp1}
                        alt="logo-trenalyze"
                        width={600}
                        height={600}
                        className="mb-4"
                    />
                </div>

                <div className="flex-1 flex flex-col items-center justify-center bg-[#EEF1F7]">
                    <form action="" className="flex flex-col space-y-4" onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                        <div className="flex flex-col">
                            <p className="self-start text-[12px]">Welcome to short.me</p>
                            <p className="self-start text-[20px] font-semibold">Login to your account</p>
                        </div>
                        <div className={`flex items-center border w-[397.57px] h-[57.34px] rounded-[10px] p-2 bg-[#FFFFFF] ${isEmailError ? 'mb-0 border-[#C10007]' : 'border-[#D9D9D9]'}`}>
                            <div className="w-[50px] flex-shrink-0">
                                <Image
                                    src={IconEmail}
                                    alt="icon-username"
                                    width={45}
                                    height={45}
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="email"
                                className="outline-none placeholder-[#374151] ps-[10px] pb-[3px] text-black placeholder-gray-400 flex-1"
                                value={formik.values.email}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    formik.handleChange(e);
                                    validateField({ ...formik.values, email: value });
                                }}
                                name="email"
                            />
                        </div>
                        {isEmailError && (
                            <p className={`text-[10px] text-right me-3 text-[#C10007] mb-4`}>
                                {(() => {
                                    switch (formErrors.email?.[0]) {
                                        case "IS_REQUIRED":
                                            return "email is required";
                                        case "IS_INVALID":
                                            return "invalid email";
                                        default:
                                            return "invalid email";
                                    }
                                })()}
                            </p>
                        )}
                        <div className={`flex items-center border w-[397.57px] h-[57.34px] rounded-[10px] p-2 bg-[#FFFFFF] ${isPasswordError ? 'mb-0 border-[#C10007]' : 'border-[#D9D9D9]'}`}>
                            <div className="w-[50px] flex-shrink-0">
                                <Image
                                    src={IconLock}
                                    alt="icon-confirm-password"
                                    width={45}
                                    height={45}
                                />
                            </div>

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                className="outline-none placeholder-[#374151] ps-[10px] pb-[3px] text-black placeholder-gray-400 flex-1"
                                value={formik.values.password}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    formik.handleChange(e);
                                    validateField({ ...formik.values, password: value });
                                }}
                                name="password"
                            />

                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="flex-shrink-0 pr-2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {isPasswordError && (
                            <p className={`text-[10px] text-right me-3 text-[#C10007] mb-4`}>
                                {(() => {
                                    switch (formErrors.password?.[0]) {
                                        case "IS_REQUIRED":
                                            return "password is required";
                                        case "IS_INVALID":
                                            return "invalid password";
                                        default:
                                            return "invalid password";
                                    }
                                })()}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="flex flex-row items-center border border-[#525252] w-[397.57px] h-[57.34px] rounded-[10px] p-2 bg-[#1447E6] hover:bg-[#1447E6] text-[20px] mb-0"
                            onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}
                        >
                            <ClipLoader
                                color="#fff"
                                loading={formik.isSubmitting}
                                size={20}
                                className="me-2"
                            />
                            <p>Login</p>
                        </Button>

                        <Link href="/reset-password" className="text-blue-600 hover:underline text-[15px] text-right">
                            forgot password
                        </Link>
                        <div className="flex flex-col items-center mt-4">
                            <div className="flex items-center w-full mb-4 gap-13 text-[18px]">
                                <hr className="flex-1 border-t border-[#000]" />
                                <span className="px-3 text-black">OR</span>
                                <hr className="flex-1 border-t border-[#000]" />
                            </div>

                            <div className="flex flex-row gap-5">
                                <button className="p-3 h-[50px] w-[50px] rounded-[10px] border border-[#D9D9D9] bg-[#fff] hover:bg-gray-100">
                                    <Image
                                        src={IconDiscord}
                                        alt="Discord Logo"
                                        className="w-[25px] h-[20px]"
                                    />
                                </button>
                                <button className="p-3 h-[50px] w-[50px] rounded-[10px] border border-[#D9D9D9] bg-[#fff] hover:bg-gray-100">
                                    <Image
                                        src={IconGoogle}
                                        alt="Google Logo"
                                        className="w-[25px] h-[25px]"
                                    />
                                </button>
                                <button className="p-3 h-[50px] w-[50px] rounded-[10px] border border-[#D9D9D9] bg-[#fff] hover:bg-gray-100">
                                    <Image
                                        src={IconGithub}
                                        alt="Discord Logo"
                                        className="w-[25px] h-[25px]"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 text-[12px] mx-auto">
                            <p>Dont have an account ?</p>
                            <Link href="/register" className="text-blue-600 hover:underline">
                                register
                            </Link>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default PageDesktop