import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/ui/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState({
        message: "",
        isVisible: false,
        type: "info"
    });

    const showToast = useCallback((message, type = "info") => {
        setToast({ message, isVisible: true, type });

        // Auto hide after 3 seconds
        setTimeout(() => {
            setToast(prev => ({ ...prev, isVisible: false }));
        }, 3000);
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                type={toast.type}
                onClose={hideToast}
            />
        </ToastContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
