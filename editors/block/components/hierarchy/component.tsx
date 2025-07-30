"use client";

import React, { useMemo, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

// Components
import Entry from "./entry/component";

const Hierarchy: React.FC = () => {
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
        <div className={CSS.Hierarchy}>
            {/* Render each root block */}
            {rootBlocks.map(block => (
                <Entry key={block.id} blockID={block.id} />
            ))}
        </div>
    );
};

export default memo(Hierarchy);