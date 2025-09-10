"use client";
import React, { useCallback, useMemo, useState, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { getSelectedBlockID, useSelectedBlockType, addBlock } from "@/editors/block/managers/block";

// Registry
import { getRegisteredBlocks, getRegisteredBlock } from "@/editors/block/registry/registry";

// Components
import GenericInput from "@/components/input/generic/component";

// Types
import type { BlockDefinition, BlockTypes } from "@/editors/block/types/core/block";
import type { BlockPickerProps } from "@/editors/block/types/component/picker";

// Utilities
import { isBlockChildAllowed } from "@/editors/block/utilities/block/block";

/**
 * BlockPicker Component
 * Displays registered blocks as buttons to add them to the editor.
 *
 * @returns The rendered list with search and categorized block buttons
 */
const BlockPicker: React.FC<BlockPickerProps> = () => {
    const registeredBlocks = getRegisteredBlocks();
    const selectedBlockType = useSelectedBlockType();
    const [search, setSearch] = useState("");

    // Handle adding a new block, optionally nesting inside the selected block
    const handleAddBlock = useCallback((blockType: BlockTypes) => {
        const selectedBlockID = getSelectedBlockID();
        if (!selectedBlockID) return addBlock(blockType);

        addBlock(blockType, selectedBlockID);
    }, [addBlock]
    );

    // Filter blocks based on the selected block's permitted content
    const filteredBlocks = useMemo(() => {
        if (!selectedBlockType) return registeredBlocks;

        const blockDef = getRegisteredBlock(selectedBlockType);
        if (!blockDef) return registeredBlocks;

        return Object.fromEntries(
            Object.entries(registeredBlocks).filter(([_, block]) => {
                return isBlockChildAllowed(selectedBlockType, block.type);
            })
        );
    }, [selectedBlockType, registeredBlocks]
    );

    // Filter blocks based on the search term
    const searchedBlocks = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return Object.values(filteredBlocks);

        return Object.values(filteredBlocks).filter(
            (block) =>
                block.type &&
                block.type.toLowerCase().startsWith(term)
        );
    }, [search, filteredBlocks]
    );

    // Group the filtered blocks by category
    const groupedBlocks = useMemo(() => {
        return Object.groupBy(searchedBlocks, (block) => block.category || "Uncategorized");
    }, [searchedBlocks]
    );

    // Render a button for each block type
    const createBlockButton = useCallback((block: BlockDefinition) => {
        const blockType = block.type;
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

    // Render block buttons, grouped by category if there are multiple categories
    const blockElements = useMemo(() => {
        // If no blocks match the search, show an empty state
        if (searchedBlocks.length === 0) {
            return <div className={CSS.Empty}>No blocks found.</div>;
        }

        // If only one category or no grouping, render as a flat list
        const categories = Object.keys(groupedBlocks);
        if (categories.length <= 1) {
            return (
                <div className={CSS.Blocks}>
                    {searchedBlocks.map(createBlockButton)}
                </div>
            );
        }

        // Otherwise, render grouped by category
        return categories.map((category) => (
            <div key={category} className={CSS.Category}>
                <p className={CSS.CategoryTitle}>
                    {category}
                    <span>
                        ({groupedBlocks[category]?.length ?? 0})
                    </span>
                </p>
                <div className={CSS.Blocks}>
                    {groupedBlocks[category]?.map(createBlockButton)}
                </div>
            </div>
        ));
    }, [searchedBlocks, groupedBlocks, createBlockButton]
    );

    // If no blocks are registered, show an empty state
    if (Object.keys(registeredBlocks).length === 0) {
        return <div className={CSS.Empty}>No blocks available.</div>;
    }

    // If selected block permitted content is empty, show an empty state
    if (Object.keys(filteredBlocks).length === 0) {
        return <div className={CSS.Empty}>The selected block <b>{'<'}{selectedBlockType}{'>'}</b> does not allow any child blocks.</div>;
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

export default memo(BlockPicker);