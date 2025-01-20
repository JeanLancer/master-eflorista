"use client";

import { Button } from "@core/components/ui/button";
import clsx from "clsx";
import { Upload, X, XCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {
    name: string;
    defaultImage?: string;
    isRequired?: boolean;
}

const ONE_MB_IN_BYTES = 1048576;

export default function UploadInput({
    name,
    defaultImage = "",
    ...rest
}: Props) {
    const { register, setValue, getValues, watch } = useFormContext<{
        [key: string]: string;
    }>();

    const refData = register(name);
    const [isFocus, setIsFocus] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [url, setUrl] = useState(defaultImage);
    const [isDirt, setIsDirt] = useState(false);

    const value = watch(name);

    useEffect(() => {
        if (!url && defaultImage && !isDirt) {
            setUrl(defaultImage);
            setIsDirt(true);
        }
    }, [defaultImage, isDirt, url]);

    useEffect(() => {
        if (!value) {
            setUrl("");
            return;
        }

        const file = value[0] as any;
        if (!file) return;
        setUrl(URL.createObjectURL(file));
    }, [value]);

    return !url ? (
        <label
            htmlFor="dropzone-file"
            className={clsx(
                "flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:hover:bg-bray-800 dark:bg-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-600",
                {
                    "border-neutral-300": !isErrored && !isFocus,
                    "border-danger-500": isErrored,
                    "border-brand-500": isFocus,
                }
            )}
            onDragLeave={(e) => {
                e.preventDefault();
            }}
            onDragOver={(e) => {
                e.preventDefault();
                setIsFocus(true);
                setIsErrored(false);
            }}
            onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    if (files[0].size / ONE_MB_IN_BYTES > 1) {
                        setIsErrored(true);
                        return;
                    }
                }
                setValue(name, files as any);
                setIsFocus(false);
            }}
        >
            {!isErrored && (
                <div className="flex flex-col items-center justify-center text-neutral-500 pt-5 pb-6">
                    <Upload size={24} />
                    <p className="mb-2 text-sm">Solte a imagem aqui</p>
                    <p className="text-xs">PNG ou JPG</p>
                </div>
            )}

            {isErrored && (
                <div className="flex flex-col items-center justify-center text-danger-500 pt-5 pb-6">
                    <XCircle size={24} />
                    <p className="mb-2 text-sm font-medium">
                        Imagem muito grande (máx. 4MB)
                    </p>
                </div>
            )}

            <input
                id="dropzone-file"
                accept="image/*"
                type="file"
                className="hidden"
                {...rest}
                {...refData}
            />
        </label>
    ) : (
        <div className="w-fit flex flex-col gap-2">
            <Image
                className="object-contain"
                src={url}
                width={200}
                height={200}
                alt="Logo uploaded"
            />

            <Button
                type="button"
                variant="destructive"
                size="sm"
                className="w-full text-xs flex gap-2"
                onClick={() => setUrl("")}
            >
                <X size={14} />
                Remover imagem
            </Button>
        </div>
    );
}
