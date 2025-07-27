import { useCallback } from "react";

// Stores
import useBlockStore from "@/stores/block/store";
import usePageStore from '@/stores/page/store';


// Types
import type { BlockInstance, BlockStyleData, BlockType, BlockTag, BlockAttributeValue } from "@/types/block/block";

// Utilities
import { getAllStylesWithFallback } from "@/utilities/style/cascade";
import { getBlockSelector, generateCSSRule } from "@/utilities/style/css";

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
    getBlockTag: (blockID: string) => BlockTag | undefined;
    getBlockContentIDs: (blockID: string) => string[] | undefined;
    hasSelectedChild: (blockID: string) => boolean;

    renderBlockStyles: (blockID: string) => string | undefined;

    setBlockAttribute: (blockID: string, attribute: string, value: BlockAttributeValue) => void;
    getBlockAttribute: (blockID: string, attribute: string) => BlockAttributeValue | undefined;
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
    const _setBlockAttribute = useBlockStore(state => state.setBlockAttribute);

    // Store state
    const _allBlocks = useBlockStore(state => state.allBlocks);
    const _selectedBlockID = useBlockStore(state => state.selectedBlockID);


    // Page state
    const device = usePageStore((state) => state.currentDevice.value);
    const orientation = usePageStore((state) => state.currentOrientation.value);
    const pseudo = usePageStore((state) => state.currentPseudo.value);

    /**
     * Adds a new block to the editor.
     * @param tag - The tag of the block to add.
     * @param parentID - Optional parent block ID.
     */
    const addBlock = useCallback<BlockManager['addBlock']>((type, parentID) => {
        _addBlock(type, parentID);
    }, [_addBlock]
    );

    /**
     * Deletes a block by its ID.
     * @param blockID - The ID of the block to delete.
     */
    const deleteBlock = useCallback<BlockManager['deleteBlock']>((blockID) => {
        _deleteBlock(blockID);
    }, [_deleteBlock]
    );

    /**
     * Selects a block by its ID.
     * @param blockID - The ID of the block to select.
     */
    const selectBlock = useCallback<BlockManager['selectBlock']>((blockID) => {
        _selectBlock(blockID);
    }, [_selectBlock]
    );

    /**
     * Retrieves all blocks from the store.
     * @returns All blocks keyed by their IDs.
     */
    const getAllBlocks = useCallback<BlockManager['getAllBlocks']>(() => {
        return _allBlocks;
    }, [_allBlocks]
    );

    /**
     * Retrieves a block by its ID.
     * @param blockID - The ID of the block to retrieve.
     * @returns The block data or null if not found.
     */
    const getBlock = useCallback<BlockManager['getBlock']>((blockID) => {
        return _allBlocks[blockID] || null;
    }, [_allBlocks]
    );

    /**
     * Retrieves the currently selected block.
     * @returns The selected block data or null if none selected.
     */
    const getSelectedBlock = useCallback<BlockManager['getSelectedBlock']>(() => {
        return (_selectedBlockID ? _allBlocks[_selectedBlockID] || null : null);
    }, [_selectedBlockID, _allBlocks]
    );

    /**
     * Retrieves the styles for a block by its ID.
     * @param blockID - The ID of the block.
     * @returns The block's styles or undefined if not found.
     */
    const getBlockStyles = useCallback<BlockManager['getBlockStyles']>((blockID) => {
        return _allBlocks[blockID]?.styles;
    }, [_allBlocks]
    );

    /**
     * Retrieves the tag of a block by its ID.
     * @param blockID - The ID of the block.
     * @returns The block's tag or undefined if not found.
     */
    const getBlockTag = useCallback<BlockManager['getBlockTag']>((blockID) => {
        return _allBlocks[blockID]?.tag;
    }, [_allBlocks]
    );

    /**
     * Retrieves the content IDs (children) of a block by its ID.
     * @param blockID - The ID of the block.
     * @returns Array of child block IDs or undefined if not found.
     */
    const getBlockContentIDs = useCallback<BlockManager['getBlockContentIDs']>((blockID) => {
        return _allBlocks[blockID]?.contentIDs;
    }, [_allBlocks]
    );

    /**
     * Checks if the selected block is a descendant of the given block.
     * @param blockID - The ID of the block to check.
     * @returns True if the selected block is a descendant, false otherwise.
     */
    const hasSelectedChild = useCallback<BlockManager['hasSelectedChild']>((blockID) => {
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

    /**
     * Renders the styles for a block based on the current context.
     * Uses the utility function to resolve styles with CSS cascade logic.
     * @param blockID - The ID of the block to render styles for.
     * @returns The resolved CSS styles as a string or undefined if no styles found.
    */
    const renderBlockStyles = useCallback<BlockManager['renderBlockStyles']>((blockID) => {
        const styles = _allBlocks[blockID]?.styles;
        if (!styles) return undefined;

        const resolvedStyles = getAllStylesWithFallback(
            styles,
            device,
            orientation,
            pseudo
        );

        if (Object.keys(resolvedStyles).length === 0) return undefined;

        // Generate CSS
        const selector = getBlockSelector(blockID, pseudo);
        return generateCSSRule(selector, resolvedStyles);

    }, [_allBlocks, device, orientation, pseudo]
    );

    /**
     * Sets an attribute on a block instance.
     * @param blockID - The ID of the block to update.
     * @param attribute - The attribute name to set.
     * @param value - The value to set for the attribute.
     */
    const setBlockAttribute = useCallback<BlockManager['setBlockAttribute']>((blockID, attribute, value) => {
        _setBlockAttribute(blockID, attribute, value);
    }, [_setBlockAttribute]
    );

    /**
     * Gets an attribute value from a block instance.
     * @param blockID - The ID of the block to query.
     * @param attribute - The attribute name to retrieve.
     * @returns The attribute value or undefined if not found.
     */
    const getBlockAttribute = useCallback<BlockManager['getBlockAttribute']>((blockID, attribute) => {
        return _allBlocks[blockID]?.attributes?.[attribute];
    }, [_allBlocks]
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
        getBlockTag,
        getBlockContentIDs,
        hasSelectedChild,
        renderBlockStyles,
        setBlockAttribute,
        getBlockAttribute,
    };
};