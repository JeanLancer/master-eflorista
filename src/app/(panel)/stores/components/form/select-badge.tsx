"use client";

import { updateStores } from "@core/app/(panel)/stores/actions";
import { updateStoreSchema } from "@core/components/forms/store-edit-form";
import { Badge } from "@core/components/ui/badge"; // Importando Badge
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@core/components/ui/select";
import { Store } from "@core/lib/types";
import { numberToCurrency } from "@core/lib/utils";
import { useToast } from "@core/providers/toast-provider";
import { useEffect, useState } from "react";

type Option = {
    label: string;
    value: "PAID" | "PENDING" | "CANCELED";
};

const options: Option[] = [
    {
        label: "Pago",
        value: "PAID",
    },
    {
        label: "Pendente",
        value: "PENDING",
    },
    {
        label: "Cancelado",
        value: "CANCELED",
    },
];

interface Props {
    store: Store;
    defaultValue: string;
}

export default function StoreSelectPaymentStatus({
    store,
    defaultValue,
}: Props) {
    const { toast } = useToast();
    const [value, setValue] = useState(defaultValue);

    const getBadgeColor = (status: string) => {
        switch (status) {
            case "PAID":
                return "bg-green-500 text-white";
            case "CANCELED":
                return "bg-red-500 text-white";
            case "PENDING":
                return "bg-yellow-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    const onChange = async (value: string) => {
        setValue(value);

        const data = updateStoreSchema.parse({
            ...store,
            billing_amount: numberToCurrency(
                Number(store.billing_amount || 0)
            ) as any,
        });

        const response = await updateStores(store.id, {
            ...data,
            billing_amount: data.billing_amount,
            payment_status: value,
        });

        if (response.status !== 200) {
            toast({
                title: "Opps! Ocorreu um problema.",
                description: "Não foi possível atualizar a loja.",
                type: "error",
                duration: 4000,
            });
            return;
        }

        toast({
            title: "Ação Realizada.",
            description: "Loja Atualizada com Sucesso",
            type: "success",
            duration: 4000,
        });
    };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <Select onValueChange={onChange} defaultValue={defaultValue}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um status">
                    {value && (
                        <Badge className={getBadgeColor(value)}>
                            {options.find((opt) => opt.value === value)?.label}
                        </Badge>
                    )}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        <Badge className={getBadgeColor(option.value)}>
                            {option.label}
                        </Badge>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
