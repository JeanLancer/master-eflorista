"use server";

export async function getTodayTransactions() {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_MASTER_URL}/transactions/today`,
        {
            method: "GET",
            cache: "no-cache",
        }
    ).then((data) => data.json());

    return data;
}

export async function getSummary() {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_MASTER_URL}/transactions/summary`,
        {
            method: "GET",
            cache: "no-cache",
        }
    ).then((data) => data.json());

    return data;
}
