// contexts/ToolbarContext.tsx
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type ToolbarContextType = {
    buttons: ReactNode[];
    addButton: (button: ReactNode) => void;
    addButtons: (newButtons: ReactNode[]) => void;
    removeButtons: () => void;
};

export const ToolbarContext = createContext<ToolbarContextType | null>(null);

export const ToolbarProvider = ({ children }: { children: ReactNode }) => {
    const [buttons, setButtons] = useState<ReactNode[]>([]);

    const value = useMemo(() => ({
        buttons,
        addButtons: (newButtons: ReactNode[]) =>
            setButtons(prev => [...prev, ...newButtons]),
        addButton: (button: ReactNode) =>
            setButtons(prev => [...prev, button]),
        removeButtons: () =>
            setButtons([]),
    }), [buttons]);

    return (
        <ToolbarContext.Provider value={value}>
            {children}
        </ToolbarContext.Provider>
    );
};

export const useToolbar = () => {
    const context = useContext(ToolbarContext);
    if (!context) throw new Error('useToolbar must be used within ToolbarProvider');
    return context;
};