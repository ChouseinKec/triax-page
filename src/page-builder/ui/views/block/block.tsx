"use client";

import React, { useMemo, memo } from "react";

// Types
import type { BlockID } from "@/src/page-builder/core/block/block/types";

// Manager
import { useBlock, getBlockRender } from "@/src/page-builder/services/managers/block";

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
    // Always call hooks in the same order
    const currentBlock = useBlock(blockID);
    const currentBlockRender = getBlockRender(currentBlock?.type);

    // Render child blocks recursively
    const children = useMemo(() => {
        const contentIDs = currentBlock?.contentIDs || [];
        if (!contentIDs.length) return [];
        return contentIDs.map(childID => <Block key={childID} blockID={childID} />);
    }, [currentBlock?.contentIDs]);


    // Early return if block doesn't exist
    if (!currentBlock) return devRender.error(`[BlocksCanvasBlock] Block not found: ${blockID}`);

    // Handle unknown block types gracefully
    if (!currentBlockRender) return devRender.error(`[BlocksCanvasBlock] Unknown block type: ${currentBlock.type}`);

    // Render the block using its definition's render function, passing instance data and children
    return currentBlockRender(currentBlock, children);
};

export default memo(Block);