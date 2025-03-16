"use server";

import { UpdateStoreDTO } from "@core/lib/types";

export async function createStore(data: UpdateStoreDTO) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_EFLORISTA_URL}/stores`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const responseData = await response.json();

    return { status: response.status, data: responseData };
}

export async function updateStores(id: string, data: UpdateStoreDTO) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_MASTER_URL}/stores/${id}`,
        {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return { status: response.status };
}

export async function getStores() {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_MASTER_URL}/stores`,
        {
            method: "GET",
            cache: "no-cache",
        }
    ).then((data) => data.json());

    return data;
}

export async function getStoresById(id: string) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_MASTER_URL}/stores/${id}`,
        {
            method: "GET",
            cache: "no-cache",
        }
    ).then((data) => data.json());

    return data;
}
