"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createStore } from "@core/app/(panel)/stores/actions";
import CurrencyInput from "@core/components/input/currency-input";
import InputMask from "@core/components/input/input-mask";
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
import { parseCurrency } from "@core/lib/utils";
import { useToast } from "@core/providers/toast-provider";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const createStoreSchema = z
    .object({
        name: z.string().min(1, { message: "Preencha o nome da loja" }),
        email: z
            .string({
                required_error: "Preencha o e-mail",
            })
            .email({ message: "Preencha um e-mail válido" }),
        password: z.string().min(1, { message: "Preencha o campo senha" }),
        confirm_password: z
            .string()
            .min(1, { message: "Preencha o campo confirmar senha" }),
        document: z.string().optional(),
        billing_amount: z.any(),
        city: z.string().optional(),
        whatsapp: z.string().optional(),
    })
    .transform((data) => {
        return {
            ...data,
            billing_amount: parseCurrency(data.billing_amount),
        };
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "As senhas não coincidem",
        path: ["confirm_password"],
    });

export function StoreForm() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createStoreSchema>>({
        resolver: zodResolver(createStoreSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            document: "",
            billing_amount: "R$ 0,00" as any,
            city: "",
            whatsapp: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    async function onSubmit(data: z.infer<typeof createStoreSchema>) {
        const response = await createStore({
            store: {
                name: data.name!,
                document: data.document!,
                city: data.city!,
                whatsapp: data.whatsapp!,
                billing_amount: data.billing_amount!,
                payment_status: "PENDING" as string,
            },
            user: {
                email: data.email,
                password: data.password,
            },
        });

        if (response.status !== 201) {
            toast({
                title: "Opps! Ocorreu um problema.",
                description: "Não foi possível atualizar a loja.",
                type: "error",
                duration: 4000,
            });
        }

        toast({
            title: "Ação Realizada.",
            description: "Loja Criada com Sucesso",
            type: "success",
            duration: 4000,
        });

        router.push("/stores");
    }

    return (
        <div className="w-full flex flex-col max-w-[800px] gap-4">
            <div>
                <h3 className="text-lg font-medium">Cadastrar Nova Loja</h3>
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

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail do Admnistrador</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex gap-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Senha do Admnistrador</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Confirmar Senha</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full flex gap-4">
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
                        <CurrencyInput
                            name="billing_amount"
                            label="Mensalidade"
                        />
                    </div>

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        title={isSubmitting ? "Aguarde..." : "Cadastrar"}
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Cadastrar"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
