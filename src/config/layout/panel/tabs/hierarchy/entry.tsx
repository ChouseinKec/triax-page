"use client";

import React, { memo, useCallback, useMemo, useRef, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useNode, setSelectedNodeID, useIsNodeSelected, deleteNode, copyNode, pasteNode, duplicateNode, moveNodeAfter, moveNodeBefore, canNodeHaveChildren, moveNodeInto } from "@/core/block/node/managers";
import { getNodeIcon } from "@/core/block/node/managers";
import { copyNodeStyles, pasteNodeStyles } from "@/core/block/style/managers";
import { copyNodeAttributes, pasteNodeAttributes } from "@/core/block/attribute/managers";

// Types
import type { EntryProps } from "./types";
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import FloatReveal from "@/shared/components/reveal/float/component";
import DropdownReveal from "@/shared/components/reveal/dropdown/component";

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
 * @param  props.NodeID - Unique identifier for the block this entry represents
 * @returns Rendered hierarchy entry with interactive controls and nested children
 *
 * @note Includes copy/paste/reset operations for blocks, styles, and attributes via context menu
 */
const Entry: React.FC<EntryProps> = ({ NodeID }) => {
    const revealButtonRef = useRef<HTMLButtonElement | null>(null);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // Get block instance
    const block = useNode(NodeID);
    const NodeKey = block?.definitionKey;
    const NodeDataIDs = block?.childNodeIDs || [];
    const blockTag = block?.elementKey;

    const isBlockSelected = useIsNodeSelected(NodeID);
    const NodeIcon = NodeKey ? getNodeIcon(NodeKey) : null;
    const canHaveChildren = canNodeHaveChildren(NodeID);
    const hasChildren = NodeDataIDs.length > 0;

    // Drag and drop hook
    const {
        isDragOver,
        draggedItemID,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
    } = useDragDrop(
        moveNodeBefore,
        moveNodeAfter,
        moveNodeInto,
        setSelectedNodeID
    );

    // Handle block selection
    const handleLeftClick = useCallback(() => {
        if (isBlockSelected) return;
        setSelectedNodeID(NodeID);
    }, [isBlockSelected, NodeID]
    )

    // Handle context menu
    const handleRightClick = useCallback((e: React.MouseEvent) => {
        // Prevent context menu on body block
        if (blockTag === 'body') return;
        e.preventDefault();
        e.stopPropagation();
        setIsContextMenuOpen(true);
    }, [blockTag]
    );

    // Handle action click
    const handleActionClick = (action: () => void) => {
        action();
        setIsContextMenuOpen(false);
    }

    // Toggle handler for expanding/collapsing content
    const handleArrowClick = () => {
        setIsOpen(prev => !prev);
    }

    const beforeDropzone = (
        <div
            className={CSS.DropZone}
            onDragOver={(e) => handleDragOver(e, 'before')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, NodeID, 'before')}
            data-drag-over={isDragOver === 'before'}
            data-drag-position="before"
        />
    );

    const afterDropzone = (
        <div
            className={CSS.DropZone}
            onDragOver={(e) => handleDragOver(e, 'after')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, NodeID, 'after')}
            data-drag-over={isDragOver === 'after'}
            data-drag-position="after"
        />
    );

    // Render child entries recursively
    const childrenContent = useMemo(() => {
        if (!canHaveChildren) return null;

        const children =
            hasChildren
                ? NodeDataIDs.map((childID: NodeID) => (
                    <Entry key={childID} NodeID={childID} />
                ))
                : null;


        return (
            <div className={CSS.Content} >
                {children}
            </div>
        );
    }, [NodeDataIDs, canHaveChildren, hasChildren]
    );

    const contextMenu = useMemo(() => {
        const pasteIcon = <span className={CSS.DropdownIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z" /></svg>
            Paste
        </span>

        const copyIcon = <span className={CSS.DropdownIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" /></svg>
            Copy
        </span>

        return (
            <FloatReveal
                targetRef={revealButtonRef}
                isOpen={isContextMenuOpen}
                anchor="bottom"
                autoClose={true}
                onVisibilityChange={setIsContextMenuOpen}
                className={CSS.Context}
            >

                <DropdownReveal title="Copy" placeholder={copyIcon} className={CSS.Dropdown} anchor="right" offset={15}>
                    <button className={CSS.Action} onClick={() => handleActionClick(() => copyNode(NodeID))}>
                        Copy Block
                    </button>

                    <button className={CSS.Action} onClick={() => handleActionClick(() => copyNodeStyles(NodeID))}>
                        Copy Styles
                    </button>

                    <button className={CSS.Action} onClick={() => handleActionClick(() => copyNodeAttributes(NodeID))}>
                        Copy Attributes
                    </button>
                </DropdownReveal>

                <DropdownReveal title="Paste" placeholder={pasteIcon} className={CSS.Dropdown} anchor="right" offset={15}>
                    <button className={CSS.Action} onClick={() => handleActionClick(() => pasteNode(NodeID))}>
                        Paste Block
                    </button>
                    <button className={CSS.Action} onClick={() => handleActionClick(() => pasteNodeStyles(NodeID))}>
                        Paste Styles
                    </button>

                    <button className={CSS.Action} onClick={() => handleActionClick(() => pasteNodeAttributes(NodeID))}>
                        Paste Attributes
                    </button>
                </DropdownReveal>

                <button className={CSS.Action} onClick={() => handleActionClick(() => duplicateNode(NodeID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z" /></svg>
                    Duplicate Block
                </button>

                <button className={CSS.Action} onClick={() => handleActionClick(() => deleteNode(NodeID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" /></svg>
                    Delete Block
                </button>

            </FloatReveal>
        )
    }, [isContextMenuOpen, NodeID]
    );

    const revealButton = useMemo(() => {
        const attributes = {
            ref: revealButtonRef,
            className: CSS.RevealButton,

            'data-is-selected': isBlockSelected,

            onClick: handleLeftClick,
            onContextMenu: handleRightClick,

            draggable: true,
            onDragStart: (e: React.DragEvent) => {
                handleDragStart(e, NodeID);
                e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
            },
            onDragEnd: handleDragEnd,

            // Conditionally add drag handlers for blocks that can have children but don't have any yet
            ...(canHaveChildren && !hasChildren && {
                onDragOver: (e: React.DragEvent) => handleDragOver(e, 'over'),
                onDragLeave: handleDragLeave,
                onDrop: (e: React.DragEvent) => handleDrop(e, NodeID, 'over')
            })
        }

        return (
            <button {...attributes}>
                <span>
                    {NodeIcon}
                    <span>{`${NodeID} (${blockTag})`}</span>
                </span>

                {hasChildren && (
                    <span
                        tabIndex={0}
                        className={CSS.RevealArrow}
                        onClick={handleArrowClick}
                        data-is-open={isOpen}
                        data-is-selected={isBlockSelected}

                    />
                )}


            </button>
        )
    },
        [isBlockSelected, NodeID, isOpen, NodeIcon, handleDragEnd, handleDragStart, canHaveChildren, handleDragLeave, handleDragOver, handleDrop, handleLeftClick, handleRightClick, hasChildren]
    );

    return (
        <div
            className={CSS.Entry}
            data-is-dragged={draggedItemID === NodeID}
            data-drag-over={isDragOver}
            data-children-allowed={canHaveChildren}
            data-has-children={hasChildren}
        >
            {/* Drop zone above */}
            {beforeDropzone}

            <div className={CSS.Reveal}>

                {/* Toggle button to expand/collapse the content */}
                {revealButton}

                {/* Render expandable content if open */}
                {isOpen && childrenContent}

                {contextMenu}

            </div>

            {/* Drop zone below */}
            {afterDropzone}
        </div>
    );
};

Entry.displayName = "Entry";
export default memo(Entry);