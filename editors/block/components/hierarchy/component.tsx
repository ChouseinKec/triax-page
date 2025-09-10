"use client";

import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import { BlocksHierarchyProps } from "@/editors/block/types/component";

// Managers
import { useRootBlocks, selectBlock, getPreviousBlock, getNextBlock, getSelectedBlockID } from "@/editors/block/managers/block";

// Components
import Entry from "./entry/component";

// Utilities
import { devLog } from "@/utilities/dev";

/**
 * BlocksHierarchy Component
 * Renders the block editor hierarchy with keyboard navigation for better user experience.
 *
 * @returns The rendered hierarchy with keyboard navigation for block editing
 */
const BlocksHierarchy: React.FC<BlocksHierarchyProps> = () => {
    const rootBlocks = useRootBlocks();

    // Select next block on ArrowDown
    const handleSelectNext = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowDown") return;

        const currentBlockID = getSelectedBlockID();
        if (!currentBlockID) return devLog.warn("No selected block");

        const nextBlock = getNextBlock(currentBlockID);
        if (!nextBlock) return;

        selectBlock(nextBlock.id);
    }

    // Select previous block on ArrowUp
    const handleSelectPrevious = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowUp") return;

        const currentBlockID = getSelectedBlockID();
        if (!currentBlockID) return devLog.warn("No selected block");

        const previousBlock = getPreviousBlock(currentBlockID);
        if (!previousBlock) return;

        selectBlock(previousBlock.id);
    };

    // Handle keyboard navigation
    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            handleSelectNext(e);
        } else if (e.key === "ArrowUp") {
            handleSelectPrevious(e);
        }
    };

    // Render root block entries
    const rootInstances = (
        rootBlocks.map(block => (
            <Entry key={block.id} blockID={block.id} />
        ))
    )

    return (
        <div
            className={CSS.BlocksHierarchy}
            onKeyUp={handleKeyUp}
            tabIndex={0}
        >

            {
                rootInstances.length > 0
                    ? rootInstances
                    : <div className={CSS.BlocksEditorHierarchy__Empty}>No blocks available. Add a block to get started.</div>
            }
        </div>
    );
};

export default memo(BlocksHierarchy);