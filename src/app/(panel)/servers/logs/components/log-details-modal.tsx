import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@core/components/ui/dialog";
import { format } from "date-fns";

interface LogDetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    log: {
        id: string;
        service_name: string;
        message: string;
        data?: string;
        created_at: string | Date;
    } | null;
}

export function LogDetailsModal({
    open,
    onOpenChange,
    log,
}: LogDetailsModalProps) {
    if (!log) return;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[60vh] bg-white">
                <DialogHeader>
                    <DialogTitle className="font-medium">
                        Detalhes do Log
                    </DialogTitle>
                    <DialogDescription>
                        Informações detalhadas do log selecionado.
                    </DialogDescription>
                    <DialogDescription className="w-full flex flex-col space-y-2 text-sm">
                        <div>
                            <span className="font-medium">ID:</span> {log.id}
                        </div>
                        <div>
                            <span className="font-medium">Serviço:</span>{" "}
                            {log.service_name}
                        </div>
                        <div className="text-danger-600">
                            <span className="font-medium">Mensagem:</span>{" "}
                            {log.message}
                        </div>
                        <div>
                            <span className="font-medium">Data:</span>{" "}
                            {format(
                                new Date(log.created_at),
                                "dd/MM/yyyy HH:mm:ss"
                            )}
                        </div>
                        {log.data && (
                            <div className="w-full max-h-[200px] flex flex-wrap border-[1px] rounded-md border-danger-600 overflow-y-auto">
                                <p className="flex text-sm rounded mt-1 p-2">
                                    {log.data}
                                </p>
                            </div>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
