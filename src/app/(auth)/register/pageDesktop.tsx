import Image from "next/image"
import IconApp1 from "@/../public/icon software (1).png";
import IconUsername from "@/../public/Frame.png";
import IconEmail from "@/../public/Icon Email.png";
import IconLock from "@/../public/IconLock.png";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import IconDiscord from "@/../public/discord-icon-blue-discord-logo-for-chatting-and-communication-RA6Qd2f8_t-removebg-preview 2.png";
import IconGoogle from "@/../public/images__1_-removebg-preview 2.png";
import IconGithub from "@/../public/25231 1.png";

const PageDesktop: React.FC<RegisterProps> = ({ RegisterFormik, showConfirmPassword, showPassword, togglePasswordVisibility, toggleConfirmPasswordVisibility }) => {
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
                    <form action="" className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <p className="self-start text-[12px]">Welcome to short.me</p>
                            <p className="self-start text-[20px] font-semibold">Register to your account</p>
                        </div>
                        <div className="flex items-center border border-[#D9D9D9] w-[397.57px] h-[57.34px] rounded-lg p-2 bg-[#FFFFFF]">
                            <div className="w-[50px] flex-shrink-0">
                                <Image
                                    src={IconUsername}
                                    alt="icon-username"
                                    width={45}
                                    height={45}
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="username"
                                className="outline-none placeholder-[#374151] ps-[10px] pb-[3px] text-black placeholder-gray-400 flex-1"
                                value={RegisterFormik.values.username}
                                onChange={RegisterFormik.handleChange}
                                name="username"
                            />
                        </div>
                        <div className="flex items-center border border-[#D9D9D9] w-[397.57px] h-[57.34px] rounded-lg p-2 bg-[#FFFFFF]">
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
                                value={RegisterFormik.values.email}
                                onChange={RegisterFormik.handleChange}
                                name="email"
                            />
                        </div>
                        <div className="flex items-center border border-[#D9D9D9] w-[397.57px] h-[57.34px] rounded-lg p-2 bg-[#FFFFFF]">
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
                                value={RegisterFormik.values.password}
                                onChange={RegisterFormik.handleChange}
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
                        <div className="flex items-center border border-[#D9D9D9] w-[397.57px] h-[57.34px] rounded-lg p-2 bg-[#FFFFFF]">
                            <div className="w-[50px] flex-shrink-0">
                                <Image
                                    src={IconLock}
                                    alt="icon-confirm-password"
                                    width={45}
                                    height={45}
                                />
                            </div>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="confirm password"
                                className="outline-none placeholder-[#374151] ps-[10px] pb-[3px] text-black placeholder-gray-400 flex-1"
                                value={RegisterFormik.values.confirm_password}
                                onChange={RegisterFormik.handleChange}
                                name="confirm_password"
                            />

                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="flex-shrink-0 pr-2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <Button
                            className="flex items-center border border-[#525252] w-[397.57px] h-[57.34px] rounded-lg p-2 bg-[#1447E6] text-[20px] mb-0"
                            onSubmit={RegisterFormik.isSubmitting ? () => {} : RegisterFormik.handleSubmit}
                        >
                            Register
                        </Button>

                        <div className="flex flex-row gap-2 text-[12px]">
                            <p>Already have an account ?</p>
                            <Link href="/login" className="text-blue-600 hover:underline">
                                login
                            </Link>
                        </div>
                    </form>

                    <div className="flex flex-col items-center w-[51%] mt-4">
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
                </div>
            </div>
        </>
    )
}

export default PageDesktop