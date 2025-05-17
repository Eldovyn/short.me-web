'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Tick from '@/../public/tick.png'


const AccountActiveSentPage = () => {
    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
                <Card className="sm:w-[50%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
                    <CardHeader>
                        <CardTitle className="flex flex-col justify-center items-center">
                            <Image src={Tick} alt="tick" width={100} height={100} />
                            <h1 className="text-2xl font-bold">success verification adit</h1>
                        </CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto text-gray-500"/>
                    <CardContent className="w-full text-center">
                        <p className="text-sm">your email example@gmail.com has been verified</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AccountActiveSentPage