"use server";

export async function getLogs(params: { limit: number; page: number }) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_MASTER_URL}/logs`);

    url.searchParams.set("limit", params.limit.toString());
    url.searchParams.set("page", params.page.toString());

    const response = await fetch(url.toString(), {
        method: "GET",
        cache: "no-cache",
    });

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
