import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <div className="h-screen bg-gray-900 text-white p-4">
        <h1 className="text-4xl text-center mt-12 mb-5 font-bold">Short URL</h1>
        <Card className="w-[45%] mx-auto">
          <CardHeader>
            <CardDescription className="text-black text-center text-2xl font-bold">Paste the URL to be shortened</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row justify-center">
            <Input className="w-[60%] border-gray-900 text-black rounded-r-none border-r-0" />
            <Button className="rounded-l-none border-l-0">Shorten</Button>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p>ShortURL is a free tool to shorten URLs and generate short links</p>
            <p>URL shortener allows to create a shortened link making it easy to share</p>
          </CardFooter>
        </Card>
        <Card className="w-[45%] mx-auto mt-5">
          <CardHeader>
            <CardTitle className="text-black text-center text-2xl font-bold">Want More?</CardTitle>
            <CardDescription className="text-black text-center">Custom short links, powerful dashboard, detailed analytics, API, UTM builder, QR codes, browser extension, app integrations and support</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-[50%] mx-auto">Create an account</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
