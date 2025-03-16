import StoreSelectPaymentStatus from "@core/app/(panel)/stores/components/form/select-badge";
import { Button } from "@core/components/ui/button";
import { Checkbox } from "@core/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@core/components/ui/dropdown-menu";
import { Store } from "@core/lib/types";
import { numberToCurrency } from "@core/lib/utils";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Store>[] = [
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
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "city",
        header: "Cidade",
        cell: ({ row }) => <div>{row.getValue("city") || "Não Informado"}</div>,
    },
    {
        accessorKey: "document",
        header: "CNPJ",
        cell: ({ row }) => (
            <div>{row.getValue("document") || "Não Informado"}</div>
        ),
    },
    {
        accessorKey: "whatsapp",
        header: "Whatsapp",
        cell: ({ row }) => (
            <div>{row.getValue("whatsapp") || "Não Informado"}</div>
        ),
    },

    {
        accessorKey: "billing_amount",
        header: "Mensalidade",
        cell: ({ row }) => (
            <div>{numberToCurrency(row.getValue("billing_amount"))}</div>
        ),
    },
    {
        accessorKey: "payment_status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <StoreSelectPaymentStatus
                    store={row.original}
                    defaultValue={row.getValue("payment_status")}
                />
            );
        },
    },
    {
        accessorKey: "num_sales",
        header: () => <div className="text-center">Vendas no Mês</div>,
        cell: ({ row }) => {
            return (
                <div className="text-center font-medium">
                    {row.getValue("num_sales")}
                </div>
            );
        },
    },
    {
        id: "actions",
        accessorKey: "id",
        header: () => <div className="text-right">Ações</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const storeId = row.original.id;

            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={`/stores/edit/${storeId}`}>
                                    Editar Loja
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
