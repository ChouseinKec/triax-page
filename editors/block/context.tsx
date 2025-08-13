"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Types
import type { BlockActionProps } from "./types";


// Utilities
import { devLog } from "@/utilities/dev";

/**
 * Record of all actions by their ID.
 */
type ActionRecord = Record<string, BlockActionProps>;

/**
 * Context type for actions management.
 */
type BlockContextType = {
    actions: ActionRecord;
    registerAction: (action: BlockActionProps) => void;
    unregisterAction: (actionID: string) => void;
    getAllActions: () => ActionRecord;
    resetActions: () => void;
};

/**
 * Block context for managing actions.
 */
const BlockContext = createContext<BlockContextType>({
    actions: {},
    registerAction: () => { },
    unregisterAction: () => { },
    getAllActions: () => ({}),
    resetActions: () => { }
});

/**
 * BlockProvider component to provide block context.
 * Initializes actions from registry and provides action management functions.
 * @param children - React children to render within the provider.
 */
export const BlockProvider = ({ children }: { children: ReactNode }) => {
    // State to hold all actions
    const [actions, setActions] = useState<ActionRecord>({});

    /**
     * Register a new action or update an existing one.
     * @param action - The action to register.
     */
    const registerAction = useCallback((action: BlockActionProps) => {
        if (!action) {
            devLog.error("[BlockProvider] Invalid action provided.");
            return;
        }
        if (!action.id || typeof action.id !== "string") {
            devLog.error("[BlockProvider] Action must have a unique string ID.");
            return;
        }
        if (actions[action.id]) {
            devLog.warn(`[BlockProvider] Action with ID "${action.id}" already exists. Overwriting.`);
        }
        setActions(prev => ({
            ...prev,
            [action.id]: action,
        }));
    }, [actions]
    );

    /**
     * Unregister (remove) an action by its ID.
     * @param actionID - The ID of the action to remove.
     */
    const unregisterAction = useCallback((actionID: string) => {
        if (!actionID || typeof actionID !== "string") {
            devLog.error("[BlockProvider] Action ID is required to unregister an action.");
            return;
        }
        if (!actions[actionID]) {
            devLog.warn(`[BlockProvider] Action with ID "${actionID}" does not exist. Nothing to remove.`);
            return;
        }
        setActions(prev => {
            const { [actionID]: _, ...rest } = prev;
            return rest;
        });
    }, [actions]
    );

    const getAllActions = useCallback((): ActionRecord => {
        return actions;
    }, [actions]
    );

    /**
     * Reset all actions to an empty state.
     */
    const resetActions = useCallback(() => {
        setActions({});
    }, []
    );

    return (
        <BlockContext.Provider
            value={{
                actions,
                resetActions,
                registerAction,
                unregisterAction,
                getAllActions
            }}
        >
            {children}

        </BlockContext.Provider>
    );
};

/**
 * Custom hook to access the BlockContext.
 * @returns BlockContextType
 */
export const useBlockContext = () => {
    const context = useContext(BlockContext);
    if (!context) {
        throw new Error("useBlockContext must be used within a BlockProvider.");
    }
    return context;
};