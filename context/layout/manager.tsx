"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

type PanelItem = {
    id: string;
    component: ReactNode;
    priority?: number; // For ordering
    icon?: ReactNode; // Optional icon for the panel item
    order: number; // For sorting items
};

type PanelContextType = {
    items: PanelItem[];
    addItem: (item: PanelItem) => void;
    removeItem: (id: string) => void;
};

function createPanelContext() {
    const Context = createContext<PanelContextType>({
        items: [],
        addItem: () => { },
        removeItem: () => { },
    });

    function Provider({ children }: { children: ReactNode }) {
        const [items, setItems] = useState<PanelItem[]>([]);

        const addItem = useCallback((item: PanelItem) => {
            setItems(prev => {
                const filtered = prev.filter(existing => existing.id !== item.id);
                const newItems = [...filtered, item];
                return newItems.sort((a, b) => (a.priority || 0) - (b.priority || 0));
            });
        }, []);

        const removeItem = useCallback((id: string) => {
            setItems(prev => prev.filter(item => item.id !== id));
        }, []);

        return (
            <Context.Provider value={{ items, addItem, removeItem }}>
                {children}
            </Context.Provider>
        );
    }

    function usePanel() {
        return useContext(Context);
    }

    return { Provider, usePanel };
}

// Create contexts for each panel
export const BlocksPanel = createPanelContext();
export const InspectorPanel = createPanelContext();
export const BottomPanel = createPanelContext();
export const ViewPanel = createPanelContext();
export const TopBar = createPanelContext();
export const LeftBar = createPanelContext();