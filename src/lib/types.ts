import { updateStoreSchema } from "@core/components/forms/store-edit-form";
import { z } from "zod";

export type CreateStoreDTO = {
    store: {
        name: string;
        city: string;
        whatsapp: string;
        document: string;
        billing_amount: number;
        payment_status: string;
    };
    user: {
        email: string;
        password: string;
    };
};
export type UpdateStoreDTO = z.infer<typeof updateStoreSchema>;

export type Store = {
    id: string;
    name: string;
    city: string;
    is_enable: boolean;
    whatsapp: string;
    document: string;
    billing_amount: string;
    payment_status: string;
    comission: string;
};
