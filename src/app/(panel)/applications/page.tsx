"use client";

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { columns } from "@core/app/(panel)/applications/components/table/columns";
import { CalendarDateRangePicker } from "@core/components/buttons/date-range-picker";
import HeaderPage from "@core/components/page/header-page";
import { Button } from "@core/components/ui/button";
import { Input } from "@core/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@core/components/ui/table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const data: Payment[] = [
    {
        id: "m5gr84i9",
        name: "Floricultura Teste",
        document: "10.1111.1111/40",
        status: "Ativa",
        total: 3434.9,
    },
    {
        id: "m5gr84i9",
        name: "Teste Lorem",
        document: "10.1111.1111/40",
        status: "Ativa",
        total: 3490,
    },
];

export type Payment = {
    id: string;
    name: string;
    document: string;
    status: string;
    total: number;
};

export default function BillingPage() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full flex flex-col">
            <HeaderPage title="Listagem das Lojas" />
            <div className="w-full flex justify-between items-center py-4">
                <Link href="/applications/register">
                    <Button>
                        <PlusIcon />
                        Nova Loja
                    </Button>
                </Link>
                <div className="w-[60%] flex justify-end gap-4">
                    <Input
                        className="max-w-lg"
                        placeholder="Filtrar loja..."
                        value={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("name")
                                ?.setFilterValue(event.target.value)
                        }
                    />

                    <div className="flex items-center">
                        <CalendarDateRangePicker />
                    </div>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum Resultado Encontrado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
