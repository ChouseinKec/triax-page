import { useCallback } from "react";

// Stores
import useBlockStore from "@/stores/block/store";

// Types
import type { BlockData } from "@/types/block/block";
import type { BlockTagKeys } from "@/types/block/tag";

interface BlockManager {
    addBlock: (tag: BlockTagKeys, parentID?: string) => void;
    selectBlock: (blockID: string) => void;
    deleteBlock: (blockID: string) => void;
    getSelectedBlock: () => BlockData | null;

    getAllBlocks: () => Record<string, BlockData>;

    hasBlockSelectedChild: (blockID: string) => boolean;
}

export const useBlockManager = (): BlockManager => {
    const _addBlock = useBlockStore(state => state.addBlock);
    const _selectBlock = useBlockStore(state => state.selectBlock);
    const _deleteBlock = useBlockStore(state => state.deleteBlock);
    const _getBlock = useBlockStore(state => state.getBlock);

    const _selectedBlockID = useBlockStore(state => state.selectedBlockID);
    const _allBlocks = useBlockStore(state => state.allBlocks);


    /**
     * Adds a new block to the editor.
     * 
     * @param {string} [parentID] - Optional ID of the parent block to add the new block under.
     *                              If not provided, the new block will be added at the root level.
    */
    const addBlock = useCallback<BlockManager['addBlock']>((tag: BlockTagKeys, parentID?: string) => {
        _addBlock(tag, parentID);
    }, [_addBlock]
    );

    /**
     * Deletes a block by its ID.
     *
     * @param {string} blockID - The ID of the block to delete.
     *                           If the block does not exist, no action is taken.
    */
    const deleteBlock = useCallback<BlockManager['deleteBlock']>((blockID: string) => {
        _deleteBlock(blockID);
    }, [_deleteBlock]
    );

    /**
     * Selects a block by its ID.
     * This function updates the store to set the selected block.
     *
     * @param {string} blockID - The ID of the block to select.
    */
    const selectBlock = useCallback<BlockManager['selectBlock']>((blockID: string) => {
        _selectBlock(blockID);
    }, [_selectBlock]
    );

    /**
     * Retrieves all blocks from the store.
     * 
     * @returns {Record<string, BlockStyleData>} - An object containing all blocks keyed by their IDs.
    */
    const getAllBlocks = useCallback<BlockManager['getAllBlocks']>(() => {
        return _allBlocks;
    }, [_allBlocks]
    );

    /**
     * Retrieves the ID of the currently selected block.
     * 
     * @returns {string | null} - The ID of the selected block, or null if no block is selected.
    */
    const getSelectedBlock = useCallback<BlockManager['getSelectedBlock']>(() => {
        if (!_selectedBlockID) return null;
        return _allBlocks[_selectedBlockID] || null;
    }, [_selectedBlockID]
    );



    /**
     * Checks if a block is selected and returns the ID of the selected block.
     * 
     * @returns {string | null} - The ID of the selected block, or null if no block is selected.
     * 
     */
    const hasBlockSelectedChild = useCallback<BlockManager['hasBlockSelectedChild']>((blockID: string): boolean => {
        // If no block is selected or the selected block is the same as blockID, return false
        if (!_selectedBlockID || _selectedBlockID === blockID) return false;

        // Helper to check if selectedBlockID is a descendant of blockID
        const isDescendant = (parentID: string, targetID: string): boolean => {
            const block = _getBlock(parentID);
            if (!block || !block.contentIDs) return false;
            if (block.contentIDs.includes(targetID)) return true;
            return block.contentIDs.some(childID => isDescendant(childID, targetID));
        };

        return isDescendant(blockID, _selectedBlockID);
    }, [_selectedBlockID, _getBlock]
    );

    return {
        addBlock,
        deleteBlock,
        selectBlock,
        hasBlockSelectedChild,

        getAllBlocks,
        getSelectedBlock,

    }

}