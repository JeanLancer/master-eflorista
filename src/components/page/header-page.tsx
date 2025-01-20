import TitlePage from "@core/components/page/title-page";
import React from "react";

interface Props {
    title: string;
    children?: React.ReactNode;
}

export default function HeaderPage({ title, children }: Props) {
    return (
        <div className="flex items-center justify-between space-y-2">
            <TitlePage title={title} />
            {children}
        </div>
    );
}
