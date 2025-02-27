import { Metadata } from "next";

import {
    getSummary,
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
import { DollarSign, HandCoins } from "lucide-react";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Painel Gerenciador do E-Florista.",
};

export default async function DashboardPage() {
    const [transactions, summary] = await Promise.all([
        getTodayTransactions(),
        getSummary(),
    ]);

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
                                <HandCoins size={18} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {numberToCurrency(summary.total_today)}
                                </div>
                                {/* <p className="text-xs text-muted-foreground">
                                    +20.1% último mês
                                </p> */}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Vendas no Mês
                                </CardTitle>
                                <DollarSign size={18} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {numberToCurrency(
                                        summary.total_last_30_days
                                    )}
                                </div>
                                {/* <p className="text-xs text-muted-foreground">
                                    +19% último mês
                                </p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Últimos 6 Meses
                                </CardTitle>
                                <DollarSign size={18} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {numberToCurrency(
                                        summary.total_last_6_months
                                    )}
                                </div>
                                {/* <p className="text-xs text-muted-foreground">
                                    +180.1% último semestre
                                </p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Ticket Médio
                                </CardTitle>
                                <DollarSign size={18} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {numberToCurrency(summary.avg_ticket)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-7 md:col-span-7">
                            <CardHeader>
                                <CardTitle>Lista Vendas Recentes</CardTitle>
                                <CardDescription>
                                    {`Você fez ${summary.num_transactions} vendas hoje.`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SalesTable transactions={transactions} />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
