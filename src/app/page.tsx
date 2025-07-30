'use client'

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
    <div className="min-h-screen bg-gray-900 text-white px-4 flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center mb-8 font-bold text-blue-500">Short URL</h1>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardDescription className="text-black text-center text-2xl font-bold">
            Paste the URL to be shortened
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-center gap-2">
          <div className="flex w-full max-w-md overflow-hidden rounded-md border">
            <Input
              type="url"
              placeholder="Enter URL"
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="rounded-none border-l">Shorten</Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-center text-sm text-black space-y-1">
          <p>ShortURL is a free tool to shorten URLs and generate short links</p>
          <p>
            URL shortener allows to create a shortened link making it easy to share
          </p>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-2xl mt-6">
        <CardHeader>
          <CardTitle className="text-black text-center text-2xl font-bold">
            Want More?
          </CardTitle>
          <CardDescription className="text-black text-center">
            Custom short links, powerful dashboard, detailed analytics, API, UTM builder, QR codes,
            browser extension, app integrations and support
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full sm:w-[50%] mx-auto cursor-pointer"
            onClick={() => (window.location.href = "/register")}
          >
            Create an account
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
