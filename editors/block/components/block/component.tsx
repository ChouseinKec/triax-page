"use client";

import React from "react";

// Types
import type { BlockProps } from "./types";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";
import { getRegisteredBlocks } from "@/blocks/registry/block";

/**
 * Block Component
 * - Renders a single block instance with its definition's render function
 * - Handles centralized child rendering for nested blocks
 * - Provides error handling for unknown block types
 */
const Block: React.FC<BlockProps> = ({ blockID }) => {
    // Get block instance data from the store
    const { getBlock } = useBlockManager();
    const block = getBlock(blockID);

    // Early return if block doesn't exist
    if (!block) return null;

    // Get all registered block definitions
    const BlockDefinitions = getRegisteredBlocks();
    const definition = BlockDefinitions[block.type];

    // Handle unknown block types gracefully
    if (!definition) {
        return (
            <div style={{ padding: '8px', border: '1px solid red', color: 'red' }}>
                Unknown block type: {block.type}
            </div>
        );
    }

    /**
     * Render child blocks recursively.
     * This centralizes child rendering logic across all block types.
     */
    const children = block.contentIDs.map(childID => (
        <Block key={childID} blockID={childID} />
    ));

    // Call the block's render function with instance data and children
    return definition.render(block, children);
};

export default Block;