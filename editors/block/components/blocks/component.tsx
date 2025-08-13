"use client";

import React, { memo, useMemo } from "react";
import { createPortal } from "react-dom";

// Styles
import CSS from "./styles.module.scss";

// Components
import Block from "./block/component";
import ActionGroup from "@/components/group/action/component";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

// Registry
import { blockIcon } from "@/registry/blocks/registry";

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
const Blocks: React.FC = () => {
    // Retrieve the block manager's getAllBlocks function
    const { getAllBlocks, getAllActions, getSelectedBlock } = useBlockManager();
    const allActions = getAllActions();
    const selectedBlock = getSelectedBlock();


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

            {/* Render ActionGroup in a portal to body */}
            {selectedBlock &&
                createPortal(
                    <ActionGroup direction="horizontal" className={CSS.BlockActions}>
                        <>
                            <button data-is-disabled={true}>
                                {blockIcon(selectedBlock.type)}
                            </button>
                            <span className={CSS.ActionsDivider}/>
                            {Object.values(allActions).map(action => (
                                <button title={action.title} key={action.id} onClick={action.onClick}>
                                    {action.icon}
                                </button>
                            ))}

                        </>
                    </ActionGroup>,
                    document.body
                )}
                

        </div>
    );
};

export default memo(Blocks);