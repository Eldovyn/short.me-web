'use client';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/AppSidebar";
import { useMediaQuery } from "react-responsive";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    return (
        <SidebarProvider style={{ "--sidebar-width": "346px" } as React.CSSProperties}>
            <div className="flex h-screen w-screen overflow-hidden">
                {isLg && (!isSm || isMd || isDefault) ? <AppSidebar /> : <Navbar />}
                <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#F3F3F7]">
                    {isLg && (!isSm || isMd || isDefault) && <SidebarTrigger />}
                    <main className={`flex-1 overflow-auto h-screen ${!isLg ? 'pt-[90px]' : ''}`}>
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}