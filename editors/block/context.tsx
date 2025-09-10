"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Types
import type { BlocksActionDefinition, BlocksContextDefinition } from "@/editors/block/types/core/block";
import type { BlockID } from "@/editors/block/types/core/block/block";

// Utilities
import { devLog } from "@/utilities/dev";
import { validateBlockAction } from "@/editors/block/helpers/block";
import { isBlockIDValid } from "@/editors/block/utilities/block/block";

/**
 * Block context for managing actions.
 */
const BlockContext = createContext<BlocksContextDefinition>({
    actions: {},
    registerAction: () => { },
    unregisterAction: () => { },
    unregisterBlockActions: () => { },
    getAllActions: () => ({}),
    getBlockActions: () => [],
    resetActions: () => { }
});


/**
 * BlockProvider component to provide block context.
 * Initializes actions from registry and provides action management functions.
 * @param children - React children to render within the provider.
 */
export const BlockProvider = ({ children }: { children: ReactNode }) => {
    const [actions, setActions] = useState<Record<BlockID, BlocksActionDefinition[]>>({});

    /**
     * Register a new action for a specific block.
     * @param blockID - The ID of the block to register the action for.
     * @param action - The action to register.
     */
    const registerAction: BlocksContextDefinition['registerAction'] = useCallback((blockID, action) => {
        if (!isBlockIDValid(blockID)) return devLog.error("[BlockProvider] Invalid block ID provided.");
        if (!validateBlockAction(action, "BlockProvider → registerAction")) return;

        setActions(prev => {
            const blockActions = prev[blockID] || [];
            const existingIndex = blockActions.findIndex(a => a.actionID === action.actionID);

            if (existingIndex === -1) {
                blockActions.push(action);
            } else {
                devLog.warn(`[BlockProvider] Action with ID "${action.actionID}" already exists for block "${blockID}". Overwriting.`);
                blockActions[existingIndex] = action;
            }

            return {
                ...prev,
                [blockID]: blockActions,
            };
        });
    }, []
    );

    /**
     * Unregister (remove) an action by its ID for a specific block.
     * @param blockID - The ID of the block.
     * @param actionID - The ID of the action to remove.
     */
    const unregisterAction: BlocksContextDefinition['unregisterAction'] = useCallback((blockID, actionID) => {
        if (!isBlockIDValid(blockID)) return devLog.error("[BlockProvider] Invalid block ID provided.");
        if (!isBlockIDValid(actionID)) return devLog.error("[BlockProvider] Invalid action ID provided.");

        setActions(prev => {
            const blockActions = prev[blockID] || [];
            const filteredActions = blockActions.filter(a => a.actionID !== actionID);
            if (filteredActions.length === blockActions.length) {
                devLog.warn(`[BlockProvider] Action with ID "${actionID}" does not exist for block "${blockID}". Nothing to unregister.`);
                return prev;
            }
            return {
                ...prev,
                [blockID]: filteredActions,
            };
        });
    }, []
    );

    /**
     * Unregister all actions for a specific block.
     * @param blockID - The ID of the block to remove all actions for.
     */
    const unregisterBlockActions: BlocksContextDefinition['unregisterBlockActions'] = useCallback((blockID) => {
        if (!isBlockIDValid(blockID)) return devLog.error("[BlockProvider] Invalid block ID provided.");

        setActions(prev => {
            if (!prev[blockID]) {
                devLog.warn(`[BlockProvider] No actions found for block "${blockID}". Nothing to remove.`);
                return prev;
            }
            const { [blockID]: _, ...rest } = prev;
            return rest;
        });
    }, []
    );

    const getAllActions: BlocksContextDefinition['getAllActions'] = useCallback(() => {
        return actions;
    }, [actions]
    );

    /**
     * Get actions for a specific block.
     * @param blockID - The ID of the block to get actions for.
     * @returns Array of actions for the block, or empty array if none.
     */
    const getBlockActions: BlocksContextDefinition['getBlockActions'] = useCallback((blockID) => {
        if (!isBlockIDValid(blockID)) {
            devLog.error("[BlockProvider] Invalid block ID provided.");
            return undefined;
        }

        return actions[blockID];
    }, [actions]
    );

    /**
     * Reset all actions to an empty state.
     */
    const resetActions: BlocksContextDefinition['resetActions'] = useCallback(() => {
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
                unregisterBlockActions,
                getAllActions,
                getBlockActions
            }}
        >
            {children}

        </BlockContext.Provider>
    );
};

/**
 * Custom hook to access the BlockContext.
 * @returns BlocksContextDefinition
 */
export const useBlockContext = () => {
    const context = useContext(BlockContext);
    if (!context) {
        throw new Error("useBlockContext must be used within a BlockProvider.");
    }
    return context;
};