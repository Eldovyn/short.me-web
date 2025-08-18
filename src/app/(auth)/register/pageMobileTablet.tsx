import Image from "next/image"
import IconUsername from "@/../public/Frame.png";
import IconEmail from "@/../public/Icon Email.png";
import IconLock from "@/../public/IconLock.png";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import IconDiscord from "@/../public/discord-icon-blue-discord-logo-for-chatting-and-communication-RA6Qd2f8_t-removebg-preview 2.png";
import IconGoogle from "@/../public/images__1_-removebg-preview 2.png";
import IconGithub from "@/../public/25231 1.png";
import { ClipLoader } from "react-spinners";

const PageMobileTablet: React.FC<RegisterProps> = ({ redirectToRegister, redirectToLogin, errorPasswordMerged, isPasswordMergedError, validateField, isUsernameError, isEmailError, isPasswordError, isConfirmPasswordError, formErrors, RegisterFormik, showConfirmPassword, showPassword, togglePasswordVisibility, toggleConfirmPasswordVisibility }) => {
    return (
        <>
            <div className="h-screen flex justify-center items-center bg-[#EEF1F7] overflow-x-hidden">
                <form onSubmit={RegisterFormik.isSubmitting ? () => { } : RegisterFormik.handleSubmit} className="flex flex-col space-y-4 w-full">
                    <div className="flex flex-col translate-x-[17%]">
                        <p className="self-start text-[15px]">Welcome to short.me</p>
                        <p className="self-start text-[20px] font-semibold">Register to your account</p>
                    </div>
                    <div className="flex button-redirect mx-auto space-x-4 bg-[#fff] w-[65%] h-[63px] rounded rounded-[10px] justify-around items-center">
                        <button className="bg-[#1447E6] text-white font-semibold w-[218px] h-[45px] text-[25px] rounded-[15px] hover:bg-blue-700" type="button" onClick={redirectToRegister}>
                            Register
                        </button>
                        <button className="text-black font-semibold w-[218px] h-[45px] text-[25px] rounded-[15px] hover:bg-[#1447E6]" type="button" onClick={redirectToLogin}>
                            Login
                        </button>
                    </div>
                    <div className={`flex mx-auto items-center border w-[65%] h-[70px] rounded-[10px] p-2 bg-[#FFFFFF] ${isUsernameError ? 'mb-0 border-[#C10007]' : 'border-[#D9D9D9]'}`}>
                        <div className="w-[50px] flex-shrink-0">
                            <Image
                                src={IconUsername}
                                alt="icon-username"
                                width={70}
                                height={70}
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="username"
                            className="outline-none placeholder-[#374151] placeholder:text-[25px] ps-[10px] pb-[3px] text-black placeholder-gray-400 py-1"
                            value={RegisterFormik.values.username}
                            onChange={(e) => {
                                const { value } = e.target;
                                RegisterFormik.handleChange(e);
                                validateField({ ...RegisterFormik.values, username: value });
                            }}
                            name="username"
                        />
                    </div>
                    {isUsernameError && (
                        <p className={`text-[15px] translate-x-[-18%] text-right me-3 text-[#C10007] mb-4`}>
                            {(() => {
                                switch (formErrors.username?.[0]) {
                                    case "TOO_SHORT":
                                        return "username is too short";
                                    case "TOO_LONG":
                                        return "username is too long";
                                    case "IS_REQUIRED":
                                        return "username is required";
                                    default:
                                        return "invalid username";
                                }
                            })()}
                        </p>
                    )}
                    <div className={`flex mx-auto items-center border w-[65%] h-[70px] rounded-[10px] p-2 bg-[#FFFFFF] ${isEmailError ? 'mb-0 border-[#C10007]' : 'border-[#D9D9D9]'}`}>
                        <div className="w-[50px] flex-shrink-0">
                            <Image
                                src={IconEmail}
                                alt="icon-username"
                                width={70}
                                height={70}
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="email"
                            className="outline-none placeholder-[#374151] placeholder:text-[25px] ps-[10px] pb-[3px] text-black placeholder-gray-400 py-1"
                            value={RegisterFormik.values.email}
                            onChange={(e) => {
                                const { value } = e.target;
                                RegisterFormik.handleChange(e);
                                validateField({ ...RegisterFormik.values, email: value });
                            }}
                            name="email"
                        />
                    </div>
                    {isEmailError && (
                        <p className={`text-[15px] translate-x-[-18%] text-right me-3 text-[#C10007] mb-4`}>
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
                    <div className={`flex mx-auto items-center border w-[65%] h-[70px] rounded-[10px] p-2 bg-[#FFFFFF] ${isPasswordError ? 'mb-0 border-[#C10007]' : 'border-[#D9D9D9]'}`}>
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
                            className="outline-none placeholder-[#374151] placeholder:text-[25px] ps-[10px] pb-[3px] text-black placeholder-gray-400 flex-1"
                            value={RegisterFormik.values.password}
                            onChange={(e) => {
                                const { value } = e.target;
                                RegisterFormik.handleChange(e);
                                validateField({ ...RegisterFormik.values, password: value });
                            }}
                            name="password"
                        />

                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="flex-shrink-0 pr-2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeOffIcon className="w-7 h-7" />
                            ) : (
                                <EyeIcon className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                    {isPasswordError && (
                        <p className={`text-[15px] translate-x-[-18%] text-right me-3 text-[#C10007] mb-4`}>
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
                    <div className={`flex mx-auto items-center border w-[65%] h-[70px] rounded-[10px] p-2 bg-[#FFFFFF] ${isConfirmPasswordError ? 'mb-0 border-[#C10007]' : 'border-[#D9D9D9]'}`}>
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
                            placeholder="confirm password"
                            className="outline-none placeholder-[#374151] placeholder:text-[25px] ps-[10px] pb-[3px] text-black placeholder-gray-400 flex-1"
                            value={RegisterFormik.values.confirm_password}
                            onChange={(e) => {
                                const { value } = e.target;
                                RegisterFormik.handleChange(e);
                                validateField({ ...RegisterFormik.values, confirm_password: value });
                            }}
                            name="confirm_password"
                        />

                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="flex-shrink-0 pr-2 text-gray-500 hover:text-gray-700"
                        >
                            {showConfirmPassword ? (
                                <EyeOffIcon className="w-7 h-7" />
                            ) : (
                                <EyeIcon className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                    {isConfirmPasswordError && (
                        <p className={`text-[15px] translate-x-[-18%] text-right me-3 text-[#C10007] mb-4`}>
                            {(() => {
                                switch (formErrors.password_match?.[0]) {
                                    case "IS_MISMATCH":
                                        return "password does not match";
                                    default:
                                        return "invalid password";
                                }
                            })()}
                        </p>
                    )}
                    {(isPasswordMergedError && !isConfirmPasswordError) && (
                        <p className={`text-[15px] translate-x-[-18%] text-right me-3 text-[#C10007] mb-4`}>
                            {(() => {
                                switch (errorPasswordMerged.password?.[0]) {
                                    case "IS_MISMATCH":
                                        return "password does not match";
                                    case "TOO_SHORT":
                                        return "password too short";
                                    case "TOO_LONG":
                                        return "password too long";
                                    case "NO_CAPITAL":
                                        return "password must contain at least one capital letter";
                                    case "NO_LOWERCASE":
                                        return "password must contain at least one lowercase letter";
                                    case "NO_NUMBER":
                                        return "password must contain at least one number";
                                    case "NO_SYMBOL":
                                        return "password must contain at least one symbol";
                                    default:
                                        return "invalid password";
                                }
                            })()}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="flex mx-auto flex-row items-center border border-[#525252] w-[65%] h-[70px] rounded-[10px] p-2 bg-[#1447E6] hover:bg-[#1447E6] text-[20px] mb-0"
                        onSubmit={RegisterFormik.isSubmitting ? () => { } : RegisterFormik.handleSubmit}
                    >
                        <ClipLoader
                            color="#fff"
                            loading={RegisterFormik.isSubmitting}
                            size={20}
                            className="me-2"
                        />
                        <p>Register</p>
                    </Button>
                    <div className="flex flex-col mx-auto items-center w-[65%] mt-4">
                        <div className="flex items-center w-full mb-4 gap-13 text-[18px]">
                            <hr className="flex-1 border-t border-[#000]" />
                            <span className="px-3 text-black">OR</span>
                            <hr className="flex-1 border-t border-[#000]" />
                        </div>

                        <div className="flex flex-row gap-5">
                            <button className="p-3 h-[61px] w-[61px] flex items-center justify-center rounded-[10px] border border-[#D9D9D9] bg-[#fff] hover:bg-gray-100">
                                <Image
                                    src={IconDiscord}
                                    alt="Discord Logo"
                                    className="w-[25px] h-[20px]"
                                />
                            </button>
                            <button className="p-3 h-[61px] w-[61px] flex items-center justify-center rounded-[10px] border border-[#D9D9D9] bg-[#fff] hover:bg-gray-100">
                                <Image
                                    src={IconGoogle}
                                    alt="Google Logo"
                                    className="w-[25px] h-[25px]"
                                />
                            </button>
                            <button className="p-3 h-[61px] w-[61px] flex items-center justify-center rounded-[10px] border border-[#D9D9D9] bg-[#fff] hover:bg-gray-100">
                                <Image
                                    src={IconGithub}
                                    alt="Discord Logo"
                                    className="w-[25px] h-[25px]"
                                />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PageMobileTablet