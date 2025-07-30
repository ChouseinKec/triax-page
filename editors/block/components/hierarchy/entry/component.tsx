"use client";

import React, { useMemo, memo } from "react";

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
 * @param  blockID - The ID of the block to render.
 * @returns  The rendered Entry node, or null if block not found.
 */
const Entry: React.FC<EntryProps> = ({ blockID }) => {
    const { getBlock, getSelectedBlock } = useBlockManager();

    // Memoized block and selection state
    const block = useMemo(() => getBlock(blockID), [blockID, getBlock]);
    const selectedBlock = useMemo(() => getSelectedBlock(), [getSelectedBlock]);
    const registeredBlocks = useMemo(() => getRegisteredBlocks(), []);

    // Early return if block doesn't exist
    if (!block) {
        devLog.error(`[Entry] Block with ID ${blockID} not found`);
        return null;
    }

    // Get icon for block type
    const blockIcon = registeredBlocks[block.type]?.icon || null;

    // Determine if this block has a parent and if it is selected
    const hasParent = block.parentID !== null;
    const isSelected = selectedBlock?.id === block.id;

    // Choose class for ButtonReveal based on hierarchy level
    const buttonRevealClass = hasParent ? "EntryButtonReveal" : "EntryButtonRevealPrimary";

    // Recursively render children entries
    const children = useMemo(
        () => block.contentIDs.map(childID => <Entry key={childID} blockID={childID} />),
        [block.contentIDs]
    );
    const hasChildren = children.length > 0;

    return (
        <div className={CSS.Entry} data-has-parent={hasParent}>
            <ButtonReveal
                className={buttonRevealClass}
                title={block.id}
                icon={blockIcon}
                isSelected={isSelected}
            >
                {hasChildren && (
                    <div className={CSS.Content}>
                        {children}
                    </div>
                )}
            </ButtonReveal>
        </div>
    );
};

export default memo(Entry);