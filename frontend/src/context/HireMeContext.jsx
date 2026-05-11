import { createContext, useContext, useState } from "react";
import HireMePopup from "../components/popup/HireMePopup";

const HireMeContext = createContext();

export const HireMeProvider = ({ children }) => {
    const [isHireMeOpen, setIsHireMeOpen] = useState(false);

    const openHireMePopup = () => setIsHireMeOpen(true);
    const closeHireMePopup = () => setIsHireMeOpen(false);

    return (
        <HireMeContext.Provider value={{ isHireMeOpen, openHireMePopup, closeHireMePopup }}>
            {children}
            <HireMePopup isOpen={isHireMeOpen} onClose={closeHireMePopup} />
        </HireMeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useHireMe() {
    const context = useContext(HireMeContext);
    if (!context) {
        throw new Error("useHireMe must be used within a HireMeProvider");
    }
    return context;
}
