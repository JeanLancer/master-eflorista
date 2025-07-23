import { getLogs } from "@core/app/(panel)/servers/actions";
import HeaderPage from "@core/components/page/header-page";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default async function TaskPage() {
    const logs = await getLogs({ limit: 200, page: 0 });

    return (
        <div className="w-full flex flex-col">
            <HeaderPage title="Logs do Servidor" />
            <div className="w-full py-4">
                <DataTable data={logs} columns={columns} />
            </div>
        </div>
    );
}
