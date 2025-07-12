import { useCallback } from "react";

// Stores
import useDeviceStore from '@/stores/device/store';
import useOrientationStore from '@/stores/orientation/store';
import useBlockStore from "@/stores/block/store";
// Types
import type { BlockData, BlockStyleData } from "@/types/block/block";

interface BlockManager {
    addBlock: (parentID?: string) => void;
    selectBlock: (blockID: string) => void;
    deleteBlock: (blockID: string) => void;
    getBlock: (blockID: string) => BlockData | undefined;
    getBlockStyles: (blockID: string) => BlockStyleData | undefined;
    getBlockChildren: (blockID: string) => string[] | undefined;
    getBlockParent: (blockID: string) => string | null;

    getBlockSelectedChild: (blockID: string) => string | null;

    getAllBlocks: () => Record<string, BlockData>;
    getSelectedBlockID: () => string | null;

    getBlockCSS: (blockID: string) => string | null;
}

export const useBlockManager = (): BlockManager => {
    const _addBlock = useBlockStore(state => state.addBlock);
    const _selectBlock = useBlockStore(state => state.selectBlock);
    const _deleteBlock = useBlockStore(state => state.deleteBlock);
    const _getBlock = useBlockStore(state => state.getBlock);
    const _getBlockStyle = useBlockStore(state => state.getBlockStyles);

    const _selectedBlock = useBlockStore(state => state.selectedBlock);
    const _allBlocks = useBlockStore(state => state.allBlocks);


    /**
     * Adds a new block to the editor.
     * 
     * @param {string} [parentID] - Optional ID of the parent block to add the new block under.
     *                              If not provided, the new block will be added at the root level.
    */
    const addBlock = useCallback<BlockManager['addBlock']>((parentID?: string) => {
        _addBlock(parentID);
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
     * Retrieves the children of a block by its ID.
     * 
     * @param {string} blockID - The ID of the block to retrieve children for.
     * @returns {string[] | undefined} - An array of child block IDs, or undefined if the block does not exist or has no children.
    */
    const getBlockChildren = useCallback<BlockManager['getBlockChildren']>((blockID: string) => {
        const block = _getBlock(blockID);
        return block ? block.children : undefined;
    }, [_getBlock]
    );

    /**
     * Retrieves the parent block ID of a given block.
     * 
     * @param {string} blockID - The ID of the block to find the parent for.
     * @returns {string | null} - The ID of the parent block, or null if the block has no parent.
    */
    const getBlockParent = useCallback<BlockManager['getBlockParent']>((blockID: string) => {
        const block = _getBlock(blockID);
        return block ? block.parent : null;
    }, [_getBlock]
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
    const getSelectedBlockID = useCallback<BlockManager['getSelectedBlockID']>(() => {
        return _selectedBlock;
    }, [_selectedBlock]
    );

    /**
     * Retrieves the styles for a specific block by its ID.
     * 
     * @param {string} blockID - The ID of the block to retrieve styles for.
     * @returns {BlockStyleData | undefined} - The styles of the block, or undefined if no styles are found.
    */
    const getBlockStyles = useCallback<BlockManager['getBlockStyles']>((blockID: string) => {
        return _getBlockStyle(blockID);
    }, [_getBlockStyle]
    );

    /**
     * Generates CSS for a block by processing its style configuration.
     *
     * @param {string} blockID - The ID of the block to generate CSS for.
     * @returns {string | null} - The generated CSS, or null if it cannot be generated.
     */
    const getBlockCSS = useCallback<BlockManager['getBlockCSS']>((blockID: string): string | null => {
        if (!blockID) return null;

        const styles = _getBlockStyle(blockID);
        if (!styles) return null;

        // Get devices and orientations
        const devices = useDeviceStore.getState().getDevices();
        const orientations = useOrientationStore.getState().getOrientations();

        let css = '';

        // Process each device (breakpoint)
        for (const [deviceName, deviceStyles] of Object.entries(styles)) {
            if (!deviceStyles) continue;

            // Process each orientation
            for (const [orientationName, orientationStyles] of Object.entries(deviceStyles)) {
                if (!orientationStyles) continue;

                // Get media queries for device + orientation
                const device = devices.find((d) => d.value === deviceName);
                const orientation = orientations.find((o) => o.value === orientationName);
                if (!device || !orientation) continue;

                // Build media query
                let mediaQuery = '';
                if (deviceName !== 'default') {
                    mediaQuery = `@media ${device.media}`;
                    mediaQuery += orientationName !== 'default' ? ` and (orientation: ${orientationName})` : ')';
                } else if (orientationName !== 'default') {
                    mediaQuery = `@media (orientation: ${orientationName})`;
                }

                if (mediaQuery) css += `${mediaQuery} {\n`;

                // Process each pseudo state
                for (const [pseudoName, pseudoStyles] of Object.entries(orientationStyles)) {
                    if (!pseudoStyles || Object.keys(pseudoStyles).length === 0) continue;

                    const selector = pseudoName === 'default' ? '' : `:${pseudoName}`;

                    // Generate class name based on block ID only
                    css += `  #block-${blockID}${selector} {\n`;

                    // Add each style property
                    for (const [property, value] of Object.entries(pseudoStyles)) {
                        if (!value) continue;
                        const StylePropertyData = property.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
                        css += `    ${StylePropertyData}: ${value};\n`;
                    }

                    css += '  }\n';
                }

                if (mediaQuery) css += '}\n';
            }
        }

        return css;


    }, [_getBlockStyle, useDeviceStore, useOrientationStore]
    );

    /**
     * Retrieves the currently selected block's data.
     * 
     * @returns {BlockData | undefined} - The selected block's data, or undefined if no block is selected.
    */
    const getBlock = useCallback<BlockManager['getBlock']>((blockID: string) => {
        return _getBlock(blockID);
    }, [_getBlock]
    );

    /**
     * Checks if a block is selected and returns the ID of the selected block.
     * 
     * @returns {string | null} - The ID of the selected block, or null if no block is selected.
     * 
     */
    const getBlockSelectedChild = useCallback<BlockManager['getBlockSelectedChild']>((blockID: string): string | null => {
        // If no block is selected or the selected block is the same as blockID, return null
        if (!_selectedBlock || _selectedBlock === blockID) return null;

        // Helper to check if selectedBlockID is a descendant of blockID
        const isDescendant = (parentID: string, targetID: string): boolean => {
            const block = _getBlock(parentID);
            if (!block || !block.children) return false;
            if (block.children.includes(targetID)) return true;
            return block.children.some(childID => isDescendant(childID, targetID));
        };

        return isDescendant(blockID, _selectedBlock) ? _selectedBlock : null;
    }, [_selectedBlock, _getBlock]
    );


    return {
        addBlock,
        deleteBlock,
        selectBlock,
        getBlock,
        getBlockChildren,
        getBlockParent,
        getBlockSelectedChild,
        getBlockStyles,

        getAllBlocks,
        getSelectedBlockID,

        getBlockCSS,

    }

}