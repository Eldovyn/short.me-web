import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
} from "@/components/ui/card"


const AddLinkPage = () => {
    return (
        <>
            <div className="h-screen p-4 flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center w-full">
                    <Input className="w-[25%] border-gray-900 text-black rounded-r-none border-r-0" placeholder="your link" />
                    <Button className="rounded-l-none border-l-0">Shorten</Button>
                </div>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-900 text-white w-[30%] mt-5">
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AddLinkPage