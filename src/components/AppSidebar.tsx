"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Link, List, ShoppingCart, LogOut, User, Settings } from "lucide-react";
import Image from "next/image";
import IconApp1 from "@/../public/icon software (1).png";

export function AppSidebar() {
    const menuItems = [
        { title: "Add Link", icon: Link, url: "#" },
        { title: "List Link", icon: List, url: "#" },
        { title: "Subscription", icon: ShoppingCart, url: "#" },
    ];

    return (
        <Sidebar className="text-white">
            <SidebarContent className="flex flex-col justify-between h-full !bg-[#282828]">
                <div>
                    <div className="flex flex-col items-center py-4">
                        <div className="w-[200px] h-[200px] relative -mt-[60px]">
                            <Image
                                src={IconApp1}
                                alt="logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex w-[279px] mx-auto">
                        <Separator className="bg-[#FFFFFF] mb-4 -translate-y-[80px]" />
                    </div>

                    <SidebarGroup className="-translate-y-[70px] !pe-8">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild className="hover:bg-[#1447E6] hover:text-white !rounded-[10px]">
                                            <a
                                                href={item.url}
                                                className="text-white font-semibold rounded-md h-[57px] w-[295px] flex items-center mb-6"
                                            >
                                                <div className="flex">
                                                    <item.icon size={30} className="font-semibold" />
                                                </div>
                                                <span className="ms-3">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>

                <SidebarGroup className="!pe-8">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key={'example'}>
                                <SidebarMenuButton asChild className="hover:bg-white hover:text-black !rounded-[10px]">
                                    <a
                                        href={''}
                                        className="text-black bg-white font-semibold rounded-md h-[57px] w-[295px] flex items-center mb-6 px-3"
                                    >
                                        <div className="flex">
                                            <User size={30} className="font-semibold" />
                                        </div>
                                        <span className="ms-3">{'example'}</span>
                                        <div className="ml-auto">
                                            <Settings size={30} className="font-semibold" />
                                        </div>
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild className="hover:bg-[#C10007] hover:text-white !rounded-[10px]">
                                    <a
                                        href={''}
                                        className="text-white bg-[#C10007] font-semibold rounded-md h-[57px] w-[295px] flex items-center mb-6 px-3"
                                    >
                                        <div className="flex">
                                            <LogOut size={30} className="font-semibold" />
                                        </div>
                                        <span className="ms-3">{'logout'}</span>
                                    </a>
                                </SidebarMenuButton>

                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
