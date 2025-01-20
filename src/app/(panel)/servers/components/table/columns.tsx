import { Data } from "@core/app/(panel)/servers/page";
import { Badge } from "@core/components/ui/badge";
import { Checkbox } from "@core/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Data>[] = [
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <Badge className="bg-green-500">{row.getValue("status")}</Badge>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="flex justify-center">Ações</div>,
        enableHiding: false,
        cell: () => {
            return (
                <div className="flex justify-center gap-4 ml-auto">
                    <Badge className="hover:cursor-pointer">Reiniciar</Badge>
                    <Badge
                        className="hover:cursor-pointer"
                        variant="destructive"
                    >
                        Desligar
                    </Badge>
                </div>
            );
        },
    },
];
