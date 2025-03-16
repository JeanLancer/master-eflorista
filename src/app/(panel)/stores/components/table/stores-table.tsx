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

import { columns } from "@core/app/(panel)/stores/components/table/columns";
import HeaderPage from "@core/components/page/header-page";
import { Button } from "@core/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@core/components/ui/card";
import { Input } from "@core/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@core/components/ui/table";
import { Store } from "@core/lib/types";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    data: Store[];
}

export default function StoreTable({ data }: Props) {
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
        initialState: {
            pagination: {
                pageSize: data.length,
            },
        },
    });

    return (
        <div className="w-full flex flex-col">
            <HeaderPage title="Listagem das Lojas" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-2">
                <Card className="col-span-7 md:col-span-7">
                    <CardHeader>
                        <CardDescription>
                            <div className="w-full flex justify-between items-center bg-white">
                                <Link href="/stores/register">
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
                                                ?.getFilterValue() as string) ??
                                            ""
                                        }
                                        onChange={(event) =>
                                            table
                                                .getColumn("name")
                                                ?.setFilterValue(
                                                    event.target.value
                                                )
                                        }
                                    />
                                </div>
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-full max-h-[580px] flex rounded-md border overflow-auto">
                            <Table>
                                <TableHeader>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => {
                                                        return (
                                                            <TableHead
                                                                key={header.id}
                                                            >
                                                                {header.isPlaceholder
                                                                    ? null
                                                                    : flexRender(
                                                                          header
                                                                              .column
                                                                              .columnDef
                                                                              .header,
                                                                          header.getContext()
                                                                      )}
                                                            </TableHead>
                                                        );
                                                    }
                                                )}
                                            </TableRow>
                                        ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={
                                                    row.getIsSelected() &&
                                                    "selected"
                                                }
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
