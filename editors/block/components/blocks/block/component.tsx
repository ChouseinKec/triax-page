"use client";

import React, { useEffect, useMemo, memo } from "react";

// Types
import type { BlockProps } from "./types";

// Components
import ActionGroup from "@/components/group/action/component";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";
import { getRegisteredBlocks } from "@/registry/blocks/registry";

// Utilities
import { devLog } from "@/utilities/dev";

/**
 * Block Component
 *
 * Renders a single block instance using its definition's render function.
 * Handles error display for unknown block types and manages child block rendering.
 * Also registers block-specific actions (e.g., delete) in the bottom panel when selected.
 *
 * @component
 * @param {BlockProps} props - The props for the Block component.
 * @param {string} props.blockID - The ID of the block to render.
 * @returns {React.ReactElement | null} The rendered block or null if not found.
 */
const Block: React.FC<BlockProps> = ({ blockID }) => {
    // Block manager hooks for block data and actions
    const { getBlock, deleteBlock, getSelectedBlock } = useBlockManager();
    const block = getBlock(blockID);
    const selectedBlock = getSelectedBlock();

    // Early return if block doesn't exist
    if (!block) {
        devLog.error(`[Block] Block with ID ${blockID} not found`);
        return null;
    }

    // Get all registered block definitions
    const BlockDefinitions = getRegisteredBlocks();
    const definition = BlockDefinitions[block.type];

    // Bottom panel context for registering actions
    // const { addItem: addToBottom, removeItem: removeFromBottom } = BottomPanel.usePanel();

    // Handle unknown block types gracefully
    if (!definition) {
        return (
            <div style={{ padding: '8px', border: '1px solid red', color: 'red' }}>
                Unknown block type: {block.type}
            </div>
        );
    }

    /**
     * Memoized actions for the block (e.g., delete button).
     */
    const actions = useMemo(() => (
        <ActionGroup>
            <button onClick={() => deleteBlock(blockID)} aria-label="Delete Block">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                    <path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
            </button>
        </ActionGroup>
    ),
        [blockID, deleteBlock]
    );

    /**
     * Register block actions in the bottom panel when selected.
     * Cleanup on unmount or when selection changes.
     */
    // useEffect(() => {
    //     if (selectedBlock && selectedBlock.id === blockID) {
    //         addToBottom({
    //             id: `delete-${blockID}`,
    //             component: actions,
    //             priority: 1,
    //             icon: '',
    //             order: 10
    //         });
    //     }
    //     return () => {
    //         removeFromBottom(`delete-${blockID}`);
    //     };
    // }, [selectedBlock, addToBottom, removeFromBottom, actions, blockID]
    // );

    /**
     * Render child blocks recursively.
     * This centralizes child rendering logic across all block types.
    */
    const children = block.contentIDs.map(childID => (
        <Block key={childID} blockID={childID} />
    ));

    // Render the block using its definition's render function, passing instance data and children
    return definition.render(block, children);
};

export default memo(Block);