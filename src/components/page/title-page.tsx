interface Props {
    title: string;
}

export default function TitlePage({ title }: Props) {
    return (
        <h2 className="text-xl md:text-3xl font-bold tracking-tight">
            {title}
        </h2>
    );
}
