"use client";

import React, { memo, useMemo, useEffect } from "react";

// Types
import type { BlocksCanvasBlock } from "@/editors/block/types/component/canvas";

// Manager
import { useBlock, deleteBlock } from "@/editors/block/managers/block";

// Registry
import { getRegisteredBlock } from "@/editors/block/registry/registry";

// Utilities
import { devRender } from "@/utilities/dev";

// Context
import { useBlockContext } from "@/editors/block/context";

/**
 * BlocksCanvasBlock Component
 * Renders the block editor block with recursive children for better user experience.
 *
 * @param blockID - The block identifier
 * @returns The rendered block with recursive children for block editing
 */
const BlocksCanvasBlock: React.FC<BlocksCanvasBlock> = ({ blockID }) => {
    if (!blockID || typeof blockID !== "string" || blockID.trim().length === 0) return devRender.error("[BlocksCanvasBlock] No block ID provided", { blockID });

    const { registerAction, unregisterBlockActions } = useBlockContext();
    const currentBlock = useBlock(blockID);
    const currentBlockContentIDs = currentBlock ? currentBlock.contentIDs : [];
    const currentBlockType = currentBlock ? currentBlock.type : undefined;
    const currentBlockDefinition = currentBlockType ? getRegisteredBlock(currentBlockType) : undefined;

    /**
     * Register block actions in blocks context when the block is mounted.
     * Cleanup on unmount to prevent memory leaks.
    */
    useEffect(() => {
        const deleteIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                <path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
            </svg>
        );

        registerAction(blockID, {
            actionID: `delete-block-${blockID}`,
            icon: deleteIcon,
            title: "Delete Block",
            onClick: () => deleteBlock(blockID)
        })

        return () => {
            unregisterBlockActions(blockID);
        };

    }, [blockID, unregisterBlockActions, registerAction]
    );

    // Render child blocks recursively
    const children = useMemo(() => {
        if (!currentBlockContentIDs) return [];
        return currentBlockContentIDs.map(childID => <BlocksCanvasBlock key={childID} blockID={childID} />);
    }, [currentBlockContentIDs]
    );

    // Early return if block doesn't exist
    if (!currentBlock) return devRender.error(`[BlocksCanvasBlock] Block not found: ${blockID}`);

    // Handle unknown block types gracefully
    if (!currentBlockDefinition) return devRender.error(`[BlocksCanvasBlock] Unknown block type: ${currentBlock.type}`);

    // Render the block using its definition's render function, passing instance data and children
    return currentBlockDefinition.render(currentBlock, children);
};

export default memo(BlocksCanvasBlock, (prevProps, nextProps) => prevProps.blockID === nextProps.blockID);