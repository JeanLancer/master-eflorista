import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import HeaderPage from "@core/components/page/header-page";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";

async function getTasks() {
    const data = await fs.readFile(
        path.join(process.cwd(), "src/app/(panel)/servers/logs/data/tasks.json")
    );

    const tasks = JSON.parse(data.toString());
    return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
    const tasks = await getTasks();

    return (
        <div className="w-full flex flex-col">
            <HeaderPage title="Logs do Servidor" />
            <div className="w-full py-4">
                <DataTable data={tasks} columns={columns} />
            </div>
        </div>
    );
}
