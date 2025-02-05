import { Badge } from "@core/components/ui/badge";
import { numberToCurrency } from "@core/lib/utils";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<object>[] = [
    {
        accessorKey: "code",
        header: "Código",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("code")}</div>
        ),
    },
    {
        accessorKey: "store_name",
        header: "Loja",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("store_name")}</div>
        ),
    },
    {
        accessorKey: "customer_name",
        header: "Cliente",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("customer_name")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <Badge className="bg-green-500">{row.getValue("status")}</Badge>
            );
        },
    },
    {
        accessorKey: "total_amount",
        header: "Valor",
        cell: ({ row }) => {
            const value = parseFloat(row.getValue("total_amount"));
            return <div className="font-medium">{numberToCurrency(value)}</div>;
        },
    },
    {
        accessorKey: "payment_type",
        header: "Pagamento",
        cell: ({ row }) => {
            return (
                <Badge className="bg-blue-500">
                    {row.getValue("payment_type")}
                </Badge>
            );
        },
    },
    {
        accessorKey: "platform_name",
        header: "Plataforma",
        cell: ({ row }) => {
            return (
                <Badge className="bg-blue-500">
                    {row.getValue("platform_name")}
                </Badge>
            );
        },
    },
];
