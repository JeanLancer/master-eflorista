import { currentUser } from "@clerk/nextjs/server";
import { AppSidebar } from "@core/components/sidebar/app-sidebar";
import { SidebarProvider } from "@core/components/ui/sidebar";
import Toast from "@core/components/ui/toast";
import ToastProvider from "@core/providers/toast-provider";
import { redirect } from "next/navigation";

export default async function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser();

    if (!user) redirect("/");

    return (
        <SidebarProvider>
            <main className="w-screen h-screen flex">
                <ToastProvider>
                    <AppSidebar />
                    <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
                    <Toast />
                </ToastProvider>
            </main>
        </SidebarProvider>
    );
}
