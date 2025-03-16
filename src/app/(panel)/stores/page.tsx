import { getStores } from "@core/app/(panel)/stores/actions";
import StoreTable from "@core/app/(panel)/stores/components/table/stores-table";

export default async function Page() {
    const stores = await getStores();

    return <StoreTable data={stores} />;
}
