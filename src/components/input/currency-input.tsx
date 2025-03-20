import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@core/components/ui/form";
import { Input } from "@core/components/ui/input";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface Props {
    name: string;
    label?: string;
    className?: string;
}

export default function CurrencyInput({
    name,
    label,
    className = "w-1/2",
}: Props) {
    const { control, setValue } = useFormContext();

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
        setValue(name, formatCurrency(event.target.value));
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={clsx(className)}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            {...field}
                            onChange={handleChange}
                            placeholder="R$ 0,00"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
