import { Badge } from "@core/components/ui/badge";
import { numberToCurrency } from "@core/lib/utils";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format } from "date-fns";

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
                <Badge
                    className={clsx("bg-yellow-500", {
                        "bg-green-500": row.getValue("status") === "APROVADO",
                        "bg-red-500": row.getValue("status") === "NEGADO",
                    })}
                >
                    {row.getValue("status")}
                </Badge>
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
            const payment: string = row.getValue("payment_type");
            return (
                <Badge
                    className={clsx({
                        "bg-blue-500": payment === "CREDITCARD",
                        "bg-purple-500": payment === "DEPOSIT",
                    })}
                >
                    {payment}
                </Badge>
            );
        },
    },
    {
        accessorKey: "platform_name",
        header: "Plataforma",
        cell: ({ row }) => {
            return (
                <Badge className="bg-gray-900">
                    {row.getValue("platform_name")}
                </Badge>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Data/Hora",
        cell: ({ row }) => {
            return (
                <span>
                    {format(row.getValue("created_at"), "dd/MM/yy - HH:mm")}
                </span>
            );
        },
    },
];
