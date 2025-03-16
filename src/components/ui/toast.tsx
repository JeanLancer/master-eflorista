"use client";

import { useToast } from "@core/providers/toast-provider";
import clsx from "clsx";
import {
    AlertTriangle,
    CheckCircle2,
    HelpCircle,
    X,
    XCircle,
} from "lucide-react";

export default function Toast() {
    const { isOpen, data, close } = useToast();

    const icons = {
        success: <CheckCircle2 size={24} />,
        info: <HelpCircle size={24} />,
        error: <XCircle size={24} />,
        warning: <AlertTriangle size={24} />,
    };

    return (
        isOpen && (
            <div className="w-full fixed bottom-10 z-[5000] animate-automation-zoom-in  transition-all ease-in-out duration-[300] px-2">
                <div
                    className={
                        "w-full md:max-w-[400px] flex bg-white mx-auto rounded-xl gap-4 pr-4 shadow-lg"
                    }
                >
                    <div
                        className={clsx(
                            "min-h-max flex text-white items-center rounded-tl-lg rounded-bl-lg px-2",
                            {
                                "bg-success-500": data.type === "success",
                                "bg-warning-500": data.type === "warning",
                                "bg-danger-500": data.type === "error",
                                "bg-info-500": data.type === "info",
                            }
                        )}
                    >
                        {icons[data.type]}
                    </div>
                    <div className="w-full flex flex-col py-2">
                        <span className="font-medium text-sm text-neutral-900">
                            {data.title}
                        </span>
                        <p className="text-sm text-neutral-600 leading-4">
                            {data.description}
                        </p>
                    </div>
                    <div
                        className="py-2 cursor-pointer"
                        onClick={() => close()}
                    >
                        <X size={16} />
                    </div>
                </div>
            </div>
        )
    );
}
