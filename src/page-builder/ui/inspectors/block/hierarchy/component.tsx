"use client";

import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useBlock, selectBlock, getPreviousBlock, getNextBlock, getSelectedBlockID } from "@/src/page-builder/services/managers/block";

// Components
import Entry from "./entry/component";

// Utilities
import { devLog } from "@/src/shared/utilities/dev";

/**
 * BlocksHierarchy Component
 * Renders the block editor hierarchy with keyboard navigation for better user experience.
 *
 * @returns The rendered hierarchy with keyboard navigation for block editing
 */
const BlocksHierarchy: React.FC = () => {
    const rootBlock = useBlock('body');

    // Select next block on ArrowDown
    const handleSelectNext = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowDown") return;

        const currentBlockID = getSelectedBlockID();
        if (!currentBlockID) return devLog.warn("No selected block");

        const nextBlock = getNextBlock();
        if (!nextBlock) return;

        selectBlock(nextBlock.id);
    }

    // Select previous block on ArrowUp
    const handleSelectPrevious = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowUp") return;

        const currentBlockID = getSelectedBlockID();
        if (!currentBlockID) return devLog.warn("No selected block");

        const previousBlock = getPreviousBlock();
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
                    : <div className={CSS.BlocksEditorHierarchy__Empty}>No blocks available. Add a block to get started.</div>
            }
        </div>
    );
};

export default BlocksHierarchy;