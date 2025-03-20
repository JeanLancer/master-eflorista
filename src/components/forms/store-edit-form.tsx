"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateStores } from "@core/app/(panel)/stores/actions";
import CurrencyInput from "@core/components/input/currency-input";
import InputMask from "@core/components/input/input-mask";
import { RadioInput } from "@core/components/input/radio-input";
import SelectInput from "@core/components/input/select-input";
import { Button } from "@core/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@core/components/ui/form";
import { Input } from "@core/components/ui/input";
import { Store, UpdateStoreDTO } from "@core/lib/types";
import { numberToCurrency, parseCurrency } from "@core/lib/utils";
import { useToast } from "@core/providers/toast-provider";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const updateStoreSchema = z
    .object({
        name: z.string().min(1, { message: "Preencha o nome da loja" }),
        is_enable: z.any(),
        city: z.string().optional(),
        document: z.string().optional(),
        whatsapp: z.string().optional(),
        billing_amount: z.any(),
        comission: z.any(),
        payment_status: z.string(),
    })
    .transform((data) => {
        return {
            ...data,
            is_enable: data.is_enable === "true",
            billing_amount: parseCurrency(data.billing_amount),
        };
    });

interface Props {
    store: Store;
}

export function StoreEditForm({ store }: Props) {
    const { toast } = useToast();

    const form = useForm<UpdateStoreDTO>({
        resolver: zodResolver(updateStoreSchema),
        defaultValues: {
            name: store.name || "",
            city: store.city || "",
            is_enable: store.is_enable || false,
            whatsapp: store.whatsapp || "",
            payment_status: store.payment_status || "",
            document: store.document || "",
            billing_amount: numberToCurrency(
                Number(store.billing_amount || 0)
            ) as any,
            comission: Number(store.comission || 0),
        },
        mode: "onChange",
    });

    async function onSubmit(data: UpdateStoreDTO) {
        const response = await updateStores(store.id, data);

        if (response.status !== 200) {
            toast({
                title: "Opps! Ocorreu um problema.",
                description: "Não foi possível atualizar a loja.",
                type: "error",
                duration: 4000,
            });

            return;
        }

        toast({
            title: "Ação Realizada.",
            description: "Loja Atualizada com Sucesso",
            type: "success",
            duration: 4000,
        });
    }

    return (
        <div className="w-full flex flex-col max-w-[800px] gap-4">
            <div>
                <h3 className="text-lg font-medium">{"Atualizar Loja"}</h3>
                <p className="text-sm text-muted-foreground">
                    Preencha os dados da loja abaixo.
                </p>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da Loja</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    O nome da loja é usado para criar o banco de
                                    dados e toda estrutura necessária para a
                                    loja, se possível utilize um nome que não
                                    precisará ser alterado no futuro.
                                </FormDescription>
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex gap-4">
                        <div className="w-1/2">
                            <RadioInput
                                label="Situação da Loja"
                                name="is_enable"
                                options={[
                                    {
                                        text: "Ativo",
                                        value: "true",
                                    },
                                    {
                                        text: "Inativo",
                                        value: "false",
                                    },
                                ]}
                                defaultValue={form.getValues("is_enable")}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="comission"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Comissão %</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full flex gap-4">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <InputMask
                            label="CNPJ"
                            name="document"
                            mask="99.999.999/9999-99"
                        />

                        <InputMask
                            label="Whatsapp"
                            name="whatsapp"
                            mask="(99) 99999-9999"
                        />
                    </div>

                    <div className="w-full flex gap-4">
                        <div className="w-1/2">
                            <SelectInput
                                label="Status Pagamento"
                                name="payment_status"
                                options={[
                                    {
                                        label: "Pago",
                                        value: "PAID",
                                    },
                                    {
                                        label: "Pendente",
                                        value: "PENDING",
                                    },
                                    {
                                        label: "Cancelado",
                                        value: "CANCELED",
                                    },
                                ]}
                            />
                        </div>

                        <CurrencyInput
                            name="billing_amount"
                            label="Mensalidade"
                        />
                    </div>

                    <Button type="submit">Atualizar</Button>
                </form>
            </Form>
        </div>
    );
}
