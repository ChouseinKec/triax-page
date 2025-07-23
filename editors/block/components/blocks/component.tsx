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
 * Provides context and renders all root blocks in the editor.
 * Handles block actions and state via context for all nested Block components.
 */
const Blocks: React.FC<BlocksProps> = memo(() => {
    const { getAllBlocks } = useBlockManager();

    const allBlocks = useMemo(() => getAllBlocks(), [getAllBlocks]);

    const rootBlocks = useMemo(
        () => Object.values(allBlocks).filter(block => !block.parentID),
        [allBlocks]
    );

    console.log(allBlocks);

    return (
        <div className={CSS.Blocks} >
            {rootBlocks.map(block => (
                <Block key={block.id} blockID={block.id} />
            ))}
        </div >
    );
});

export default Blocks;