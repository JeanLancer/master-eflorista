import { Metadata } from "next";

import {
    getLastSixMonthTransactions,
    getTodayTransactions,
} from "@core/app/(panel)/dashboard/actions";
import SalesTable from "@core/app/(panel)/dashboard/components/table/sales-table";
import HeaderPage from "@core/components/page/header-page";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@core/components/ui/card";
import { Tabs, TabsContent } from "@core/components/ui/tabs";
import { numberToCurrency } from "@core/lib/utils";
import { subMonths } from "date-fns";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
    const lastSixMonthsTransactions = await getLastSixMonthTransactions();

    const totalSellSixMonths = lastSixMonthsTransactions
        .filter((item) => item.status !== "NEGADO")
        .reduce((prev, curr) => {
            return prev + Number(curr.total_amount);
        }, 0);

    const lastMonthTransactions = lastSixMonthsTransactions.filter(
        (item) =>
            item.created_at >=
            subMonths(new Date(new Date().setHours(0, 0, 0, 0)), 1)
    );

    const todayTransactions = await getTodayTransactions();

    const todaySell = todayTransactions
        .filter((item) => item.status !== "NEGADO")
        .reduce((prev, curr) => {
            return prev + Number(curr.total_amount);
        }, 0);

    return (
        <div className="w-full flex-col md:flex bg-background">
            <HeaderPage title="Dashboard" />

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Vendido
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {numberToCurrency(todaySell)}
                                </div>
                                {/* <p className="text-xs text-muted-foreground">
                                    +20.1% último mês
                                </p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Últimos 6 Meses
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {numberToCurrency(totalSellSixMonths)}
                                </div>
                                {/* <p className="text-xs text-muted-foreground">
                                    +180.1% último semestre
                                </p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Vendas no Mês
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <rect
                                        width="20"
                                        height="14"
                                        x="2"
                                        y="5"
                                        rx="2"
                                    />
                                    <path d="M2 10h20" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +{lastMonthTransactions.length}
                                </div>
                                {/* <p className="text-xs text-muted-foreground">
                                    +19% último mês
                                </p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Clientes Inadimplentes
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0</div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-7 md:col-span-7">
                            <CardHeader>
                                <CardTitle>Lista Vendas Recentes</CardTitle>
                                <CardDescription>
                                    {`Você fez ${todayTransactions.length} vendas hoje.`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SalesTable
                                    transactions={todayTransactions.map(
                                        (sale) => {
                                            return {
                                                ...sale,
                                                total_amount:
                                                    sale.total_amount?.toString(),
                                            };
                                        }
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
