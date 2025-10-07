"use client";

import React, { memo, useMemo, useRef, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import {
    useBlockType,
    useBlockContentIDs,
    selectBlock,
    useIsBlockSelected,
    getBlockIcon,
    deleteBlock,
    copyBlock,
    pasteBlock,
    duplicateBlock,
    copyBlockStyles,
    pasteBlockStyles,
    copyBlockAttributes,
    pasteBlockAttributes,
    moveBlockAfter,
    moveBlockBefore,
    canBlockHaveChildren,
    moveBlockInto,
} from "@/src/page-builder/services/managers/block";

// Types
import type { EntryProps } from "@/src/page-builder/ui/inspectors/block/types/hierarchy";

// Components
import FloatReveal from "@/src/shared/components/reveal/float/component";
import HorizontalDivider from "@/src/shared/components/divider/horizontal/component";

// Hooks
import { useDragDrop } from "@/src/shared/hooks/interface/useDragDrop";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * Entry Component
 * Renders the block hierarchy entry with children for better user experience.
 *
 * @param blockID - The block identifier
 * @returns The rendered entry with children for hierarchy navigation
 */
const Entry: React.FC<EntryProps> = ({ blockID }) => {
    if (!blockID) return devRender.error("[Entry] No blockID provided");
    const revealButtonRef = useRef<HTMLButtonElement | null>(null);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const blockType = useBlockType(blockID);
    const blockContentIDs = useBlockContentIDs(blockID) || [];
    const isBlockSelected = useIsBlockSelected(blockID);
    const blockIcon = blockType ? getBlockIcon(blockType) : null;
    const canHaveChildren = canBlockHaveChildren(blockID);
    const hasChildren = blockContentIDs && blockContentIDs.length > 0 ? true : false;

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
        moveBlockBefore,
        moveBlockAfter,
        moveBlockInto,
        selectBlock
    );

    // Handle block selection
    const handleLeftClick = () => {
        if (isBlockSelected) {
            selectBlock(null);
        } else {
            selectBlock(blockID);
        }
    }

    // Handle context menu
    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsContextMenuOpen(true);
    }

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
            className={CSS.Entry__DropZone}
            onDragOver={(e) => handleDragOver(e, 'before')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, blockID, 'before')}
            data-drag-over={isDragOver === 'before'}
            data-drag-position="before"
        />
    );

    const afterDropzone = (
        <div
            className={CSS.Entry__DropZone}
            onDragOver={(e) => handleDragOver(e, 'after')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, blockID, 'after')}
            data-drag-over={isDragOver === 'after'}
            data-drag-position="after"
        />
    );

    // Render child entries recursively
    const childrenContent = useMemo(() => {
        if (!canHaveChildren) return null;

        const children =
            hasChildren
                ? blockContentIDs.map((childID) => (
                    <Entry key={childID} blockID={childID} />
                ))
                : null;


        return (
            <div className={CSS.Entry__Content} >
                {children}
            </div>
        );
    }, [blockContentIDs, canHaveChildren]
    );

    const contextMenu = useMemo(() => {
        return (
            <FloatReveal
                targetRef={revealButtonRef}
                isOpen={isContextMenuOpen}
                anchor="bottom"
                autoClose={true}
                onVisibilityChange={setIsContextMenuOpen}
            >
                <button className={CSS.Entry__Action} onClick={() => handleActionClick(() => copyBlock(blockID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" /></svg>
                    Copy Block
                </button>
                <button className={CSS.Entry__Action} onClick={() => handleActionClick(() => pasteBlock(blockID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z" /></svg>
                    Paste Block
                </button>
                <button className={CSS.Entry__Action} onClick={() => handleActionClick(() => duplicateBlock(blockID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z" /></svg>
                    Duplicate Block
                </button>
                <button className={CSS.Entry__Action} onClick={() => handleActionClick(() => deleteBlock(blockID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" /></svg>
                    Delete Block
                </button>

                <HorizontalDivider variation="solid" />

                <button className={CSS.Entry__Action} onClick={() => handleActionClick(() => copyBlockStyles(blockID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" /></svg>
                    Copy Styles
                </button>
                <button className={CSS.Entry__Action} onClick={() => handleActionClick(() => pasteBlockStyles(blockID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z" /></svg>
                    Paste Styles
                </button>

                <HorizontalDivider variation="solid" />

                <button className={CSS.Entry__Action} onClick={() => handleActionClick(() => copyBlockAttributes(blockID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" /></svg>
                    Copy Attributes
                </button>
                <button className={CSS.Entry__Action} onClick={() => handleActionClick(() => pasteBlockAttributes(blockID))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z" /></svg>
                    Paste Attributes
                </button>
            </FloatReveal>
        )
    }, [isContextMenuOpen, blockID]
    );

    const revealButton = useMemo(() => {
        const attributes = {
            ref: revealButtonRef,
            className: CSS.Entry__RevealButton,

            'data-is-selected': isBlockSelected,

            onClick: handleLeftClick,
            onContextMenu: handleRightClick,

            draggable: true,
            onDragStart: (e: React.DragEvent) => {
                handleDragStart(e, blockID);
                e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
            },
            onDragEnd: handleDragEnd,

            // Conditionally add drag handlers for blocks that can have children but don't have any yet
            ...(canHaveChildren && !hasChildren && {
                onDragOver: (e: React.DragEvent) => handleDragOver(e, 'over'),
                onDragLeave: handleDragLeave,
                onDrop: (e: React.DragEvent) => handleDrop(e, blockID, 'over')
            })
        }

        return (
            <button {...attributes}>
                <span>
                    {blockIcon}
                    <span>{blockID}</span>
                </span>

                {hasChildren && (
                    <span
                        tabIndex={0}
                        className={CSS.Entry__RevealArrow}
                        onClick={handleArrowClick}
                        data-is-open={isOpen}
                    />
                )}


            </button>
        )
    },
        [isBlockSelected, blockID, isOpen, childrenContent, blockIcon, handleDragEnd, handleDragStart, draggedItemID]
    );

    return (
        <div
            className={CSS.Entry}
            data-is-dragged={draggedItemID === blockID}
            data-drag-over={isDragOver}
            data-children-allowed={canHaveChildren}
            data-has-children={hasChildren}
        >
            {/* Drop zone above */}
            {beforeDropzone}

            <div className={CSS.Entry__Reveal}>

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

export default memo(Entry);