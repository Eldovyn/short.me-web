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


export default function ResetPasswordPage() {
    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
                <Card className="sm:w-[50%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
                    <CardHeader>
                        <CardTitle className="text-black text-center text-2xl font-bold">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold">Reset Password</h2>
                            </div >
                        </CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto text-gray-500"/>
                    <CardContent>
                        <form action="" className="flex flex-col items-center gap-2">
                            <Input className="w-[70%] border-gray-900 text-black" placeholder="Email" type="text" />
                            <Button className="w-[70%] mx-auto">Reset Password</Button>
                        </form>
                    </CardContent>
                    <hr className="w-[75%] mx-auto" />
                    <CardFooter>
                        <div className="w-full flex flex-col justify-center items-center">
                            <p className="text-sm text-center mb-3">
                                Already have an account?
                            </p>
                            <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white cursor-pointer" onClick={() => { window.location.href = "/login" }}>Login</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
