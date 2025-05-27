// contexts/ToolbarContext.tsx
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type ToolbarContextType = {
    buttons: ReactNode[];
    title: string;
    description: string;

    addButton: (button: ReactNode) => void;
    addButtons: (newButtons: ReactNode[]) => void;
    removeButtons: () => void;
    setTitle: (newTitle: string) => void;
    setDescription: (newDescription: string) => void;
};

export const ToolbarContext = createContext<ToolbarContextType | null>(null);

export const ToolbarProvider = ({ children }: { children: ReactNode }) => {
    const [buttons, setButtons] = useState<ReactNode[]>([]);
    const [title, setTitle] = useState<string>('Property');
    const [description, setDescription] = useState<string>('Property description');

    const value = useMemo(() => ({
        buttons,
        title,
        description,
        addButtons: (newButtons: ReactNode[]) =>
            setButtons(prev => [...prev, ...newButtons]),
        addButton: (button: ReactNode) =>
            setButtons(prev => [...prev, button]),
        removeButtons: () =>
            setButtons([]),
        setTitle: (newTitle: string) => setTitle(newTitle),
        setDescription: (newDescription: string) => setDescription(newDescription)
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