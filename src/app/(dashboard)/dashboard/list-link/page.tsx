import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { FaQrcode } from "react-icons/fa6";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { IoSettingsOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";


const ListLinkPage = () => {
    return (
        <>
            <div className="h-screen p-4 flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center w-full">
                    <Input className="w-[25%] border-gray-900 text-black rounded-r-none border-r-0" placeholder="title of link/link/id link" />
                    <Button className="rounded-l-none border-l-0">Shorten</Button>
                </div>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center">
                            <FaQrcode className="mr-2 mt-[1px]" />
                            <Link href="/dashboard/list-link/link/1" className="text-blue-500 underline">
                                https://short.me
                            </Link>
                        </div>
                        <Select>
                            <SelectTrigger className="w-[15%]">
                                <IoSettingsOutline className="text-gray-500 -mr-1" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="delete"><FaCopy className="mr-1" />Copy Link</SelectItem>
                                <SelectItem value="delete"><MdDelete className="mr-1" />Delete Link</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center">
                            <FaQrcode className="mr-2 mt-[1px]" />
                            <Link href="/dashboard/list-link/link/1" className="text-blue-500 underline">
                                https://short.me
                            </Link>
                        </div>
                        <Select>
                            <SelectTrigger className="w-[15%]">
                                <IoSettingsOutline className="text-gray-500 -mr-1" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="delete"><FaCopy className="mr-1" />Copy Link</SelectItem>
                                <SelectItem value="delete"><MdDelete className="mr-1" />Delete Link</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center">
                            <FaQrcode className="mr-2 mt-[1px]" />
                            <Link href="/dashboard/list-link/link/1" className="text-blue-500 underline">
                                https://short.me
                            </Link>
                        </div>
                        <Select>
                            <SelectTrigger className="w-[15%]">
                                <IoSettingsOutline className="text-gray-500 -mr-1" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="delete"><FaCopy className="mr-1" />Copy Link</SelectItem>
                                <SelectItem value="delete"><MdDelete className="mr-1" />Delete Link</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center">
                            <FaQrcode className="mr-2 mt-[1px]" />
                            <Link href="/dashboard/list-link/link/1" className="text-blue-500 underline">
                                https://short.me
                            </Link>
                        </div>
                        <Select>
                            <SelectTrigger className="w-[15%]">
                                <IoSettingsOutline className="text-gray-500 -mr-1" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="delete"><FaCopy className="mr-1" />Copy Link</SelectItem>
                                <SelectItem value="delete"><MdDelete className="mr-1" />Delete Link</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default ListLinkPage