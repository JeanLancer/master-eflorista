"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

const profileFormSchema = z
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
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "As senhas não coincidem",
        path: ["confirm_password"],
    });

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface Props {
    store?: string;
}

export function StoreForm({ store }: Props) {
    const router = useRouter();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        mode: "onChange",
    });

    function onSubmit(data: ProfileFormValues) {
        if (store) return;
        router.push("/stores");
    }

    return (
        <div className="w-full flex flex-col max-w-[800px] gap-4">
            <div>
                <h3 className="text-lg font-medium">
                    {store ? "Atualizar Loja" : "Cadastrar Nova Loja"}
                </h3>
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

                    <Button type="submit">
                        {store ? "Atualizar" : "Cadastrar"}{" "}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
