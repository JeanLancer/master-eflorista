"use client";

import { Boxes, LayoutGrid, Server, Store } from "lucide-react";
import * as React from "react";

import { TeamSwitcher } from "@core/components/buttons/team-switcher";
import { NavMain } from "@core/components/navigations/nav-main";
import { NavUser } from "@core/components/navigations/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@core/components/ui/sidebar";

const data = {
    user: {
        name: "Admin",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Painel Geral",
            logo: Store,
            store: "Acesso Geral",
        },
        {
            name: "Painel Cliente",
            logo: Store,
            store: "AdoroFlores",
        },
        {
            name: "Painel Cliente",
            logo: Store,
            store: "Yumi",
        },
        {
            name: "Painel Cliente",
            logo: Store,
            store: "CassiaFlores",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutGrid,
            isActive: true,
        },
        {
            title: "Lojas",
            url: "/stores",
            icon: Store,
            isActive: false,
            items: [
                {
                    title: "Listagem",
                    url: "/stores",
                },
                {
                    title: "Cadastrar Loja",
                    url: "/stores/register",
                },
            ],
        },
        {
            title: "Aplicativos",
            url: "/applications",
            icon: Boxes,
            isActive: false,
            items: [
                {
                    title: "Cadastrar Aplicativo",
                    url: "/applications/register",
                },
            ],
        },
        {
            title: "Servidores",
            url: "/servers",
            icon: Server,
            isActive: false,
            items: [
                {
                    title: "Logs",
                    url: "/servers/logs",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
