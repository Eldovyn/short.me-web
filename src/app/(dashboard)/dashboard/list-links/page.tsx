"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select"
import { FaQrcode, FaCopy } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import { IoSettingsOutline } from "react-icons/io5"
import Link from "next/link"
import Image from "next/image"
import QrCode from "@/../public/download.png"
import { IoIosSearch } from "react-icons/io";


const links = [
    { id: 1, url: "https://short.me/abc123" },
    { id: 2, url: "https://short.me/xyz456" },
    { id: 3, url: "https://short.me/test789" },
    { id: 4, url: "https://short.me/demo000" },
    { id: 5, url: "https://short.me/demo000" }
]

const ListLinkPage = () => {
    return (
        <div className="h-screen p-4 flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center w-full">
                <Input
                    className="w-[25%] border-gray-900 text-black rounded-r-none border-r-0"
                    placeholder="title of link/link/id link"
                />
                <Button className="rounded-l-none border-l-0">
                    <IoIosSearch />
                    Search
                </Button>
            </div>

            {links.map((link) => (
                <Card key={link.id} className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center">
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <FaQrcode className="mr-2 mt-[1px] cursor-pointer" />
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-gray-900 text-white border-none">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-center">Your QR Code</AlertDialogTitle>
                                        <AlertDialogDescription className="mx-auto">
                                            <Image src={QrCode} alt="Logo" width={200} height={200} />
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-[#2E2E2E] text-white border-none w-[25%] hover:bg-[#2E2E2E] hover:text-white">
                                            Cancel
                                        </AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Link href={`/dashboard/list-link/link/${link.id}`} className="text-blue-500 underline">
                                {link.url}
                            </Link>
                        </div>

                        <Select>
                            <SelectTrigger className="w-[15%]">
                                <IoSettingsOutline className="text-gray-500 -mr-1" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="copy">
                                    <FaCopy className="mr-1 inline" /> Copy Link
                                </SelectItem>
                                <SelectItem value="delete">
                                    <MdDelete className="mr-1 inline" /> Delete Link
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default ListLinkPage
