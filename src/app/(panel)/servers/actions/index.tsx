"use server";

export async function getLogs(params: { limit: number; page: number }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_MASTER_URL}/logs`,
        {
            method: "GET",
            cache: "no-cache",
        }
    );

    const data = await response.json();
    return data;
}

export async function getLogById(id: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_MASTER_URL}/logs/${id}`,
        {
            method: "GET",
            cache: "no-cache",
        }
    );

    const data = await response.json();
    return data;
}
