"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CurrencyInput from "@core/components/input/currency-input";
import UploadInput from "@core/components/input/image-upload";
import { Button } from "@core/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@core/components/ui/form";
import { Input } from "@core/components/ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    file: z.string().optional(),
    name: z.string().min(1, { message: "Preencha o nome do aplicativo" }),
    price: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
    store?: string;
}

export function ApplicationForm({ store }: Props) {
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: "",
            name: "",
            price: "",
        },
        mode: "onChange",
    });

    function onSubmit(data: FormValues) {
        if (store) return;
        router.push("/stores");
    }

    return (
        <div className="w-full flex flex-col max-w-[800px] gap-4">
            <div>
                <h3 className="text-lg font-medium">
                    {store
                        ? "Atualizar Aplicativo"
                        : "Cadastrar Novo Aplicativo"}
                </h3>
                <p className="text-sm text-muted-foreground">
                    Preencha os dados do aplicativo abaixo.
                </p>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormItem className="w-full">
                        <FormLabel>Imagem do Aplicativo</FormLabel>
                        <FormControl>
                            <UploadInput name="file" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                    <div className="w-full flex gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Nome do Aplicativo</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Preço</FormLabel>
                                    <FormControl>
                                        <CurrencyInput
                                            {...field}
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit">
                        {store ? "Atualizar" : "Cadastrar"}{" "}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
