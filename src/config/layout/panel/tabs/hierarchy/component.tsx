"use client";

import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useNode, selectNode, getPreviousNode, getNextNode, getSelectedNodeID } from "@/core/block/node/instance/managers";

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
const BlocksHierarchy: React.FC = () => {
    const rootBlock = useNode('body');

    // Select next block on ArrowDown
    const handleSelectNext = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowDown") return;

        const currentNodeID = getSelectedNodeID();
        if (!currentNodeID) return;

        const nextBlock = getNextNode(currentNodeID);
        if (!nextBlock) return;

        selectNode(nextBlock.id);
    }

    // Select previous block on ArrowUp
    const handleSelectPrevious = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowUp") return;

        const currentNodeID = getSelectedNodeID();
        if (!currentNodeID) return;

        const previousBlock = getPreviousNode(currentNodeID);
        if (!previousBlock) return;

        selectNode(previousBlock.id);
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
                    ? <Entry key={rootBlock.id} NodeID={rootBlock.id} />
                    : <div className={CSS.Empty}>No blocks available. Add a block to get started.</div>
            }
        </div>
    );
};

BlocksHierarchy.displayName = "BlocksHierarchy";
export default BlocksHierarchy;