"use client";

import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useNodeInstance, selectNextNode, selectPreviousNode } from "@/core/block/node/managers";

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
    const rootBlock = useNodeInstance('html');

    // Handle keyboard navigation
    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            selectNextNode();
        } else if (e.key === "ArrowUp") {
            selectPreviousNode();
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
                    ? <Entry key={rootBlock.id} nodeID={rootBlock.id} />
                    : <div className={CSS.Empty}>No blocks available. Add a block to get started.</div>
            }
        </div>
    );
};

BlocksHierarchy.displayName = "BlocksHierarchy";
export default BlocksHierarchy;