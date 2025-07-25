"use client";

import React, { useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";
import { getRegisteredBlocks } from "@/blocks/registry/block";

// Types
import { BlockType } from "@/types/block/block";

/**
 * BlockList Component
 * - Renders a list of all registered blocks as buttons.
 * - Allows users to add a block by clicking its button.
 */
const BlockList: React.FC = () => {
    // Get all registered block definitions
    const allBlocks = getRegisteredBlocks();
    // Access the addBlock function from block manager
    const { addBlock, getSelectedBlock } = useBlockManager();


    const handleAddBlock = useCallback((blockType: BlockType) => {
        const selectedBlock = getSelectedBlock();
        if (!selectedBlock || !selectedBlock.id) return addBlock(blockType);

        // If a block is selected, we can nest the new block inside it
        addBlock(blockType, selectedBlock.id);
    }, [addBlock, getSelectedBlock]);

    /**
     * Renders a button for each block type.
     * When clicked, adds a new block of that type.
     */
    const renderBlockButtons = () =>
        Object.keys(allBlocks).map((blockKey) => {
            const block = allBlocks[blockKey];
            const blockType = block.type as BlockType;
            return (
                <div className={CSS.BlockButtonContainer} key={blockType}>
                    <button className={CSS.BlockButton} onClick={() => handleAddBlock(blockType)} >
                        {block.icon}
                    </button>
                    <p className={CSS.BlockButtonTitle}>{blockType}</p>
                </div>
            )
        });

    return (
        <div className={CSS.BlockList}>
            {renderBlockButtons()}
        </div>
    );
};

export default BlockList;