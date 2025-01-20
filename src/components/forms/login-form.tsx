"use client";

import { Button } from "@core/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@core/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormMessage,
} from "@core/components/ui/form";
import { Input } from "@core/components/ui/input";
import { Label } from "@core/components/ui/label";
import { cn } from "@core/lib/utils";
import { useToast } from "@core/providers/toast-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(1, { message: "Preencha a senha" }),
});

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "Login Realizado",
            description: "Autenticação autorizada",
            type: "success",
            duration: 1000,
        });

        router.push("/dashboard");
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-gray-400">
                        Login
                    </CardTitle>
                    <CardDescription>
                        Coloque seu email abaixo para entrar na sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">
                                                E-mail
                                            </Label>
                                            <FormControl>
                                                <Input
                                                    placeholder="email@exemplo.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">
                                                    Senha
                                                </Label>
                                                <a
                                                    href="#"
                                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                                >
                                                    Esqueceu sua senha?
                                                </a>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    )}
                                />

                                <Button
                                    className="w-full text-lg"
                                    type="submit"
                                >
                                    Entrar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
