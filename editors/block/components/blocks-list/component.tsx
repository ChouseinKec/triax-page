"use client";

import React, { useCallback, useMemo, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";
import { getRegisteredBlocks } from "@/registry/blocks/registry";

// Components
import GenericInput from "@/components/input/generic/component";

// Types
import { BlockDefinition, BlockType } from "@/types/block/block";

/**
 * BlockList Component
 * - Renders a list of all registered blocks as buttons.
 * - Allows users to add a block by clicking its button.
 * - Supports searching and grouping by category.
 */
const BlockList: React.FC = () => {
    // Get all registered block definitions
    const allBlocks = getRegisteredBlocks();

    // Access the addBlock function from block manager
    const { addBlock, getSelectedBlock } = useBlockManager();
    const [search, setSearch] = useState("");

    /**
     * Handles adding a new block, optionally nesting inside the selected block.
     * @param blockType - The type of block to add.
     */
    const handleAddBlock = useCallback((blockType: BlockType) => {
        const selectedBlock = getSelectedBlock();
        if (!selectedBlock?.id) return addBlock(blockType);
        addBlock(blockType, selectedBlock.id);
    }, [addBlock, getSelectedBlock]
    );

    /**
     * Filters blocks based on the search term.
     * @returns {Array<Block>} - The filtered list of blocks.
    */
    const filteredBlocks = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return Object.values(allBlocks);
        return Object.values(allBlocks).filter(
            block =>
                block.type &&
                block.type.toLowerCase().startsWith(term)
        );
    }, [search, allBlocks]
    );

    /**
     * Groups the filtered blocks by category.
     * @returns {Partial<Record<string, typeof filteredBlocks>>} - Grouped blocks by category.
     */
    const groupedBlocks = useMemo(() => {
        return Object.groupBy(filteredBlocks, ({ category }) => category || "Uncategorized");
    }, [filteredBlocks]
    );


    /**
     * Renders a button for each block type.
     * @param block - The block definition to render.
     * @returns {JSX.Element} - The rendered button element for the block.
    */
    const createBlockButton = useCallback((block: BlockDefinition) => {
        const blockType = block.type as BlockType;
        return (
            <div className={CSS.BlockContainer} key={blockType}>
                <button className={CSS.BlockButton} onClick={() => handleAddBlock(blockType)}>
                    {block.icon}
                </button>
                <p className={CSS.BlockTitle}>{blockType}</p>
            </div>
        );
    }, [handleAddBlock]
    );

    /**
     * Renders block buttons, grouped by category if there are multiple categories.
    */
    const blockElements = useMemo(() => {
        const categories = Object.keys(groupedBlocks);

        // If only one category or no grouping, render as a flat list
        if (categories.length < 1) {
            return (
                <div className={CSS.Blocks}>
                    {filteredBlocks.map(createBlockButton)}
                </div>
            );
        }

        // Otherwise, render grouped by category
        return categories.map((category) => (
            <div key={category} className={CSS.Category}>
                <p className={CSS.CategoryTitle}>{category}
                    <span>
                        ({groupedBlocks[category]?.length ?? 0})
                    </span>
                </p>
                <div className={CSS.Blocks}>
                    {groupedBlocks[category]?.map(createBlockButton)}
                </div>
            </div>
        ));
    }, [filteredBlocks, groupedBlocks, handleAddBlock]
    );

    return (
        <div className={CSS.BlockList}>
            <GenericInput
                value={search}
                onChange={setSearch}
                placeholder="Search blocks"
                type="text"
                style={{ width: "100%" }}
            />

            {blockElements}
        </div>
    );
};

export default BlockList;