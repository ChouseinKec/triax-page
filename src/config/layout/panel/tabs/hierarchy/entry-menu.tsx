import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { copyBlockNode, pasteBlockNode, duplicateBlockNode, deleteBlockNode } from "@/core/block/node/managers";
import { copyNodeStyles, pasteNodeStyles } from "@/core/block/style/managers";
import { copyBlockAttributes, pasteBlockAttributes } from "@/core/block/attribute/managers";
import { useBlockNodeIsPasteable, useBlockNodeIsDeletable, useBlockNodeIsCopyable, useBlockNodeIsCloneable } from "@/core/block/node/managers/hooks/hierarchy";
import { useBlockStyleIsEditable } from "@/core/block/style/managers/hooks/style";
import { useBlockAttributeIsEditable } from "@/core/block/attribute/managers/hooks/node";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import FloatReveal from "@/shared/components/reveal/float/component";
import DropdownReveal from "@/shared/components/reveal/dropdown/component";

// SVG Icons
const copyIcon = (
    <span className={CSS.DropdownIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
        </svg>
        Copy
    </span>
);

const pasteIcon = (
    <span className={CSS.DropdownIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
            <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z" />
        </svg>
        Paste
    </span>
);

const duplicateIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z" />
    </svg>
);

const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" />
    </svg>
);


interface ContextMenuProps {
    nodeID: NodeID;
    isOpen: boolean;
    onVisibilityChange: (isOpen: boolean) => void;
    targetRef: React.RefObject<HTMLButtonElement | null>;
}


/**
 * Menu Component
 *
 * Provides a context menu for block operations including copy, paste, duplicate, and delete.
 * Uses FloatReveal and DropdownReveal for nested menu structure.
 *
 * @param props - Component properties
 * @param props.nodeID - The ID of the node for operations
 * @param props.isOpen - Whether the menu is open
 * @param props.onVisibilityChange - Callback for visibility changes
 * @param props.targetRef - Reference to the target element
 * @returns Rendered context menu
 */
const Menu: React.FC<ContextMenuProps> = ({ nodeID, isOpen, onVisibilityChange, targetRef }) => {
    const isDeletable = useBlockNodeIsDeletable(nodeID);
    const isCopyable = useBlockNodeIsCopyable(nodeID);
    const isCloneable = useBlockNodeIsCloneable(nodeID);
    const isPasteable = useBlockNodeIsPasteable(nodeID);
    const isStyleEditable = useBlockStyleIsEditable(nodeID);
    const isAttributeEditable = useBlockAttributeIsEditable(nodeID);

    // Handle action click
    const handleActionClick = (action: () => void) => {
        action();
        onVisibilityChange(false);
    };


    return (
        <FloatReveal
            targetRef={targetRef}
            isOpen={isOpen}
            anchor="bottom"
            autoClose={true}
            onVisibilityChange={onVisibilityChange}
            className={CSS.Context}
        >
            <DropdownReveal
                title="Copy"
                placeholder={copyIcon}
                className={CSS.Dropdown}
                anchor="right"
                offset={15}
                isDisabled={!isCopyable && !isStyleEditable && !isAttributeEditable}
            >
                <button className={CSS.Action} data-is-disabled={!isCopyable} onClick={() => handleActionClick(() => copyBlockNode(nodeID))}>
                    Copy Block
                </button>
                <button className={CSS.Action} data-is-disabled={!isStyleEditable} onClick={() => handleActionClick(() => copyNodeStyles(nodeID))}>
                    Copy Styles
                </button>
                <button className={CSS.Action} data-is-disabled={!isAttributeEditable} onClick={() => handleActionClick(() => copyBlockAttributes(nodeID))}>
                    Copy Attributes
                </button>
            </DropdownReveal>

            <DropdownReveal
                title="Paste"
                placeholder={pasteIcon}
                className={CSS.Dropdown}
                anchor="right"
                offset={15}
                isDisabled={!isPasteable && !isStyleEditable && !isAttributeEditable}
            >
                <button className={CSS.Action} data-is-disabled={!isPasteable} onClick={() => handleActionClick(() => pasteBlockNode(nodeID))}>
                    Paste Block
                </button>
                <button className={CSS.Action} data-is-disabled={!isStyleEditable} onClick={() => handleActionClick(() => pasteNodeStyles(nodeID))}>
                    Paste Styles
                </button>
                <button className={CSS.Action} data-is-disabled={!isAttributeEditable} onClick={() => handleActionClick(() => pasteBlockAttributes(nodeID))}>
                    Paste Attributes
                </button>
            </DropdownReveal>

            <button className={CSS.Action} data-is-disabled={!isCloneable} onClick={() => handleActionClick(() => duplicateBlockNode(nodeID))}>
                {duplicateIcon}
                Duplicate Block
            </button>

            <button className={CSS.Action} data-is-disabled={!isDeletable} onClick={() => handleActionClick(() => deleteBlockNode(nodeID))}>
                {deleteIcon}
                Delete Block
            </button>
        </FloatReveal>
    );
};

Menu.displayName = "Menu";

export default memo(Menu);