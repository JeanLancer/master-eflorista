import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@core/components/ui/form";
import { Input } from "@core/components/ui/input";
import { useFormContext } from "react-hook-form";

interface Props {
    name: string;
    label?: string;
    mask: string;
}

export default function MaskedInput({ name, mask, label }: Props) {
    const { control, setValue } = useFormContext();

    const applyMask = (val: string) => {
        const numericValue = val.replace(/\D/g, "");
        let maskedValue = "";
        let index = 0;

        for (const char of mask) {
            if (char === "9") {
                if (index < numericValue.length) {
                    maskedValue += numericValue[index];
                    index++;
                } else {
                    break;
                }
            } else {
                maskedValue += char;
            }
        }

        return maskedValue;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const masked = applyMask(event.target.value);
        setValue(name, masked);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-1/2">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            {...field}
                            onChange={handleChange}
                            placeholder={mask.replace(/9/g, "0")} // Mostra a máscara como placeholder
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
