import React, { useCallback, memo, useEffect } from 'react';

// Types
import type { BlockChildren, BlockInstance } from '@/src/page-builder/core/block/block/types';

// Manager
import { getSelectedBlockID, getNextBlock, getPreviousBlock, useHasBlockSelectedContent, useIsBlockSelected, deleteBlock, selectBlock, useRenderedBlockAttributes, useRenderedBlockStyles } from '@/src/page-builder/services/managers/block';
import { registerBarAction, unregisterBarAction } from "@/src/page-builder/services/managers/layout/bar";

/**
 * Renders a container block that can hold other blocks.
 * 
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this container
 * @returns JSX element representing the container block
 */
const ContainerRender: React.FC<{ instance: BlockInstance; children?: BlockChildren }> = ({ instance, children }) => {
    const blockID = instance.id;
    const isSelected = useIsBlockSelected(blockID);
    const hasChildSelected = useHasBlockSelectedContent(blockID);
    const blockAttributes = useRenderedBlockAttributes(blockID);
    const blockStyles = useRenderedBlockStyles(blockID);

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        selectBlock(blockID);
    }, [selectBlock, blockID]
    );

    // Select next block on ArrowDown
    const handleSelectNext = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowDown") return;

        const currentBlockID = getSelectedBlockID();
        if (!currentBlockID) return;

        const nextBlock = getNextBlock();
        if (!nextBlock) return;

        selectBlock(nextBlock.id);
    }

    // Select previous block on ArrowUp
    const handleSelectPrevious = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowUp") return;

        const currentBlockID = getSelectedBlockID();
        if (!currentBlockID) return;

        const previousBlock = getPreviousBlock();
        if (!previousBlock) return;

        selectBlock(previousBlock.id);
    };

    // Handle keyboard navigation
    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            handleSelectNext(e);
        } else if (e.key === "ArrowUp") {
            handleSelectPrevious(e);
        }
    };

    /**
     * Register block actions in blocks context when the block is mounted.
     * Cleanup on unmount to prevent memory leaks.
    */
    useEffect(() => {
        const deleteID = `blockaction__delete-${blockID}`;
        const isDisabled = blockID === 'body';

        if (!isSelected) {
            unregisterBarAction('block-actions', deleteID);
            return;
        };

        registerBarAction('block-actions', {
            id: deleteID,
            order: 10,
            title: "Delete Block",
            render: () => (
                <button onClick={() => deleteBlock(blockID)} data-is-disabled={isDisabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                        <path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                </button>
            ),
        })

        return () => {
            unregisterBarAction('block-actions', deleteID);
        };

    }, [blockID, unregisterBarAction, registerBarAction, isSelected]
    );

    return (
        <div
            id={`block-${blockID}`}
            onClick={handleSelectBlock}
            onKeyUp={handleKeyUp}
            data-block-type="container"
            data-is-selected={isSelected}
            data-has-selected-descendant={hasChildSelected}
            {...blockAttributes}
        >
            {/* Render child blocks */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {blockStyles}
            </style>
        </div>
    );
}


export default memo(ContainerRender);