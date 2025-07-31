import { getTransactionById } from "@core/app/(panel)/dashboard/actions";
import { Suspense } from "react";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function TransactionsPage({ params }: Props) {
    const { id } = await params;
    const transaction = await getTransactionById(id);

    console.log(transaction)

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className="w-screen flex flex-col justify-center p-4 bg-white">
                {transaction.gateway_data ? (
                    <>
                        <h1>Dados da Requisição {transaction.platform_name}</h1>
                        <p className="text-sm font-medium whitespace-pre-wrap">
                            {JSON.stringify(transaction.gateway_data, null, 4)}
                        </p>
                    </>
                ) : (
                    <p>Essa transação não possui dados registrados</p>
                )}
            </div>
        </Suspense>
    );
}
