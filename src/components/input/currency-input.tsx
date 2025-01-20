import { Input } from "@core/components/ui/input";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface Props {
    fields: ControllerRenderProps<any>;
}

export default function CurrencyInput({ fields }: Props) {
    const [value, setValue] = useState("");

    const formatCurrency = (val: string) => {
        const numericValue = val.replace(/\D/g, "");
        const floatValue = parseFloat(numericValue) / 100;

        if (isNaN(floatValue)) return "";

        return floatValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(formatCurrency(event.target.value));
    };

    return (
        <Input
            {...fields}
            value={value}
            onChange={handleChange}
            placeholder="R$ 0,00"
        />
    );
}
