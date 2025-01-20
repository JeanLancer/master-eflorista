import { AppSidebar } from "@core/components/sidebar/app-sidebar";
import { SidebarProvider } from "@core/components/ui/sidebar";

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <main className="w-screen h-screen flex">
                <AppSidebar />
                <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
            </main>
        </SidebarProvider>
    );
}
