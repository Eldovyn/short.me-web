'use client'
import {
    Card,
    CardFooter,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGoogleLogin } from '@react-oauth/google';
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { FaGoogle } from "react-icons/fa";


interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
    account_active?: {
        [field: string]: string[];
    };
}


export default function LoginPage() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await axiosInstance.post('/short.me/login', {
                    provider: "google",
                    token: tokenResponse.access_token,
                })
                toast.success(response.data.message)
            } catch (err) {
                const error = err as AxiosError<ErrorResponse>
                toast.error(error.response?.data.message)
            }
        },
    });

    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
                <Card className="sm:w-[50%] md:w-[40%] lg:w-[30%]">
                    <CardHeader>
                        <CardTitle className="text-black text-center text-2xl font-bold">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold">Login With</h2>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => login()}
                                        className="w-10 h-10 rounded-md border-black cursor-pointer hover:bg-black hover:text-white"
                                    >
                                        <FaGoogle className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div >
                        </CardTitle>
                    </CardHeader>
                    <div className="flex items-center justify-center w-[75%] mx-auto">
                        <div className="w-full h-px bg-gray-300"></div>
                        <span className="px-3 text-sm text-gray-500">or</span>
                        <div className="w-full h-px bg-gray-300"></div>
                    </div>
                    <CardContent>
                        <form action="" className="flex flex-col items-center gap-2">
                            <Input className="w-[70%] border-gray-900 text-black" placeholder="Email" type="text" />
                            <Input className="w-[70%] border-gray-900 text-black" placeholder="Password" type="password" />
                            <Button className="w-[70%] mx-auto">Login</Button>
                        </form>
                        <p className="text-sm text-right me-20 mt-2 underline text-blue-500 cursor-pointer">reset password</p>
                    </CardContent>
                    <hr className="w-[75%] mx-auto" />
                    <CardFooter>
                        <div className="w-full flex flex-col justify-center items-center">
                            <p className="text-sm text-center mb-3">
                                Don&apos;t have an account?
                            </p>
                            <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white">Register</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
