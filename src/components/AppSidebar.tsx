'use client'
import {
    User,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import TrenalyzeIcon from "@/../public/Group 70.png"
import Image from "next/image";
import { CiLink } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { usePathname } from 'next/navigation'


export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar className="bg-black text-white">
            <SidebarContent className="flex flex-col justify-between h-full !bg-[#1F1F1F]">
                <div>
                    <div className="flex justify-start">
                        <Image src={TrenalyzeIcon} alt="Logo" className="w-[12%] ms-3 mt-3 mb-5" />
                        <p className="flex items-center ms-3">short.me</p>
                    </div>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem className={`${pathname === "/dashboard/add-link" ? "!bg-white text-black rounded-md" : ""}`}>
                                <SidebarMenuButton asChild>
                                    <a href="#" className="flex items-center gap-3 p-2 rounded-md">
                                        <CiLink className="w-5 h-5" />
                                        <span>Add Link</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem className={`${pathname === "/dashboard/list-links" ? "!bg-white text-black rounded-md" : ""}`}>
                                <SidebarMenuButton asChild>
                                    <a href="#" className="flex items-center gap-3 p-2 rounded-md">
                                        <IoIosSearch className="w-5 h-5" />
                                        <span>List Links</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </div>
                <div className="mb-4 ms-2">
                    <SidebarMenu>
                        <SidebarMenuItem className={`${pathname === "/profile" ? "!bg-white text-black rounded-md me-2" : "me-2"}`}>
                            <SidebarMenuButton asChild>
                                <a href="#" className="flex items-center gap-3 p-2 rounded-md">
                                    <User className="w-5 h-5" />
                                    <span>Profile</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}