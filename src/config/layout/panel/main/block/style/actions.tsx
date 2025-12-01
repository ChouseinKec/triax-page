"use client";
import React, { memo } from "react";

// Types
import type { StyleKey } from "@/src/core/block/style/types";
import type { BlockID } from "@/src/core/block/instance/types";

// Commands
import { copyBlockStyle, pasteBlockStyle, resetBlockStyle } from '@/src/core/block/style/manager';

// Managers
import { canBlockHaveStyle } from '@/src/core/block/style/manager';

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
    property: StyleKey;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({ blockID, property }) => {
    // Check if block can have this style (respects allowedStyles from BlockDefinition)
    if (!canBlockHaveStyle(blockID, property)) return null;

    return (
        <>
            <button
                title="Copy Property"
                onClick={() => copyBlockStyle(blockID, property)}
                aria-label={`Copy ${property}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path fill="black" d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                </svg>
            </button>
            <button
                title="Paste Property"
                onClick={() => pasteBlockStyle(blockID, property)}
                aria-label={`Paste ${property}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path fill="black" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" />
                </svg>
            </button>
            <button
                title="Reset Property"
                onClick={() => resetBlockStyle(blockID, property)}
                aria-label={`Reset ${property}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path fill="black" d="m840-234-80-80v-446h-80v120H434L234-840h133q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v526ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Zm166 560L200-646v446h446Zm-446 80q-33 0-56.5-23.5T120-200v-526l-65-65 57-57 736 736-57 57-65-65H200Z" />
                </svg>
            </button>
        </>
    );
};

PropertyActions.displayName = "PropertyActions";
export default memo(PropertyActions);
