"use client";
import React, { memo } from "react";

// Types
import type { AttributeKey } from "@/src/core/block/attribute/types";
import type { BlockID } from "@/src/core/block/instance/types";

// Managers
import { canBlockHaveAttribute } from "@/src/core/block/instance/manager/queries";

/**
 * PropertyActions Component
 * 
 * Renders action buttons (copy, paste, reset) for a specific style property.
 * Checks if the block can have the style before rendering actions.
 * 
 * @param blockID - The block identifier
 * @param property - The CSS property key
 * @returns Action buttons or null if block cannot have this style
 */
interface PropertyActionsProps {
    blockID: BlockID;
    property: AttributeKey;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({ blockID, property }) => {
    // Check if block can have this style (respects allowedStyles from BlockDefinition)
    if (!canBlockHaveAttribute(blockID, property)) return null;

    return (
        <p>
            nothing to show
        </p>
    );
};

PropertyActions.displayName = "PropertyActions";
export default memo(PropertyActions);
