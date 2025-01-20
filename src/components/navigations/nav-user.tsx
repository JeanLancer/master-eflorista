"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { SignOutButton, useUser } from "@clerk/nextjs";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@core/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@core/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@core/components/ui/sidebar";

export function NavUser() {
    const { isMobile } = useSidebar();
    const { user } = useUser();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user?.imageUrl}
                                    alt={user?.firstName || ""}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {user?.firstName?.charAt(2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user?.firstName}
                                </span>
                                <span className="truncate text-xs">
                                    {user?.emailAddresses[0].emailAddress}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user?.imageUrl}
                                        alt={user?.firstName || ""}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {user?.firstName
                                            ?.charAt(2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user?.firstName}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user?.emailAddresses[0].emailAddress}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <SignOutButton>
                            <DropdownMenuItem>
                                <LogOut />
                                Sair
                            </DropdownMenuItem>
                        </SignOutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
