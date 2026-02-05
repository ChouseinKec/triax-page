"use client";
import React, { useMemo, useCallback } from "react";

// Managers
import { useSelectedBlockNodeID, useSelectedBlockNodeElementKey, useSelectedBlockNodeParentID, useSelectedBlockNodeCompatibleElementKeys } from "@/core/block/node/managers";
import { setBlockNodeElementKey } from "@/core/block/node/managers/commands/node";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";


const icon = (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z" /></svg>)

/**
 * ElementSelect Component
 *
 * A dropdown selector for changing the HTML element key of the currently selected block node.
 * This allows users to customize the semantic HTML element for better SEO and accessibility.
 * The available element keys are filtered based on the selected node's type and its parent's acceptance rules.
 *
 * Features:
 * - Dynamically generates options from the node's selectedNodeCompatibleElementKeys
 * - Filters options to ensure only valid child tags for the parent node
 * - Updates the node's tag via the setBlockNodeElementKey command
 * - Hides when no valid options or no selection exists
 *
 * @returns The dropdown component or null if no options available
 */
const ElementSelect: React.FC = () => {
    // Retrieve selected node data using selective hooks for granular re-rendering
    const selectedNodeID = useSelectedBlockNodeID();
    const selectedElementKey = useSelectedBlockNodeElementKey();
    const selectedParentID = useSelectedBlockNodeParentID();
    const selectedNodeCompatibleElementKeys = useSelectedBlockNodeCompatibleElementKeys();

    // Transform available element keys into dropdown options, ensuring elements exist
    const options = useMemo(() => {
        return selectedNodeCompatibleElementKeys
            .map(elementKey => ({
                name: elementKey,
                value: elementKey,
            }));
    }, [selectedNodeCompatibleElementKeys]);

    // Handle element key change by updating the node's element key in the store
    const handleChange = useCallback((value: string) => {
        setBlockNodeElementKey(selectedNodeID, value);
    }, [selectedNodeID]
    );

    // Render nothing if no selection, current element key, or options exist
    if (!selectedNodeID || !selectedElementKey || options.length === 0) return null;

    return (
        <DropdownSelect
            key={`${selectedNodeID}-${selectedParentID}`}
            value={selectedElementKey}
            options={options}
            onChange={handleChange}
            placeholder={icon}
            forcePlaceholder={true}
            title="Select Node Tag"
        />
    );
};

export default ElementSelect;