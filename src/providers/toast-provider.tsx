'use client';

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';

type ToastData = {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    description: string;
    duration?: number;
};

interface ToastContextData {
    isOpen: boolean;
    data: ToastData;
    toast: (data: ToastData) => void;
    close: () => void;
}

export const ToastContext = createContext<ToastContextData>({
    isOpen: false,
    data: {} as ToastData,
    toast: (data: ToastData) => {},
    close: () => {}
});

interface Props {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({} as ToastData);
    const [isMounted, setIsMounted] = useState(false);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toast = useCallback(
        ({ title, description, type, duration = 5000 }: ToastData) => {
            setData({ title, description, type, duration });
            setIsOpen(true);
            setTimeout(() => {
                close();
            }, duration);
        },
        [close]
    );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return;

    return (
        <ToastContext.Provider value={{ toast, data, isOpen, close }}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error('useToast must be used within the modal provider');
    return context;
};
