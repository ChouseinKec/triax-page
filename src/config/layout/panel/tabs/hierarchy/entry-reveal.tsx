import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { getBlockNodeDefinitionIcon } from "@/core/block/node/managers";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

interface HierarchyEntryButtonProps {
    nodeID: NodeID;
    nodeKey: string | undefined;
    blockTag: string | undefined;
    isBlockSelected: boolean;
    isOpen: boolean;
    canHaveChildren: boolean;
    hasChildren: boolean;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
    onLeftClick: () => void;
    onRightClick: (e: React.MouseEvent) => void;
    onArrowClick: () => void;
    onDragStart?: (e: React.DragEvent, nodeID: NodeID) => void;
    onDragEnd: () => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDragLeave?: () => void;
    onDrop?: (e: React.DragEvent) => void;
}

/**
 * Reveal Component
 *
 * Interactive button for hierarchy entries with drag-and-drop, selection, and expand/collapse functionality.
 */
const Reveal: React.FC<HierarchyEntryButtonProps> = ({
    nodeID,
    nodeKey,
    blockTag,
    isBlockSelected,
    isOpen,
    canHaveChildren,
    hasChildren,
    buttonRef,
    onLeftClick,
    onRightClick,
    onArrowClick,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragLeave,
    onDrop,
}) => {
    const NodeIcon = nodeKey ? getBlockNodeDefinitionIcon(nodeKey) : null;

    const attributes = {
        ref: buttonRef,
        className: CSS.RevealButton,
        'data-is-selected': isBlockSelected,
        onClick: onLeftClick,
        onContextMenu: onRightClick,
        ...(onDragStart && {
            draggable: true,
            onDragStart: (e: React.DragEvent) => {
                onDragStart(e, nodeID);
                e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
            },
            onDragEnd,
        }),
        // Conditionally add drag handlers for blocks that can have children but don't have any yet
        ...(canHaveChildren && !hasChildren && onDragOver && onDragLeave && onDrop && {
            onDragOver,
            onDragLeave,
            onDrop,
        }),
    };

    return (
        <button {...attributes}>
            <span>
                {NodeIcon}
                <span>{`${nodeID} (${blockTag})`}</span>
            </span>

            {hasChildren && (
                <span
                    tabIndex={0}
                    className={CSS.RevealArrow}
                    onClick={onArrowClick}
                    data-is-open={isOpen}
                    data-is-selected={isBlockSelected}
                />
            )}
        </button>
    );
};

Reveal.displayName = "Reveal";

export default memo(Reveal);