import React, { memo, useMemo } from "react";
import CSS from "./styles.module.scss";

// Types 
import type { BlocksProps } from "./types";

// Components
import Block from "../block/component";

// Hooks & Context
import { useBlockManager } from "@/hooks/block/manager";
import { BlockEditorContext } from "./context";

/**
 * Blocks Component
 * Provides context and renders all root blocks in the editor.
 * Handles block actions and state via context for all nested Block components.
 */
const Blocks: React.FC<BlocksProps> = memo(() => {
    // Get all block actions and state from the block manager hook
    const {
        addBlock,
        selectBlock,
        deleteBlock,
        getBlockChildren,
        getBlockParent,
        getBlockCSS,
        getBlock,
        getAllBlocks,
        getSelectedBlockID,
        getBlockSelectedChild,
        getBlockStyles,
    } = useBlockManager();

    // Get current selected block ID and all blocks
    const selectedBlockID = getSelectedBlockID();
    const allBlocks = getAllBlocks();

    // Compute root blocks (blocks without a parent)
    const rootBlocks = useMemo(() =>
        Object.values(allBlocks).filter(block => block.parent == null),
        [allBlocks]
    );

    // Memoize context value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        allBlocks,
        selectedBlockID,
        addBlock,
        selectBlock,
        getBlock,
        deleteBlock,
        getBlockChildren,
        getBlockParent,
        getBlockCSS,
        getBlockSelectedChild,
        getBlockStyles,
    }), [
        allBlocks,
        selectedBlockID,
        addBlock,
        selectBlock,
        getBlock,
        deleteBlock,
        getBlockChildren,
        getBlockParent,
        getBlockCSS,
        getBlockSelectedChild,
        getBlockStyles,
    ]);

    return (
        <BlockEditorContext.Provider value={contextValue}>
            <div className={CSS.Blocks}>
                {/* Render all root blocks recursively */}
                {rootBlocks.map(block => (
                    <Block
                        key={block.id}
                        id={block.id}
                    />
                ))}

                {/* Button to add a new root block */}
                <button
                    className={CSS.AddBlock}
                    onClick={() => addBlock()}
                >
                    Add Block
                </button>

                {/* <button
                    className={CSS.AddBlock}
                    onClick={() => console.log(allBlocks)}
                >
                    Print Blocks
                </button> */}
            </div >
        </BlockEditorContext.Provider>

    );
});

export default Blocks;