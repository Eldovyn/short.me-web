import {
    Card,
    CardFooter,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function RegisterPage() {
    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
                <Card className="w-[30%]">
                    <CardHeader>
                        <CardTitle className="text-black text-center text-2xl font-bold">Create your account</CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto" />
                    <CardContent>
                        <form action="" className="flex flex-col items-center gap-2">
                            <Input className="w-[70%] border-gray-900 text-black" placeholder="Email" type="text" />
                            <Input className="w-[70%] border-gray-900 text-black" placeholder="Password" type="password" />
                            <Input className="w-[70%] border-gray-900 text-black" placeholder="Confirm Password" type="password" />
                            <Button className="w-[70%] mx-auto">Register</Button>
                        </form>
                    </CardContent>
                    <hr className="w-[75%] mx-auto" />
                    <CardFooter>
                        <div className="w-full flex flex-col justify-center items-center">
                            <p className="text-sm text-center mb-3">
                                Already have an account?
                            </p>
                            <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white">Login</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
