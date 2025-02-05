import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function numberToCurrency(value: number) {
    const number =
        typeof value === "string" ? parseFloat(value) : Number(value);

    if (isNaN(number)) {
        return "R$ 0,00";
    }

    return number.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
