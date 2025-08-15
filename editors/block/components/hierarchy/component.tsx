"use client";

import React, { useMemo, memo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

// Components
import Entry from "./entry/component";

// Utilities
import { devLog } from "@/utilities/dev";

const Hierarchy: React.FC = () => {
    // Retrieve the block manager's getAllBlocks function
    const { getAllBlocks, getNextBlock, selectBlock, getSelectedBlock, getPreviousBlock } = useBlockManager();

    /**
     * Memoized object containing all blocks in the editor.
    */
    const allBlocks = useMemo(() => getAllBlocks(), [getAllBlocks]);

    /**
     * Memoized array of root blocks (blocks without a parent).
    */
    const rootBlocks = useMemo(() => Object.values(allBlocks).filter(block => !block.parentID), [allBlocks]);


    /**
     * Handles selecting the next block in the hierarchy when the down arrow key is pressed.
     *
     * @param {string} blockID - The ID of the block to select.
    */
    const handleSelectNext = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== "ArrowDown") return;
        const currentBlock = getSelectedBlock();
        if (!currentBlock) return devLog.warn("[Hierarchy] No selected block to navigate from");

        const nextBlock = getNextBlock();
        if (!nextBlock) return devLog.warn(`[Hierarchy] No next block found for ${currentBlock.id}`);
        if (!nextBlock) return;
        selectBlock(nextBlock.id);
    }, [getNextBlock]
    );

    /**
     * Handles selecting the previous block in the hierarchy when the up arrow key is pressed.
     *
     * @param {string} blockID - The ID of the block to select.
    */
    const handleSelectPrevious = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== "ArrowUp") return;
        const currentBlock = getSelectedBlock();
        if (!currentBlock) return devLog.warn("[Hierarchy] No selected block to navigate from");

        const previousBlock = getPreviousBlock();
        if (!previousBlock) return devLog.warn(`[Hierarchy] No previous block found for ${currentBlock.id}`);
        if (!previousBlock) return;
        selectBlock(previousBlock.id);
    }, [getPreviousBlock]
    );

    /**
     * Handles keyboard navigation for the hierarchy component.
     * This function listens for arrow key presses to navigate through the block hierarchy.
     * @param {React.KeyboardEvent} e - The keyboard event triggered by the user.
     * It checks for "ArrowDown" to select the next block and "ArrowUp" to select the previous block.
     * @returns {void}
    */
    const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            handleSelectNext(e);
        } else if (e.key === "ArrowUp") {
            handleSelectPrevious(e);
        }
    }, [handleSelectNext, handleSelectPrevious]
    );

    return (
        <div
            className={CSS.Hierarchy}
            onKeyUp={handleKeyUp}
        >
            {/* Render each root block */}
            {rootBlocks.map(block => (
                <Entry key={block.id} blockID={block.id} />
            ))}
        </div>
    );
};

export default memo(Hierarchy);