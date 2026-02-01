"use client";
import React, { useCallback, useMemo, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { getNodeDefinitions, addNode, useSelectedNodeCompatibleDefinitions, getNodeFirstCompatibleElementKey, useSelectedDefinitionKey, useSelectedNodeID } from "@/core/block/node/managers";

// Types
import type { NodeDefinition, NodeKey } from "@/core/block/node/types/definition";

// Components
import GenericInput from "@/shared/components/input/generic/component";

/**
 * NodeLiblary Component
 * Displays registered blocks as buttons to add them to the editor.
 *
 */
const NodeLiblary: React.FC = () => {
    const registeredNodes = getNodeDefinitions();
    const selectedNodeKey = useSelectedDefinitionKey();
    const selectedNodeID = useSelectedNodeID();
    const compatibleNodes = useSelectedNodeCompatibleDefinitions();
    const [search, setSearch] = useState("");

    // Handle adding a new block,
    const handleAddBlock = useCallback((nodeKey: NodeKey) => {
        const acceptableTag = getNodeFirstCompatibleElementKey(selectedNodeID, nodeKey);
        if (!acceptableTag) return;

        addNode(nodeKey, selectedNodeID, acceptableTag);

    }, [selectedNodeID]
    );


    // Filter blocks based on the search term
    const searchedNodes = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return compatibleNodes;

        return compatibleNodes.filter(
            (block) =>
                block.key &&
                block.key.toLowerCase().startsWith(term)
        );
    }, [search, compatibleNodes]
    );

    // Group the filtered blocks by category
    const groupedNodes = useMemo(() => {
        return Object.groupBy(searchedNodes, (block) => block.category || "Uncategorized");
    }, [searchedNodes]
    );

    // Render a button for each block type
    const createNodeButton = useCallback((block: NodeDefinition) => {
        return (
            <div className={CSS.BlockContainer} key={block.key}>
                <button className={CSS.BlockButton} onClick={() => handleAddBlock(block.key)}>
                    {block.icon}
                </button>
                <p className={CSS.BlockTitle}>{block.key}</p>
            </div>
        );
    }, [handleAddBlock]
    );

    // Render block buttons, grouped by category if there are multiple categories
    const nodeElements = useMemo(() => {
        // If no blocks match the search, show an Fallback state
        if (searchedNodes.length === 0) {
            return <div className={CSS.Fallback}>No blocks found.</div>;
        }

        // If only one category or no grouping, render as a flat list
        const categories = Object.keys(groupedNodes);
        if (categories.length <= 1) {
            return (
                <div className={CSS.Blocks}>
                    {searchedNodes.map(createNodeButton)}
                </div>
            );
        }

        // Otherwise, render grouped by category
        return categories.map((category) => (
            <div key={category} className={CSS.Category}>
                <p className={CSS.CategoryTitle}>
                    {category}
                    <span>
                        ({groupedNodes[category]?.length ?? 0})
                    </span>
                </p>
                <div className={CSS.Blocks}>
                    {groupedNodes[category]?.map(createNodeButton)}
                </div>
            </div>
        ));
    }, [searchedNodes, groupedNodes, createNodeButton]
    );

    // If no registered nodes, show an Fallback state
    if (!registeredNodes || registeredNodes.length === 0) return <div className={CSS.Fallback}>No block-nodes available.</div>;

    // If selected node permitted content is Fallback, show an Fallback state
    if (Object.keys(compatibleNodes).length === 0) return <div className={CSS.Fallback}>The selected block-node <b>{'<'}{selectedNodeKey}{'>'}</b> does not allow any child block-nodes.</div>;
    return (
        <div className={CSS.NodeLiblary}>
            <GenericInput
                value={search}
                onChange={setSearch}
                placeholder="Search nodes"
                type="text"
            />

            {nodeElements}
        </div>
    );
};

export default NodeLiblary;