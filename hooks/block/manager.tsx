import { useCallback } from "react";

// Stores
import useBlockStore from "@/stores/block/store";

// Hooks
import { useStyleManager } from "@/hooks/style/manager";

// Types
import type { BlockInstance, BlockStyleData, BlockType, BlockTag } from "@/types/block/block";

/**
 * BlockManager interface defines all actions and selectors for block management.
 */
interface BlockManager {
    // Actions
    addBlock: (type: BlockType, parentID?: string) => void;
    deleteBlock: (blockID: string) => void;
    selectBlock: (blockID: string | null) => void;

    // Selectors
    getAllBlocks: () => Record<string, BlockInstance>;
    getBlock: (blockID: string) => BlockInstance | null;
    getSelectedBlock: () => BlockInstance | null;
    getBlockStyles: (blockID: string) => BlockStyleData | null;
    renderBlockStyles: (blockID: string) => string | undefined;
    getBlockTag: (blockID: string) => BlockTag | undefined;
    getBlockContentIDs: (blockID: string) => string[] | undefined;
    hasSelectedChild: (blockID: string) => boolean;
}

/**
 * useBlockManager
 * Centralizes all block actions and selectors for use throughout the app.
 */
export const useBlockManager = (): BlockManager => {
    // Store actions
    const _addBlock = useBlockStore(state => state.addBlock);
    const _deleteBlock = useBlockStore(state => state.deleteBlock);
    const _selectBlock = useBlockStore(state => state.selectBlock);
    const _getBlock = useBlockStore(state => state.getBlock);

    // Store state
    const _allBlocks = useBlockStore(state => state.allBlocks);
    const _selectedBlockID = useBlockStore(state => state.selectedBlockID);

    // Style manager
    const { generateCSS } = useStyleManager();

    /**
     * Adds a new block to the editor.
     * @param tag - The tag of the block to add.
     * @param parentID - Optional parent block ID.
     */
    const addBlock = useCallback<BlockManager['addBlock']>(
        (type, parentID) => _addBlock(type, parentID),
        [_addBlock]
    );

    /**
     * Deletes a block by its ID.
     * @param blockID - The ID of the block to delete.
     */
    const deleteBlock = useCallback<BlockManager['deleteBlock']>(
        (blockID) => _deleteBlock(blockID),
        [_deleteBlock]
    );

    /**
     * Selects a block by its ID.
     * @param blockID - The ID of the block to select.
     */
    const selectBlock = useCallback<BlockManager['selectBlock']>(
        (blockID) => _selectBlock(blockID),
        [_selectBlock]
    );

    /**
     * Retrieves all blocks from the store.
     * @returns All blocks keyed by their IDs.
     */
    const getAllBlocks = useCallback<BlockManager['getAllBlocks']>(
        () => _allBlocks,
        [_allBlocks]
    );

    /**
     * Retrieves a block by its ID.
     * @param blockID - The ID of the block to retrieve.
     * @returns The block data or null if not found.
     */
    const getBlock = useCallback<BlockManager['getBlock']>(
        (blockID) => _allBlocks[blockID] || null,
        [_allBlocks]
    );

    /**
     * Retrieves the currently selected block.
     * @returns The selected block data or null if none selected.
     */
    const getSelectedBlock = useCallback<BlockManager['getSelectedBlock']>(
        () => (_selectedBlockID ? _allBlocks[_selectedBlockID] || null : null),
        [_selectedBlockID, _allBlocks]
    );

    /**
     * Retrieves the styles for a block by its ID.
     * @param blockID - The ID of the block.
     * @returns The block's styles or undefined if not found.
     */
    const getBlockStyles = useCallback<BlockManager['getBlockStyles']>(
        (blockID) => _allBlocks[blockID]?.styles,
        [_allBlocks]
    );

    /**
     * Generates CSS styles for a block by its ID.
     * @param blockID - The ID of the block.
     * @returns The generated CSS string or undefined if block not found.
     */
    const renderBlockStyles = useCallback<BlockManager['renderBlockStyles']>(
        (blockID) => {
            const block = _allBlocks[blockID];
            if (!block || !block.styles) return undefined;
            return generateCSS(blockID, block.styles);
        },
        [_allBlocks, generateCSS]
    );

    /**
     * Retrieves the tag of a block by its ID.
     * @param blockID - The ID of the block.
     * @returns The block's tag or undefined if not found.
     */
    const getBlockTag = useCallback<BlockManager['getBlockTag']>(
        (blockID) => _allBlocks[blockID]?.tag,
        [_allBlocks]
    );

    /**
     * Retrieves the content IDs (children) of a block by its ID.
     * @param blockID - The ID of the block.
     * @returns Array of child block IDs or undefined if not found.
     */
    const getBlockContentIDs = useCallback<BlockManager['getBlockContentIDs']>(
        (blockID) => _allBlocks[blockID]?.contentIDs,
        [_allBlocks]
    );

    /**
     * Checks if the selected block is a descendant of the given block.
     * @param blockID - The ID of the block to check.
     * @returns True if the selected block is a descendant, false otherwise.
     */
    const hasSelectedChild = useCallback<BlockManager['hasSelectedChild']>(
        (blockID) => {
            if (!_selectedBlockID || _selectedBlockID === blockID) return false;

            // Recursive helper to check descendants
            const isDescendant = (parentID: string, targetID: string): boolean => {
                const block = _getBlock(parentID);
                if (!block?.contentIDs) return false;
                if (block.contentIDs.includes(targetID)) return true;
                return block.contentIDs.some(childID => isDescendant(childID, targetID));
            };

            return isDescendant(blockID, _selectedBlockID);
        },
        [_selectedBlockID, _getBlock]
    );

    return {
        // Actions
        addBlock,
        deleteBlock,
        selectBlock,

        // Selectors
        getAllBlocks,
        getBlock,
        getSelectedBlock,
        getBlockStyles,
        renderBlockStyles,
        getBlockTag,
        getBlockContentIDs,
        hasSelectedChild,
    };
};