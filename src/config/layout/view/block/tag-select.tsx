"use client";
import React, { useMemo, useCallback } from "react";

// Managers
import { useSelectedNodeID, useSelectedNodeKey } from "@/core/block/node/instance/managers";
import { getNodeAvailableTags } from "@/core/block/node/definition/managers/queries/node";
import { setNodeTag } from "@/core/block/node/instance/managers/commands/tag";
import { useNode } from "@/core/block/node/instance/managers";
import { getElementDefinitions } from "@/core/block/element/definition/managers/queries/element";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";


const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z" /></svg>
)

/**
 * TagSelect
 * Dropdown component for selecting HTML tags for the selected node.
*/
const TagSelect: React.FC = () => {
    const selectedNodeID = useSelectedNodeID();
    const selectedNodeKey = useSelectedNodeKey();
    const selectedNode = useNode(selectedNodeID || '');

    const availableTags = useMemo(() => {
        if (!selectedNodeKey) return [];
        return getNodeAvailableTags(selectedNodeKey) || [];
    }, [selectedNodeKey]
    );

    const options = useMemo(() => {
        const elements = getElementDefinitions();
        return availableTags.map(tag => ({
            name: tag,
            value: tag,
        })).filter(option => elements[option.value]); // Ensure the element exists
    }, [availableTags]
    );

    const handleChange = useCallback((value: string) => {
        if (selectedNodeID) setNodeTag(selectedNodeID, value);
    }, [selectedNodeID]
    );

    if (!selectedNodeID || !selectedNode || options.length === 0) return null;

    return (
        <DropdownSelect
            value={selectedNode.tag}
            options={options}
            onChange={handleChange}
            placeholder={icon}
            forcePlaceholder={true}
            title="Select HTML Tag"
        />
    );
};

export default TagSelect;