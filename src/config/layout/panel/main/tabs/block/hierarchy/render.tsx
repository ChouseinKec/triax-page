"use client";

import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useBlock, selectBlock, getPreviousBlock, getNextBlock, getSelectedBlockID } from "@/src/core/block/instance/manager";

// Components
import Entry from "./entry";

/**
 * BlocksHierarchy Component
 *
 * The main block hierarchy viewer for the page builder inspector panel.
 * Displays the complete block tree structure starting from the root body block, with keyboard navigation support.
 * Enables users to navigate and select blocks using arrow keys for improved accessibility and workflow efficiency.
 *
 * @returns Rendered block hierarchy with keyboard navigation and selection controls
 *
 * @note Supports Arrow Up/Down keys for block navigation when component is focused
 */
const BlocksHierarchyRender: React.FC = () => {
    const rootBlock = useBlock('body');

    // Select next block on ArrowDown
    const handleSelectNext = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowDown") return;

        const currentBlockID = getSelectedBlockID();
        if (!currentBlockID) return;

        const nextBlock = getNextBlock(currentBlockID);
        if (!nextBlock) return;

        selectBlock(nextBlock.id);
    }

    // Select previous block on ArrowUp
    const handleSelectPrevious = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowUp") return;

        const currentBlockID = getSelectedBlockID();
        if (!currentBlockID) return;

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

    return (
        <div
            className={CSS.BlocksHierarchy}
            onKeyUp={handleKeyUp}
            tabIndex={0}
        >
            {
                rootBlock
                    ? <Entry key={rootBlock.id} blockID={rootBlock.id} />
                    : <div className={CSS.Empty}>No blocks available. Add a block to get started.</div>
            }
        </div>
    );
};

BlocksHierarchyRender.displayName = "BlocksHierarchy";
export default BlocksHierarchyRender;