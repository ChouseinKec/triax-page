"use client";

import React, { useMemo, memo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

// Types
import type { EntryProps } from "./types";

// Utilities
import { devLog } from "@/utilities/dev";

// Components
import ButtonReveal from "@/components/reveal/button/component";

// Registry
import { getRegisteredBlocks } from "@/registry/blocks/registry";

/**
 * Entry Component
 *
 * Renders a single block node in the block hierarchy tree, including its children recursively.
 * Highlights if selected, and shows an icon based on block type.
 *
 * @param {string} blockID - The ID of the block to render.
 * @returns {React.ReactElement|null} The rendered Entry node, or null if block not found.
 */
const Entry: React.FC<EntryProps> = ({ blockID }) => {
    const { getBlock, getSelectedBlock, selectBlock } = useBlockManager();

    // Get block data and selection state
    const block = getBlock(blockID);
    const selectedBlock = getSelectedBlock();
    const registeredBlocks = getRegisteredBlocks();

    // Early exit if block doesn't exist
    if (!block) {
        devLog.error(`[Entry] Block with ID ${blockID} not found`);
        return null;
    }

    // Block properties
    const blockIcon = registeredBlocks[block.type]?.icon || null;
    const isSelected = selectedBlock?.id === block.id;

    // Recursively render children entries
    const hasChildren = block.contentIDs.length > 0;
    const children = hasChildren ? (
        <div className={CSS.Content}>
            {block.contentIDs.map(childID => (
                <Entry key={childID} blockID={childID} />
            ))}
        </div>
    ) : null;

    // Handle block selection
    const handleSelect = useCallback(() => {
        if (selectedBlock?.id === block.id) {
            selectBlock(null);
        } else {
            selectBlock(block.id);
        }
    }, [block.id, selectBlock, selectedBlock]
    );

    return (
        <div className={CSS.Entry}>
            <ButtonReveal
                className="EntryButtonReveal"
                title={block.id}
                icon={blockIcon}
                isSelected={isSelected}
                onButtonClick={handleSelect}
            >
                {children}
            </ButtonReveal>
        </div>
    );
};

export default memo(Entry);