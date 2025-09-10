"use client";

import React, { memo, useMemo } from "react";
import { createPortal } from "react-dom";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlocksCanvasBlock from "./block/component";
import ActionGroup from "@/components/group/action/component";

// Types
import { BlocksCanvasProps } from "@/editors/block/types/component";

// Managers
import { useRootBlocks, useSelectedBlockType, useSelectedBlockID } from "@/editors/block/managers/block";

// Registry
import { getRegisteredBlockIcon } from "@/editors/block/registry/registry";

// Context
import { useBlockContext } from "@/editors/block/context";


/**
 * BlocksCanvas Component
 * Renders the block editor blocks organized for better user experience.
 *
 * @returns The rendered blocks with action interface for block editing
 */
const BlocksCanvas: React.FC<BlocksCanvasProps> = () => {
    const { getBlockActions } = useBlockContext();
    const rootBlocks = useRootBlocks();
    const selectedBlockType = useSelectedBlockType();
    const selectedBlockID = useSelectedBlockID();
    const blockIcon = selectedBlockType ? getRegisteredBlockIcon(selectedBlockType) : undefined;

    // Render root block instances
    const rootInstances = useMemo(() => (
        <>
            {
                Object.values(rootBlocks).map(block => (
                    <BlocksCanvasBlock key={block.id} blockID={block.id} />
                ))
            }
        </>
    ), [rootBlocks]
    );

    // Render selected block action instances
    const actionsInstance = (
        <>
            {selectedBlockID ? Object.values(getBlockActions(selectedBlockID) || []).map(action => (
                <button title={action.title} key={action.actionID} onClick={action.onClick}>
                    {action.icon}
                </button>
            )) : null}
        </>
    )

    // Render block icon instance
    const iconInstance = (
        <button data-is-disabled={true}>
            {blockIcon}
        </button>
    )

    return (
        <div className={CSS.BlocksCanvas}>

            {/* Render each root block */}
            {rootInstances}

            {/* Render ActionGroup in a portal to body */}
            {blockIcon && createPortal(
                <ActionGroup direction="horizontal" className={CSS.BlocksEditorBlocks__Actions}>
                    {iconInstance}

                    <span className={CSS.BlocksEditorBlocks__ActionsDivider} />

                    {actionsInstance}

                </ActionGroup>,
                document.body
            )}

        </div>
    );
};

export default memo(BlocksCanvas);