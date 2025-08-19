"use client";
import React, { ReactElement, memo } from "react";

// Styles
import CSS from "./style.module.scss";

// Types
import type { BlockAttributesProps } from "./types";

// Hooks
import { useBlockManager } from "@/hooks/block/manager";

// Components
import Layout from "./layout/component";

/**
 * Attribute Component
 * Renders the main block editor UI and registers block-related tabs to the layout panels.
 * @param props - AttributeProps
 * @returns ReactElement
 */
const BlockAttributes: React.FC<BlockAttributesProps> = (props: BlockAttributesProps): ReactElement => {
    const { getSelectedBlock } = useBlockManager();
    const selectedBlock = getSelectedBlock();

    return (
        <div className={CSS.BlockAttributes} >
            {selectedBlock
                ? <Layout />
                : <p className={CSS.Fallback}>
                    No block selected. Select a block to see attribute-specific settings.
                </p>}
        </div>
    );
};

export default memo(BlockAttributes);

