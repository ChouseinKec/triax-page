import React, { memo, useMemo, useRef, useState } from "react";
import CSS from "./styles.module.scss";

// Types 
import type { BlocksProps } from "./types";

// Components
import Block from "../block/component";

// Hooks & Context
import { useBlockManager } from "@/hooks/block/manager";
import { useStyleManager } from "@/hooks/style/manager";
import { BlockEditorContext } from "./context";

// Utilitie
import { treeBlocks } from "@/utilities/block/block";

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
        getAllBlocks,
        getSelectedBlock,
        hasBlockSelectedChild,
    } = useBlockManager();

    const {
        generateCSS
    } = useStyleManager();

    // Get current selected block ID and all blocks
    const selectedBlockID = getSelectedBlock()?.id || null;
    const allBlocks = getAllBlocks();
    const [blocksNode, setBlocksNode] = useState<HTMLDivElement | null>(null);

    // Memoize context value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        addBlock,
        selectBlock,
        deleteBlock,
        generateCSS,
        blocksNode,
    }), [
        addBlock,
        selectBlock,
        deleteBlock,
        generateCSS,
        blocksNode,
    ]);

    const nestedBlocks = useMemo(() => treeBlocks(allBlocks, selectedBlockID, hasBlockSelectedChild), [allBlocks, selectedBlockID, hasBlockSelectedChild]);

    return (
        <BlockEditorContext.Provider value={contextValue}>
            <div className={CSS.Blocks} ref={node => setBlocksNode(node)}
            >
                {nestedBlocks.map(block => (
                    <Block
                        key={block.id}
                        {...block}
                    />
                ))}
            </div >
        </BlockEditorContext.Provider>

    );
});

export default Blocks;