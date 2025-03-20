"use client";

import { useFormContext } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@core/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@core/components/ui/radio-group";

interface Props {
    name: string;
    defaultValue?: string | number | boolean;
    label: string;
    options: {
        text: string;
        value: string | number | boolean;
    }[];
}

export function RadioInput({ name, label, options, defaultValue }: Props) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={String(defaultValue)}
                            className="flex flex-row space-y-1"
                        >
                            {options.map((option) => (
                                <FormItem
                                    key={String(option.value)}
                                    className="flex items-center space-x-3 space-y-0"
                                >
                                    <FormControl>
                                        <RadioGroupItem
                                            value={String(option.value)}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {option.text}
                                    </FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
