import { getStoresById } from "@core/app/(panel)/stores/actions";
import { StoreEditForm } from "@core/components/forms/store-edit-form";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

export default async function StoreRegisterPage({ params }: Props) {
    const id = await params.id;
    const store = await getStoresById(id);

    if (!store) redirect("/stores");

    return (
        <div className="space-y-6">
            <StoreEditForm store={store} />
        </div>
    );
}
