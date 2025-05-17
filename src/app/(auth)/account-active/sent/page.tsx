'use client'
import {
    Card,
    CardFooter,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Email from '@/../public/email.png'
import { Button } from "@/components/ui/button"


const AccountActiveSentPage = () => {
    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
                <Card className="sm:w-[50%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
                    <CardHeader>
                        <CardTitle className="flex flex-col justify-center items-center">
                            <Image src={Email} alt="Email" width={100} height={100} />
                            <h1 className="text-2xl font-bold">Verify your email address</h1>
                        </CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto text-gray-500"/>
                    <CardContent className="w-full text-center">
                        <p className="text-sm">we have sent a verification link to your email example@gmail.com</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white cursor-pointer" onClick={() => { window.location.href = "/register" }}>Resend</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default AccountActiveSentPage