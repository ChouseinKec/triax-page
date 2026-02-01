"use client";

import React, { memo, useCallback, useRef, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useNodeInstance, setSelectedNodeID, useNodeIsSelected, moveNodeAfter, moveNodeBefore, canNodeHaveChildren, moveNodeInto } from "@/core/block/node/managers";

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
 * @param  props - Component properties
 * @param  props.nodeID - Unique identifier for the block this entry represents
 * @returns Rendered hierarchy entry with interactive controls and nested children
 *
 * @note Includes copy/paste/reset operations for blocks, styles, and attributes via context menu
 */
const Entry: React.FC<EntryProps> = ({ nodeID }) => {
    const revealButtonRef = useRef<HTMLButtonElement | null>(null);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // Get block instance
    const block = useNodeInstance(nodeID);
    const nodeKey = block?.definitionKey;
    const nodeChildIDs = block?.childNodeIDs || [];
    const blockTag = block?.elementKey;

    const isBlockSelected = useNodeIsSelected(nodeID);
    const canHaveChildren = canNodeHaveChildren(nodeID);
    const hasChildren = nodeChildIDs.length > 0;

    // Drag and drop hook
    const { isDragOver, draggedItemID, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd, } = useDragDrop(moveNodeBefore, moveNodeAfter, moveNodeInto, setSelectedNodeID);

    // Handle block selection
    const handleLeftClick = useCallback(() => {
        if (isBlockSelected) return;
        setSelectedNodeID(nodeID);
    }, [isBlockSelected, nodeID]
    )

    // Handle context menu
    const handleRightClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsContextMenuOpen(true);
    }, [blockTag]
    );

    // Toggle handler for expanding/collapsing content
    const handleArrowClick = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []
    );

    const beforeDropzone = (
        <div
            className={CSS.DropZone}
            onDragOver={(e) => handleDragOver(e, 'before')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, nodeID, 'before')}
            data-drag-over={isDragOver === 'before'}
            data-drag-position="before"
        />
    );

    const afterDropzone = (
        <div
            className={CSS.DropZone}
            onDragOver={(e) => handleDragOver(e, 'after')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, nodeID, 'after')}
            data-drag-over={isDragOver === 'after'}
            data-drag-position="after"
        />
    );

    return (
        <div
            className={CSS.Entry}
            data-is-dragged={draggedItemID === nodeID}
            data-drag-over={isDragOver}
            data-children-allowed={canHaveChildren}
            data-has-children={hasChildren}
        >
            {/* Drop zone above */}
            {beforeDropzone}

            <div className={CSS.Reveal}>

                {/* Toggle button to expand/collapse the content */}
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
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    {...(canHaveChildren && !hasChildren && {
                        onDragOver: (e: React.DragEvent) => handleDragOver(e, 'over'),
                        onDragLeave: handleDragLeave,
                        onDrop: (e: React.DragEvent) => handleDrop(e, nodeID, 'over'),
                    })}
                />

                {/* Render expandable content if open */}
                {isOpen && <Children
                    canHaveChildren={canHaveChildren}
                    hasChildren={hasChildren}
                    nodeChildIDs={nodeChildIDs}
                />}

                <Menu
                    nodeID={nodeID}
                    isOpen={isContextMenuOpen}
                    onVisibilityChange={setIsContextMenuOpen}
                    targetRef={revealButtonRef}
                />
            </div>

            {/* Drop zone below */}
            {afterDropzone}
        </div>
    );
};

Entry.displayName = "Entry";
export default memo(Entry);