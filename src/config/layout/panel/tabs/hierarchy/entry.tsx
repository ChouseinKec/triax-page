"use client";

import React, { memo, useCallback, useMemo, useRef, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useBlockNode, setBlockNodeSelectedNodeID, useBlockNodeIsSelected, moveBlockNodeAfter, moveBlockNodeBefore, canBlockNodeHaveChildren, moveBlockNodeInto, useBlockNodeIsOrderable } from "@/core/block/node/managers";

// Types
import type { EntryProps } from "./types";

// Components
import Menu from "./entry-menu";
import Reveal from "./entry-reveal";
import Children from "./entry-children";

// Hooks
import { useDragDrop } from "@/shared/hooks/interface/useDragDrop";

/**
 * Entry Component
 *
 * A comprehensive block hierarchy entry with full interaction capabilities for the page builder.
 * Provides drag-and-drop reordering, context menus for block operations, expand/collapse functionality,
 * and visual feedback for selection and drag states. Supports nested block hierarchies with recursive rendering.
 *
 * @param props - Component properties
 * @param props.nodeID - Unique identifier for the block this entry represents
 * @returns Rendered hierarchy entry with interactive controls and nested children
 *
 * @note Includes copy/paste/reset operations for blocks, styles, and attributes via context menu
 */
const Entry: React.FC<EntryProps> = ({ nodeID }) => {
    const revealButtonRef = useRef<HTMLButtonElement | null>(null);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // Block data
    const block = useBlockNode(nodeID);
    if (!block) return null;

    const nodeKey = block.definitionKey;
    const nodeChildIDs = block.childNodeIDs;
    const blockTag = block.elementKey;


    // Block state
    const isBlockSelected = useBlockNodeIsSelected(nodeID);
    const canHaveChildren = canBlockNodeHaveChildren(nodeID);
    const isOrderable = useBlockNodeIsOrderable(nodeID);

    // Derived state
    const hasChildren = nodeChildIDs.length > 0;
    const canAcceptDrops = canHaveChildren && !hasChildren;

    // Event handlers
    const handleLeftClick = useCallback(() => {
        if (isBlockSelected) return;
        setBlockNodeSelectedNodeID(nodeID);
    }, [isBlockSelected, nodeID]
    );

    const handleRightClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsContextMenuOpen(true);
    }, []
    );

    const handleArrowClick = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []
    );

    // Drag and drop
    const { isDragOver, draggedItemID, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd } = useDragDrop(
        moveBlockNodeBefore,
        moveBlockNodeAfter,
        moveBlockNodeInto,
        setBlockNodeSelectedNodeID
    );

    // Drop zones
    const createDropZone = useCallback((position: 'before' | 'after') => (
        <div
            className={CSS.DropZone}
            onDragOver={(e) => handleDragOver(e, position)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, nodeID, position)}
            data-drag-over={isDragOver === position}
            data-drag-position={position}
        />
    ), [handleDragOver, handleDragLeave, handleDrop, nodeID, isDragOver]
    );

    const beforeDropZone = useMemo(() => isOrderable ? createDropZone('before') : null, [isOrderable, createDropZone]);
    const afterDropZone = useMemo(() => isOrderable ? createDropZone('after') : null, [isOrderable, createDropZone]);

    return (
        <div
            className={CSS.Entry}
            data-is-dragged={draggedItemID === nodeID}
            data-drag-over={isDragOver}
            data-children-allowed={canHaveChildren}
            data-has-children={hasChildren}
        >
            {/* Drop zone above */}
            {beforeDropZone}

            <div className={CSS.Reveal}>
                <Reveal
                    nodeID={nodeID}
                    nodeKey={nodeKey}
                    blockTag={blockTag}
                    isBlockSelected={isBlockSelected}
                    isOpen={isOpen}
                    canHaveChildren={canHaveChildren}
                    hasChildren={hasChildren}
                    buttonRef={revealButtonRef}
                    onLeftClick={handleLeftClick}
                    onRightClick={handleRightClick}
                    onArrowClick={handleArrowClick}
                    {...(isOrderable && { onDragStart: handleDragStart })}
                    onDragEnd={handleDragEnd}
                    {...(canAcceptDrops && {
                        onDragOver: (e: React.DragEvent) => handleDragOver(e, 'over'),
                        onDragLeave: handleDragLeave,
                        onDrop: (e: React.DragEvent) => handleDrop(e, nodeID, 'over'),
                    })}
                />

                {isOpen && (
                    <Children
                        canHaveChildren={canHaveChildren}
                        hasChildren={hasChildren}
                        nodeChildIDs={nodeChildIDs}
                    />
                )}

                <Menu
                    nodeID={nodeID}
                    isOpen={isContextMenuOpen}
                    onVisibilityChange={setIsContextMenuOpen}
                    targetRef={revealButtonRef}
                />
            </div>

            {/* Drop zone below */}
            {afterDropZone}
        </div>
    );
};

Entry.displayName = "Entry";
export default memo(Entry);