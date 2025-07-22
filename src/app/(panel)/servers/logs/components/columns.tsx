"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@core/components/ui/checkbox";

import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Servidor" />
        ),
        cell: ({ row }) => (
            <div className="w-[104px]">{row.original.server_ip}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="API" />
        ),
        cell: ({ row }) => (
            <div className="w-[104px]">{row.original.service_name}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "message",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mensagem" />
        ),
        cell: ({ row }) => (
            <div className="w-[104px]">{row.original.message}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status: string = row.getValue("status");

            return (
                <div className="flex w-[100px] items-center text-danger-800">
                    <AlertCircle size={18} className="mr-2" />
                    <span>{status}</span>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "message",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data" />
        ),
        cell: ({ row }) => (
            <div className="w-[104px]">
                {format(row.original.created_at, "dd/MM/yy HH:mm")}
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
];
