'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import IconApp1 from "@/../public/icon software (1).png";
import Plus from "@/../public/plus.png";
import Avatar from "@/../public/image 2 (1).png";
import { AlignJustify } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { Link, List, ShoppingCart, LogOut, User, Settings } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const isMd = useMediaQuery({ minWidth: 768 });

    if (!isOpen) return (
        <>
            <div className='fixed top-0 left-0 w-screen h-[90px] bg-[#282828] z-10'>
                <AlignJustify className="fixed top-0 right-0 flex flex-col h-[50px] w-[50px] bg-[#282828] text-white shadow-lg translate-x-[-25px] translate-y-[18px] cursor-pointer" onClick={() => setIsOpen(true)} />
            </div>
        </>
    );

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-[90px] bg-[#282828] z-10">
                <div className={`fixed top-0 right-0 flex flex-col h-[532px] ${isMd ? 'w-[346px]' : 'w-[248px]'} bg-[#282828] text-white shadow-lg translate-x-1 rounded-bl-[10px]`}>
                    <div className="flex justify-between items-center -mt-5">
                        <div className="w-[123px] h-[123px] relative">
                            <Image
                                src={IconApp1}
                                alt="logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div
                            className="w-[45px] h-[45px] relative cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <Image
                                src={Plus}
                                alt="close"
                                fill
                                className="object-contain translate-x-[-25px]"
                            />
                        </div>
                    </div>
                    <div className="flex-grow px-4 -mt-6">
                        <div className="flex mb-3">
                            <button className={`bg-[#1447E6] ${isMd ? 'flex flex-row items-center' : 'me-5'} text-[12px] ps-5 ms-3 hover:bg-blue-700 text-white font-normal ${isMd ? 'w-[280px]' : 'w-[192.04px]'} h-[36.88px] rounded-[6px] mb-2 text-left`}>
                                {isMd && <Link size={16} className='me-5' />}
                                Add Link
                            </button>
                        </div>
                        <div className="flex mb-3">
                            <button className={`bg-[#1447E6] ${isMd ? 'flex flex-row items-center' : 'me-5'} text-[12px] ps-5 ms-3 hover:bg-blue-700 text-white font-normal ${isMd ? 'w-[280px]' : 'w-[192.04px]'} h-[36.88px] rounded-[6px] mb-2 text-left`}>
                                {isMd && <List size={16} className='me-5' />}
                                List Link
                            </button>
                        </div>
                        <div className="flex mb-3">
                            <button className={`bg-[#1447E6] ${isMd ? 'flex flex-row items-center' : 'me-5'} text-[12px] ps-5 ms-3 hover:bg-blue-700 text-white font-normal ${isMd ? 'w-[280px]' : 'w-[192.04px]'} h-[36.88px] rounded-[6px] mb-2 text-left`}>
                                {isMd && <User size={16} className='me-5' />}
                                Profile
                            </button>
                        </div>
                    </div>
                    <div className="flex mb-3">
                        <button className={`text-[12px] ps-5 ms-8 me-10 flex flex-row bg-white text-black items-center hover:bg-blue-700 font-normal h-[36.88px] rounded-[6px] mb-2 text-left ${isMd ? 'w-[270px]' : 'w-[180px]'}`}>
                            <div className="w-[25px] h-[25px] relative">
                                <Image
                                    src={Avatar}
                                    alt="logo"
                                    fill
                                    className="object-contain translate-x-[-2px]"
                                />
                            </div>
                            <p className='translate-x-[5px] ms-2'>example</p>
                        </button>
                    </div>
                    <div className="w-full mb-5">
                        <button className={`bg-[#C10007] font-normal text-[12px] ms-8 me-6 ps-5 hover:bg-blue-700 text-white h-[36.88px] rounded-[6px] mb-2 text-left ${isMd ? 'w-[270px]' : 'w-[175px]'}`}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
