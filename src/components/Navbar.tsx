'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaBook } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdCollectionsBookmark } from "react-icons/md";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-xl font-bold text-gray-200">short.me</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-200 hover:text-white transition flex flex-row">
                            <IoMdHome size={24} className="mr-2" />
                            <p>Home</p>
                        </Link>
                        <Link href="/about" className="text-gray-200 hover:text-white transition flex flex-row">
                            <MdCollectionsBookmark size={22} className="mr-2 mt-[1px]" />
                            <p>Collection</p>
                        </Link>
                        <Link href="/services" className="text-gray-200 hover:text-white transition flex flex-row">
                            <FaBook size={19} className="mr-2 mt-[3px]" />
                            <p>API</p>
                        </Link>
                    </div>
                    <div className="hidden md:flex">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-200 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-gray-900 shadow-md absolute top-16 left-0 w-full py-4 space-y-4 text-center border-t-2 border-gray-800">
                    <Link href="/" className="block text-gray-200 hover:text-white transition">Home</Link>
                    <Link href="/about" className="block text-gray-200 hover:text-white transition">About</Link>
                    <Link href="/services" className="block text-gray-200 hover:text-white transition">Services</Link>
                    <Link href="/contact" className="block text-gray-200 hover:text-white transition">Contact</Link>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
                </div>
            )}
        </nav>
    );
}