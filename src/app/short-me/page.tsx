import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ShortMePage = () => {
    return (
        <>
            <div className="h-screen bg-gray-900 text-white p-4 flex flex-col justify-center items-center">
                <div className="w-[50%] p-5">
                    <h1 className="text-4xl font-bold text-left mb-5">Your shortened URL</h1>
                    <p>Copy the short link and share it in messages, texts, posts, websites and other locations.</p>
                </div>
                <br />
                <br />
                <Card className="w-[55%] rounded-sm">
                    <CardContent className="flex flex-col justify-center items-center gap-4 text-center">
                        <div className="flex w-full max-w-md overflow-hidden rounded-md border">
                            <Input
                                type="url"
                                placeholder="Enter URL"
                                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button type="submit" className="rounded-none border-l">
                                Shorten
                            </Button>
                        </div>

                        <p className="text-sm text-gray-500 break-all">
                            Long URL: https://github.com/Eldovyn?tab=repositories
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ShortMePage;
