"use client";
import React, { memo } from "react";

// Types
import type { PropertyActionsProps } from "./types";

// Managers
import { canNodeHaveAttribute } from "@/core/block/node/instance/managers/queries";

/**
 * PropertyActions Component
 * 
 * Renders action buttons (copy, paste, reset) for a specific style property.
 * Checks if the block can have the style before rendering actions.
 * 
 * @param NodeID - The block identifier
 * @param property - The CSS property key
 * @returns Action buttons or null if block cannot have this style
 */


const PropertyActions: React.FC<PropertyActionsProps> = ({ NodeID, property }) => {
    // Check if block can have this style (respects allowedStyles from NodeDefinition)
    if (!canNodeHaveAttribute(NodeID, property)) return null;

    return (
        <p>
            nothing to show
        </p>
    );
};

PropertyActions.displayName = "PropertyActions";
export default memo(PropertyActions);
