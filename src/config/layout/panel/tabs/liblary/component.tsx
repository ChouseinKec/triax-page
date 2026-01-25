"use client";
import React, { useCallback, useMemo, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { addNode, canNodeAcceptChild, useSelectedNodeKey, useSelectedNodeID } from "@/core/block/node/managers";

// Registry
import { getRegisteredNodes } from '@/core/block/node/states/registry';

// Types
import type { NodeDefinition, NodeKey } from "@/core/block/node/types/definition";

// Components
import GenericInput from "@/shared/components/input/generic/component";

/**
 * BlockLibrary Component
 * Displays registered blocks as buttons to add them to the editor.
 *
 */
const BlockLibrary: React.FC = () => {
    const registeredNodes = getRegisteredNodes();
    const selectedNodeKey = useSelectedNodeKey();
    const selectedNodeID = useSelectedNodeID();
    const [search, setSearch] = useState("");



    // Handle adding a new block, optionally nesting inside the selected block
    const handleAddBlock = useCallback((NodeKey: NodeKey) => {
        if (!selectedNodeID) return;

        addNode(NodeKey, selectedNodeID);
    }, [selectedNodeID]
    );

    // Filter blocks based on the selected block's permitted content
    const filteredBlocks = useMemo(() => {
        if (!selectedNodeID) return registeredNodes;

        return Object.fromEntries(
            Object.entries(registeredNodes).filter(([, block]) => {
                return canNodeAcceptChild(selectedNodeID, block.defaultTag);
            })
        );
    }, [selectedNodeID, registeredNodes]
    );

    // Filter blocks based on the search term
    const searchedBlocks = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return Object.values(filteredBlocks);

        return Object.values(filteredBlocks).filter(
            (block) =>
                block.key &&
                block.key.toLowerCase().startsWith(term)
        );
    }, [search, filteredBlocks]
    );

    // Group the filtered blocks by category
    const groupedBlocks = useMemo(() => {
        return Object.groupBy(searchedBlocks, (block) => block.category || "Uncategorized");
    }, [searchedBlocks]
    );

    // Render a button for each block type
    const createNodeButton = useCallback((block: NodeDefinition) => {
        const NodeKey = block.key;
        return (
            <div className={CSS.BlockContainer} key={NodeKey}>
                <button className={CSS.BlockButton} onClick={() => handleAddBlock(NodeKey)}>
                    {block.icon}
                </button>
                <p className={CSS.BlockTitle}>{NodeKey}</p>
            </div>
        );
    }, [handleAddBlock]
    );

    // Render block buttons, grouped by category if there are multiple categories
    const blockElements = useMemo(() => {
        // If no blocks match the search, show an Fallback state
        if (searchedBlocks.length === 0) {
            return <div className={CSS.Fallback}>No blocks found.</div>;
        }

        // If only one category or no grouping, render as a flat list
        const categories = Object.keys(groupedBlocks);
        if (categories.length <= 1) {
            return (
                <div className={CSS.Blocks}>
                    {searchedBlocks.map(createNodeButton)}
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
                    {groupedBlocks[category]?.map(createNodeButton)}
                </div>
            </div>
        ));
    }, [searchedBlocks, groupedBlocks, createNodeButton]
    );

    // Early exit must come after hooks to keep hook order stable
    if (!registeredNodes || Object.keys(registeredNodes).length === 0) {
        return <div className={CSS.Fallback}>No blocks available.</div>;
    }

    // If selected block permitted content is Fallback, show an Fallback state
    if (Object.keys(filteredBlocks).length === 0) {
        return <div className={CSS.Fallback}>The selected block <b>{'<'}{selectedNodeKey}{'>'}</b> does not allow any child blocks.</div>;
    }

    return (
        <div className={CSS.BlockLibrary}>
            <GenericInput
                value={search}
                onChange={setSearch}
                placeholder="Search blocks"
                type="text"
            />

            {blockElements}
        </div>
    );
};

export default BlockLibrary;