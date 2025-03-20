import { Button } from "@core/components/ui/button";

import { updateStores } from "@core/app/(panel)/stores/actions";
import { updateStoreSchema } from "@core/components/forms/store-edit-form";
import { Store } from "@core/lib/types";
import { numberToCurrency } from "@core/lib/utils";
import { useToast } from "@core/providers/toast-provider";
import { redirect } from "next/navigation";

interface Props {
    store: Store;
}

export default function BlockStoreButton({ store }: Props) {
    const { toast } = useToast();

    const handlOnClick = async () => {
        const data = updateStoreSchema.parse({
            document: store.document || "",
            name: store.name || "",
            city: store.city || "",
            is_enable: "false",
            whatsapp: store.whatsapp || "",
            payment_status: store.payment_status || "",
            billing_amount: numberToCurrency(Number(store.billing_amount || 0)),
            comission: parseFloat(store.comission).toFixed(0) || 0,
        });

        const response = await updateStores(store.id, {
            ...data,
        });

        if (response.status !== 200) {
            toast({
                title: "Opps! Ocorreu um problema.",
                description: "Não foi possível bloquear a loja.",
                type: "error",
                duration: 4000,
            });
            return;
        }

        toast({
            title: "Ação Realizada.",
            description: "Loja Bloqueada com Sucesso",
            type: "success",
            duration: 4000,
        });

        redirect(`/stores`);
    };

    return (
        <Button
            className="bg-transparent text-red-500 px-0 hover:bg-transparent shadow-none"
            onClick={() => handlOnClick()}
        >
            Bloquear Loja
        </Button>
    );
}
