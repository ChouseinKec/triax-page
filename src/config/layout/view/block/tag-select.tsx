"use client";
import React, { useMemo, useCallback } from "react";

// Managers
import { useSelectedNodeID, useSelectedNodeKey, useSelectedNodeTag, useSelectedNodeParentID, canNodeAcceptElement } from "@/core/block/node/managers";
import { getNodeAvailableTags } from "@/core/block/node/managers/queries/node";
import { setNodeTag } from "@/core/block/node/managers/commands/tag";
import { getElementDefinitions } from "@/core/block/element/managers/queries/element";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";


const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z" /></svg>
)

/**
 * TagSelect Component
 *
 * A dropdown selector for changing the HTML tag of the currently selected block node.
 * This allows users to customize the semantic HTML element for better SEO and accessibility.
 * The available tags are filtered based on the selected node's type and its parent's acceptance rules.
 *
 * Features:
 * - Dynamically generates options from the node's availableTags
 * - Filters options to ensure only valid child tags for the parent node
 * - Updates the node's tag via the setNodeTag command
 * - Hides when no valid options or no selection exists
 *
 * @returns The dropdown component or null if no options available
 */
const TagSelect: React.FC = () => {
    // Retrieve selected node data using selective hooks for granular re-rendering
    const selectedNodeID = useSelectedNodeID();
    const selectedNodeKey = useSelectedNodeKey();
    const selectedNodeTag = useSelectedNodeTag();
    const selectedNodeParentID = useSelectedNodeParentID();

    // Compute available tags for the selected node, filtered by parent acceptance
    const availableTags = useMemo(() => {
        // Early return if required data is missing
        if (!selectedNodeKey || !selectedNodeParentID) return [];

        // Get tags available for this node type
        const availableTags = getNodeAvailableTags(selectedNodeKey);
        if (!availableTags) return [];

        // Filter to only include tags that the parent node can accept as children
        return availableTags.filter(tag => canNodeAcceptElement(selectedNodeParentID, tag));
    }, [selectedNodeKey, selectedNodeParentID]
    );

    // Transform available tags into dropdown options, ensuring elements exist
    const options = useMemo(() => {
        const elements = getElementDefinitions();
        return availableTags
            .filter(tag => elements[tag]) // Filter out non-existent elements first
            .map(tag => ({
                name: tag,
                value: tag,
            }));
    }, [availableTags]);

    // Handle tag change by updating the node's tag in the store
    const handleChange = useCallback((value: string) => {
        setNodeTag(selectedNodeID, value);
    }, [selectedNodeID]
    );

    // Render nothing if no selection, current tag, or options exist
    if (!selectedNodeID || !selectedNodeTag || options.length === 0) return null;

    return (
        <DropdownSelect
            value={selectedNodeTag}
            options={options}
            onChange={handleChange}
            placeholder={icon}
            forcePlaceholder={true}
            title="Select HTML Tag"
        />
    );
};

export default TagSelect;