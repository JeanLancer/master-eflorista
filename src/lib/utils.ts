import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseCurrency(value: string) {
    if (!value) return 0;

    return parseFloat(
        value
            .replace(/[^\d,]/g, "") // Remove tudo que não for número ou vírgula
            .replace(",", ".") // Troca a vírgula por ponto para formato numérico
    );
}

export function currencyToNumber(value: string): number {
    let number = value.replace(/./g, "").replace(/,/g, ".");
    number = number.replace("R$ ", "");
    console.log(number);
    return Number(number);
}

export function onlyNumber(value: string) {
    if (!value) return "";
    return String(value).replace(/[^0-9]/g, "");
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
