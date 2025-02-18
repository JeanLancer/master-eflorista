"use client";

import { TicketDetails } from "@core/lib/types";
import { Agency, Contact, User } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ModalProviderProps {
    children: React.ReactNode;
}

export type ModalData = {
    user?: User;
    agency?: Agency;
    ticket?: TicketDetails[0];
    contact?: Contact;
    // plans?: {
    //     defaultPriceId: Plan
    //     plans: PricesList['data']
    // }
};

type ModalContextData = {
    data: ModalData;
    isOpen: boolean;
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
    setClose: () => void;
};

export const ModalContext = createContext<ModalContextData>({
    data: {},
    isOpen: false,
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
    setClose: () => {},
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<ModalData>({});
    const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
    const [isMounted, setIsMounted] = useState(false);

    const setOpen = async (
        modal: React.ReactNode,
        fetchData?: () => Promise<any>
    ) => {
        if (modal) {
            if (fetchData) {
                setData({ ...data, ...(await fetchData()) } || {});
            }
            setShowingModal(modal);
            setIsOpen(true);
        }
    };

    const setClose = () => {
        setIsOpen(false);
        setData({});
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return;

    return (
        <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within the modal provider");
    }
    return context;
};

export default ModalProvider;
