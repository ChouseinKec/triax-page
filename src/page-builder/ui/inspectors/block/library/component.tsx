"use client";
import React, { useCallback, useMemo, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { getSelectedBlockID, useSelectedBlockType, addBlock, getRegisteredBlocks, getRegisteredBlock, isBlockChildAllowed } from "@/src/page-builder/services/managers/block";

// Components
import GenericInput from "@/src/shared/components/input/generic/component";

// Types
import type { BlockDefinition, BlockType } from "@/src/page-builder/core/block/block/types";
import type { BlockLiblaryProps } from "@/src/page-builder/ui/inspectors/block/types/liblary";

/**
 * BlockLibrary Component
 * Displays registered blocks as buttons to add them to the editor.
 *
 * @returns The rendered list with search and categorized block buttons
 */
const BlockLibrary: React.FC<BlockLiblaryProps> = () => {
    const registeredBlocks = getRegisteredBlocks();
    const selectedBlockType = useSelectedBlockType();
    const [search, setSearch] = useState("");

    // Handle adding a new block, optionally nesting inside the selected block
    const handleAddBlock = useCallback((blockType: BlockType) => {
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
            <div className={CSS.BlockLibrary__BlockContainer} key={blockType}>
                <button className={CSS.BlockLibrary__BlockButton} onClick={() => handleAddBlock(blockType)}>
                    {block.icon}
                </button>
                <p className={CSS.BlockLibrary__BlockTitle}>{blockType}</p>
            </div>
        );
    }, [handleAddBlock]
    );

    // Render block buttons, grouped by category if there are multiple categories
    const blockElements = useMemo(() => {
        // If no blocks match the search, show an empty state
        if (searchedBlocks.length === 0) {
            return <div className={CSS.BlockLibrary__Empty}>No blocks found.</div>;
        }

        // If only one category or no grouping, render as a flat list
        const categories = Object.keys(groupedBlocks);
        if (categories.length <= 1) {
            return (
                <div className={CSS.BlockLibrary__Blocks}>
                    {searchedBlocks.map(createBlockButton)}
                </div>
            );
        }

        // Otherwise, render grouped by category
        return categories.map((category) => (
            <div key={category} className={CSS.BlockLibrary__Category}>
                <p className={CSS.BlockLibrary__CategoryTitle}>
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
        return <div className={CSS.BlockLibrary__Empty}>No blocks available.</div>;
    }

    // If selected block permitted content is empty, show an empty state
    if (Object.keys(filteredBlocks).length === 0) {
        return <div className={CSS.BlockLibrary__Empty}>The selected block <b>{'<'}{selectedBlockType}{'>'}</b> does not allow any child blocks.</div>;
    }

    return (
        <div className={CSS.BlockLibrary}>
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

export default BlockLibrary;