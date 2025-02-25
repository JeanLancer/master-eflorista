"use server";

import db from "@core/lib/db";
import { subHours, subMonths } from "date-fns";

export async function getLastSixMonthTransactions() {
    const transactions = await db.transactions.findMany({
        select: {
            id: true,
            code: true,
            store_name: true,
            customer_name: true,
            total_amount: true,
            status: true,
            payment_type: true,
            platform_name: true,
            created_at: true,
        },
        where: {
            AND: [
                {
                    created_at: {
                        gte: subMonths(
                            new Date(new Date().setHours(0, 0, 0, 0)),
                            6
                        ),
                    },
                },
                {
                    OR: [
                        {
                            status: "APROVADO",
                        },
                        {
                            status: "COMPROVANTE_ENVIADO",
                        },
                    ],
                },
            ],
        },
    });

    return transactions.map((transaction) => {
        return {
            ...transaction,
            total_amount: transaction.total_amount?.toString(),
        };
    });
}

export async function getTodayTransactions() {
    const transactions = await db.transactions.findMany({
        select: {
            id: true,
            code: true,
            store_name: true,
            customer_name: true,
            total_amount: true,
            status: true,
            payment_type: true,
            platform_name: true,
            created_at: true,
        },
        where: {
            AND: [
                {
                    created_at: {
                        gte: subHours(new Date().setHours(0, 0, 0, 0), 3),
                    },
                },
            ],
        },
        orderBy: [
            {
                created_at: "desc",
            },
        ],
    });

    return transactions.map((transaction) => {
        return {
            ...transaction,
            total_amount: transaction.total_amount?.toString(),
        };
    });
}
