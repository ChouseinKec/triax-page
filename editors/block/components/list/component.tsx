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

// Registry
import { isChildPermitted } from "@/registry/blocks/registry";

/**
 * List Component
 * - Renders a list of all registered blocks as buttons.
 * - Allows users to add a block by clicking its button.
 * - Supports searching and grouping by category.
 */
const List: React.FC = () => {
    // Get all registered block definitions
    const registeredBlocks = getRegisteredBlocks();

    // Access the addBlock function from block manager
    const { addBlock, getSelectedBlock } = useBlockManager();
    const [search, setSearch] = useState("");
    const selectedBlock = getSelectedBlock();

    /**
     * Handles adding a new block, optionally nesting inside the selected block.
     * @param blockType - The type of block to add.
     */
    const handleAddBlock = useCallback((blockType: BlockType) => {
        if (!selectedBlock?.id) return addBlock(blockType);
        addBlock(blockType, selectedBlock.id);
    }, [addBlock, getSelectedBlock]
    );

    /**
     * Filters blocks based on the selected block's permitted content.
     * If no permitted content is defined, returns all registered blocks.
     * @return - Filtered blocks keyed by their IDs.
    */
    const filteredBlocks = useMemo(() => {
        if (selectedBlock?.permittedContent == null) return registeredBlocks;

        return Object.values(registeredBlocks).filter(block => {
            return isChildPermitted(selectedBlock.type, block.type);
        });

    }, [selectedBlock, registeredBlocks, isChildPermitted]
    );

    /**
     * Filters blocks based on the search term.
     * @returns - The filtered list of blocks.
    */
    const searchedBlocks = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return Object.values(filteredBlocks);
        return Object.values(filteredBlocks).filter(
            block =>
                block.type &&
                block.type.toLowerCase().startsWith(term)
        );
    }, [search, filteredBlocks]
    );

    /**
     * Groups the filtered blocks by category.
     * @returns - Grouped blocks by category.
     */
    const groupedBlocks = useMemo(() => {
        return Object.groupBy(searchedBlocks, ({ category }) => category || "Uncategorized");
    }, [searchedBlocks]
    );

    /**
     * Renders a button for each block type.
     * @param block - The block definition to render.
     * @returns - The rendered button element for the block.
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
     * If no blocks match the search, shows an empty state.
     * If only one category or no grouping, renders as a flat list.
     * If multiple categories are present, renders grouped by category.
     * @returns - The rendered block elements.
    */
    const blockElements = useMemo(() => {
        // If no blocks match the search, show an empty state
        if (searchedBlocks.length === 0) {
            return <div className={CSS.Empty}>No blocks found.</div>;
        }

        // If only one category or no grouping, render as a flat list
        const categories = Object.keys(groupedBlocks);
        if (categories.length < 1) {
            return (
                <div className={CSS.Blocks}>
                    {searchedBlocks.map(createBlockButton)}
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
    }, [searchedBlocks, groupedBlocks, handleAddBlock]
    );

    // If no blocks are registered, show an empty state
    if (Object.keys(registeredBlocks).length === 0) {
        return <div className={CSS.Empty}>No blocks available.</div>;
    }

    // If selected block permitted content is empty,
    // or does not match any blocks, show an empty state
    if (Object.keys(filteredBlocks).length === 0) {
        return <div className={CSS.Empty}>The selected block <b>{'<'}{selectedBlock?.type}{'>'}</b> does not allow any child blocks.</div>;
    }

    return (
        <div className={CSS.List}>
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

export default List;