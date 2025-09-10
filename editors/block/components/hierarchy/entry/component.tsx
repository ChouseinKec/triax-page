"use client";

import React, { memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Hooks
import { useBlockType, useBlockContentIDs, selectBlock, useIsBlockSelected } from "@/editors/block/managers/block";

// Types
import type { BlocksHierarchyEntryProps } from "@/editors/block/types/component/hierarchy";

// Components
import ButtonReveal from "@/components/reveal/button/component";

// Registry
import { getRegisteredBlockIcon } from "../../../registry/registry";

// Utilities
import { devRender } from "@/utilities/dev";

/**
 * BlocksHierarchyEntry Component
 * Renders the block hierarchy entry with children for better user experience.
 *
 * @param blockID - The block identifier
 * @returns The rendered entry with children for hierarchy navigation
 */
const BlocksHierarchyEntry: React.FC<BlocksHierarchyEntryProps> = ({ blockID }) => {
    if (!blockID) return devRender.error("[BlocksHierarchyEntry] No blockID provided");

    const blockType = useBlockType(blockID);
    const blockContentIDs = useBlockContentIDs(blockID);
    const isBlockSelected = useIsBlockSelected(blockID);
    const blockIcon = blockType ? getRegisteredBlockIcon(blockType) : undefined;

    // Handle block selection
    const handleSelect = () => {
        if (isBlockSelected) {
            selectBlock(null);
        } else {
            selectBlock(blockID);
        }
    }

    // Render child entries recursively
    const renderChildren = useMemo(() => {
        if (!blockContentIDs || blockContentIDs.length <= 0) return null;
        return (
            <div className={CSS.BlocksHierarchyEntry__Content}>
                {blockContentIDs.map((childID) => (
                    <BlocksHierarchyEntry key={childID} blockID={childID} />
                ))}
            </div>
        );
    }, [blockContentIDs]
    );

    return (
        <div className={CSS.BlocksHierarchyEntry} >
            <ButtonReveal
                className="EntryButtonReveal"
                title={blockID}
                icon={blockIcon}
                isSelected={isBlockSelected}
                onButtonClick={handleSelect}
            >
                {renderChildren}
            </ButtonReveal>
        </div>
    );
};

export default memo(BlocksHierarchyEntry);