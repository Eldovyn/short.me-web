'use client'
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { useState } from "react"


export default function ProfilePage() {
    const [email, setEmail] = useState("conradfisher@gmail.com");
    const [username, setUsername] = useState("conradfisher@gmail.com");

    return (
        <>
            <div className="h-screen p-4 flex justify-center items-center flex-col gap-4">
                <Card className="w-[30%] bg-gray-900 p-6">
                    <CardContent className="flex items-center gap-4 p-0">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-gray-300">Business Man</p>
                            <p className="text-sm text-gray-400">conradfisher@gmail.com</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-[30%] bg-gray-900 p-6">
                    <CardTitle className="text-white text-left text-2xl">Account Information</CardTitle>
                    <CardContent className="flex flex-col text-white p-0 gap-3">
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm">Email</Label>
                            <Input className="w-full border-white" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm">Username</Label>
                            <Input className="w-full border-white" placeholder="Email" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button className="w-[30%] bg-white text-black">Save</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
