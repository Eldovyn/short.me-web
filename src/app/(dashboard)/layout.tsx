'use client';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useMediaQuery } from "react-responsive";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                {isLg && (!isSm || isMd || isDefault) && <AppSidebar />}
                <div className="flex flex-col flex-1 h-full overflow-hidden bg-white">
                    {isLg && (!isSm || isMd || isDefault) && <SidebarTrigger />}
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}