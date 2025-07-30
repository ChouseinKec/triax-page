"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Types
import type { PanelInstance, PanelTabInstance } from "@/types/layout/panel";

// Registry
import { getRegisteredPanels } from "@/registry/layout/registry";

// Utilities
import { devLog } from "@/utilities/dev";


/**
 * Record of all panels by their ID.
 */
type PanelRecord = Record<string, PanelInstance>;

/**
 * Context type for layout management.
 */
type PanelContextType = {
    panels: PanelRecord;
    registerPanel: (panel: PanelInstance) => void;
    unregisterPanel: (panelId: string) => void;
    togglePanel: (panelId: string) => void;
    registerPanelTab: (panelId: string, tab: PanelTabInstance) => void;
    unregisterPanelTab: (panelId: string, tabId: string) => void;
};

/**
 * Layout context for managing panels and their tabs.
 */
const LayoutContext = createContext<PanelContextType>({
    panels: {},
    registerPanel: () => { },
    unregisterPanel: () => { },
    togglePanel: () => { },
    registerPanelTab: () => { },
    unregisterPanelTab: () => { },
});

/**
 * LayoutProvider
 * Initializes panels from registry and provides panel management actions.
 * @param children - React children to render within the provider.
 */
export const LayoutProvider = ({ children }: { children: ReactNode }) => {
    // Initialize panels from registry, each with an empty tabs record
    const initialPanels: PanelRecord = Object.fromEntries(
        Object.values(getRegisteredPanels()).map(panelDef => [
            panelDef.id,
            { ...panelDef, tabs: {}, isOpen: panelDef.initialOpen, isLocked: panelDef.initialLocked },
        ])
    );


    // State to hold all panels
    const [panels, setPanels] = useState<PanelRecord>(initialPanels);

    /**
     * Register a new panel or update an existing one.
     * @param panel - The PanelInstance to register.
     */
    const registerPanel = useCallback((panel: PanelInstance) => {
        if (!panel || typeof panel !== "object") {
            devLog.error("[LayoutProvider] Invalid panel object provided.");
            return;
        }
        if (!panel.id || typeof panel.id !== "string") {
            devLog.error("[LayoutProvider] Panel must have a unique string ID.");
            return;
        }
        if (panels[panel.id]) {
            devLog.warn(`[LayoutProvider] Panel with ID "${panel.id}" already exists. Overwriting.`);
        }
        setPanels(prev => ({
            ...prev,
            [panel.id]: panel,
        }));
    }, [panels]
    );

    /**
     * Unregister (remove) a panel by its ID.
     * @param panelId - The ID of the panel to remove.
     */
    const unregisterPanel = useCallback((panelId: string) => {
        if (!panelId || typeof panelId !== "string") {
            devLog.error("[LayoutProvider] Panel ID is required to unregister a panel.");
            return;
        }
        if (!panels[panelId]) {
            devLog.warn(`[LayoutProvider] Panel with ID "${panelId}" does not exist. Nothing to remove.`);
            return;
        }
        setPanels(prev => {
            const { [panelId]: _, ...rest } = prev;
            return rest;
        });
    }, [panels]
    );

    /**
     * Toggle the open/closed state of a panel.
     * @param panelId - The ID of the panel to toggle.
     */
    const togglePanel = useCallback((panelId: string) => {
        if (!panelId || typeof panelId !== "string") {
            devLog.error("[LayoutProvider] Panel ID is required to toggle a panel.");
            return;
        }
        setPanels(prev => {
            const panel = prev[panelId];
            if (!panel) {
                devLog.error(`[LayoutProvider] Panel with ID "${panelId}" not found. Skipping toggle.`);
                return prev;
            }

            // if (panel. === undefined) {
            //     devLog.warn(`[LayoutProvider] Panel with ID "${panelId}" does not have an "isOpen" property. Defaulting to false.`);
            // }

            return {
                ...prev,
                [panelId]: {
                    ...panel,
                    isOpen: !panel.isOpen,
                },
            };
        });
    }, []
    );

    /**
     * Register a tab for a specific panel.
     * @param panelId - The ID of the panel.
     * @param tab - The PanelTabInstance to add.
     */
    const registerPanelTab = useCallback((panelId: string, tab: PanelTabInstance) => {
        if (!panelId || typeof panelId !== "string") {
            devLog.error("[LayoutProvider] Panel ID is required to register a tab.");
            return;
        }
        if (!tab || typeof tab !== "object") {
            devLog.error("[LayoutProvider] Tab object is required to register a tab.");
            return;
        }
        if (!tab.id || typeof tab.id !== "string") {
            devLog.error("[LayoutProvider] Tab must have a unique string ID.");
            return;
        }
        setPanels(prev => {
            const panel = prev[panelId];
            if (!panel) {
                devLog.error(`[LayoutProvider] Panel with ID "${panelId}" not found. Skipping tab registration.`);
                return prev;
            }
            if (panel.tabs[tab.id]) {
                devLog.warn(`[LayoutProvider] Tab with ID "${tab.id}" already exists in panel "${panelId}". Overwriting.`);
            }
            return {
                ...prev,
                [panelId]: {
                    ...panel,
                    tabs: {
                        ...panel.tabs,
                        [tab.id]: tab,
                    },
                },
            };
        });
    }, []
    );

    /**
     * Unregister (remove) a tab from a panel.
     * @param panelId - The ID of the panel.
     * @param tabId - The ID of the tab to remove.
     */
    const unregisterPanelTab = useCallback((panelId: string, tabId: string) => {
        if (!panelId || typeof panelId !== "string") {
            devLog.error("[LayoutProvider] Panel ID is required to unregister a tab.");
            return;
        }
        if (!tabId || typeof tabId !== "string") {
            devLog.error("[LayoutProvider] Tab ID is required to unregister a tab.");
            return;
        }
        setPanels(prev => {
            const panel = prev[panelId];
            if (!panel) {
                devLog.error(`[LayoutProvider] Panel with ID "${panelId}" not found. Skipping tab unregistration.`);
                return prev;
            }
            if (!panel.tabs[tabId]) {
                devLog.warn(`[LayoutProvider] Tab with ID "${tabId}" does not exist in panel "${panelId}". Nothing to remove.`);
                return prev;
            }
            const { [tabId]: _, ...restTabs } = panel.tabs;
            return {
                ...prev,
                [panelId]: {
                    ...panel,
                    tabs: restTabs,
                },
            };
        });
    }, []
    );

    return (
        <LayoutContext.Provider
            value={{
                panels,
                registerPanel,
                unregisterPanel,
                togglePanel,
                registerPanelTab,
                unregisterPanelTab,
            }}
        >
            {children}

        </LayoutContext.Provider>
    );
};

/**
 * Custom hook to access the LayoutContext.
 * @returns PanelContextType
 */
export const useLayoutContext = () => useContext(LayoutContext);