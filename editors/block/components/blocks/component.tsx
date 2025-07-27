"use client";

import React, { memo, useMemo } from "react";
import CSS from "./styles.module.scss";

// Types
import type { BlocksProps } from "./types";

// Components
import Block from "../block/component";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

/**
 * Blocks Component
 *
 * Renders all root blocks in the editor. Uses the block manager to retrieve all blocks,
 * filters for root blocks (blocks without a parent), and renders each as a <Block />.
 *
 * @component
 * @param  props - The props for the Blocks component (currently unused).
 * @returns  The rendered list of root blocks.
 */
const Blocks: React.FC<BlocksProps> = () => {
    // Retrieve the block manager's getAllBlocks function
    const { getAllBlocks } = useBlockManager();

    /**
     * Memoized object containing all blocks in the editor.
    */
    const allBlocks = useMemo(() => getAllBlocks(), [getAllBlocks]);

    /**
     * Memoized array of root blocks (blocks without a parent).
    */
    const rootBlocks = useMemo(() => Object.values(allBlocks).filter(block => !block.parentID), [allBlocks]);

    return (
        <div className={CSS.Blocks}>
            {/* Render each root block */}
            {rootBlocks.map(block => (
                <Block key={block.id} blockID={block.id} />
            ))}
        </div>
    );
};

export default memo(Blocks);