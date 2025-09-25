"use client";

import React, { useMemo, useEffect, memo } from "react";

// Types
import type { BlockID } from "@/src/page-builder/core/block/block/types";

// Manager
import { useBlock, deleteBlock, useIsBlockSelected, getBlockRender } from "@/src/page-builder/services/managers/block";
import { registerBarAction, unregisterBarAction } from "@/src/page-builder/services/managers/layout/bar";


// Utilities
import { devRender } from "@/src/shared/utilities/dev";


/**
 * BlocksCanvasBlock Component
 * Renders the block editor block with recursive children for better user experience.
 *
 * @param blockID - The block identifier
 * @returns The rendered block with recursive children for block editing
 */
const Block: React.FC<{ blockID: BlockID }> = ({ blockID }) => {
    if (!blockID || typeof blockID !== "string" || blockID.trim().length === 0) return devRender.error("[BlocksCanvasBlock] No block ID provided", { blockID });

    const isBlockSelected = useIsBlockSelected(blockID);
    const currentBlock = useBlock(blockID);
    const currentBlockContentIDs = currentBlock?.contentIDs || [];
    const currentBlockRender = getBlockRender(currentBlock?.type);

    /**
     * Register block actions in blocks context when the block is mounted.
     * Cleanup on unmount to prevent memory leaks.
    */
    useEffect(() => {
        const deleteID = `blockaction__delete-${blockID}`;
        const isDisabled = blockID === 'body';

        if (!isBlockSelected) {
            unregisterBarAction('block-actions', deleteID);
            return;
        };

        registerBarAction('block-actions', {
            id: deleteID,
            order: 10,
            title: "Delete Block",
            render: () => (
                <button onClick={() => deleteBlock(blockID)} data-is-disabled={isDisabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                        <path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                </button>
            ),
        })

        return () => {
            unregisterBarAction('block-actions', deleteID);
        };

    }, [blockID, unregisterBarAction, registerBarAction, isBlockSelected]
    );


    // Render child blocks recursively
    const children = useMemo(() => {
        if (!currentBlockContentIDs) return [];
        return currentBlockContentIDs.map(childID => <Block key={childID} blockID={childID} />);
    }, [currentBlockContentIDs]
    );


    // Early return if block doesn't exist
    if (!currentBlock) return devRender.error(`[BlocksCanvasBlock] Block not found: ${blockID}`);

    // Handle unknown block types gracefully
    if (!currentBlockRender) return devRender.error(`[BlocksCanvasBlock] Unknown block type: ${currentBlock.type}`);

    // Render the block using its definition's render function, passing instance data and children
    return currentBlockRender(currentBlock, children);
};

export default memo(Block);